import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = contactSubmissionSchema.parse(req.body);
      
      // Save the contact submission
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        message: "Contact submission received",
        submissionId: submission.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      } else {
        // Handle other errors
        console.error("Error processing contact submission:", error);
        res.status(500).json({ 
          message: "Error processing your request" 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
