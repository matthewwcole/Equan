import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sessionStatsSchema, userSettingsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all breathing techniques
  app.get("/api/techniques", async (req, res) => {
    try {
      const techniques = await storage.getTechniques();
      res.json(techniques);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch techniques" });
    }
  });

  // Get specific technique
  app.get("/api/techniques/:id", async (req, res) => {
    try {
      const technique = await storage.getTechnique(req.params.id);
      if (!technique) {
        return res.status(404).json({ message: "Technique not found" });
      }
      res.json(technique);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technique" });
    }
  });

  // Get session statistics
  app.get("/api/session-stats", async (req, res) => {
    try {
      const stats = await storage.getSessionStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch session stats" });
    }
  });

  // Add session statistics
  app.post("/api/session-stats", async (req, res) => {
    try {
      const validation = sessionStatsSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid session data" });
      }

      const stats = await storage.addSessionStats(validation.data);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to save session stats" });
    }
  });

  // Get user settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getUserSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Update user settings
  app.patch("/api/settings", async (req, res) => {
    try {
      const validation = userSettingsSchema.partial().safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid settings data" });
      }

      const settings = await storage.updateUserSettings(validation.data);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
