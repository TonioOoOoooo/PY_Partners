import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch"; // Importation ESM correcte
import { storage } from "./storage";
import { contactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Rate limiter for contact form - 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    message: "Trop de tentatives de contact depuis cette adresse IP, veuillez réessayer plus tard.",
    error: "rate_limit_exceeded"
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting for trusted IPs (optional)
  skip: (req) => {
    const trustedIPs = process.env.TRUSTED_IPS?.split(',') || [];
    return trustedIPs.includes(req.ip || '');
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint with rate limiting
  app.post("/api/contact", contactLimiter, async (req: Request, res: Response) => {
    try {
      // Log des données reçues pour debug
      console.log("Données du formulaire reçues:", req.body);
      
      // Tenter de valider les données (mais continuer même en cas d'échec)
      let validatedData = req.body;
      try {
        validatedData = contactSubmissionSchema.parse(req.body);
      } catch (validationError) {
        console.warn("Validation warning:", validationError);
        // Continuer avec les données brutes
      }
      
      // Essayer d'enregistrer localement (mais continuer même en cas d'échec)
      try {
        if (typeof storage.createContactSubmission === 'function') {
          await storage.createContactSubmission(validatedData);
        }
      } catch (storageError) {
        console.warn("Storage warning:", storageError);
        // Continuer même si la sauvegarde locale échoue
      }
      
      // Envoyer les données à Make.com
      try {
        const webhookUrl = process.env.MAKE_WEBHOOK_URL;
        if (!webhookUrl) {
          throw new Error('MAKE_WEBHOOK_URL environment variable is not configured');
        }

        const makeResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });
        
        if (!makeResponse.ok) {
          throw new Error(`Make.com responded with status: ${makeResponse.status}`);
        }
        
        console.log("Data successfully sent to Make.com");
      } catch (makeError) {
        console.error("Error forwarding to Make.com:", makeError);
        throw makeError; // Propager l'erreur pour informer le client
      }
      
      // Répondre au client avec succès
      res.status(200).json({ 
        message: "Contact submission received and forwarded",
        success: true
      });
      
    } catch (error) {
      // Log de l'erreur complète
      console.error("Complete error:", error);
      
      // Répondre avec un message d'erreur approprié
      res.status(500).json({ 
        message: "Error processing your request",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}