import express, { Router } from 'express';
import serverless from 'serverless-http';
import { contactSubmissionSchema } from '../../shared/schema';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';

// Create an Express app
const api = express();
const router = Router();

// Middleware
api.use(express.json());
api.use(express.urlencoded({ extended: false }));

// Contact form submission endpoint
router.post('/contact', async (req, res) => {
  try {
    // Validate the request body
    const validatedData = contactSubmissionSchema.parse(req.body);
    
    // In a serverless function, we might use a different storage method
    // For now, just acknowledge receipt
    res.status(201).json({ 
      message: "Contact submission received",
      submissionId: Date.now() // Temporary ID
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

// Use the router
api.use('/api', router);

// Export the serverless handler
export const handler = serverless(api);