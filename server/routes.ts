import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertGlyphSchema, 
  insertRitualSchema,
  insertQuantumStateSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for glyph management
  app.get("/api/glyphs", async (req, res) => {
    try {
      const glyphs = await storage.getAllGlyphs();
      res.json(glyphs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch glyphs" });
    }
  });
  
  app.get("/api/glyphs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const glyph = await storage.getGlyph(id);
      if (!glyph) {
        return res.status(404).json({ message: "Glyph not found" });
      }
      
      res.json(glyph);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch glyph" });
    }
  });
  
  app.post("/api/glyphs", async (req, res) => {
    try {
      const validatedData = insertGlyphSchema.parse(req.body);
      const glyph = await storage.createGlyph(validatedData);
      res.status(201).json(glyph);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid glyph data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create glyph" });
    }
  });
  
  app.put("/api/glyphs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertGlyphSchema.partial().parse(req.body);
      const updatedGlyph = await storage.updateGlyph(id, validatedData);
      
      if (!updatedGlyph) {
        return res.status(404).json({ message: "Glyph not found" });
      }
      
      res.json(updatedGlyph);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid glyph data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update glyph" });
    }
  });
  
  app.delete("/api/glyphs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteGlyph(id);
      if (!success) {
        return res.status(404).json({ message: "Glyph not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete glyph" });
    }
  });
  
  // API routes for ritual management
  app.get("/api/rituals", async (req, res) => {
    try {
      const rituals = await storage.getAllRituals();
      res.json(rituals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rituals" });
    }
  });
  
  app.get("/api/rituals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const ritual = await storage.getRitual(id);
      if (!ritual) {
        return res.status(404).json({ message: "Ritual not found" });
      }
      
      res.json(ritual);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ritual" });
    }
  });
  
  app.post("/api/rituals", async (req, res) => {
    try {
      const validatedData = insertRitualSchema.parse(req.body);
      const ritual = await storage.createRitual(validatedData);
      res.status(201).json(ritual);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid ritual data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ritual" });
    }
  });
  
  app.put("/api/rituals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertRitualSchema.partial().parse(req.body);
      const updatedRitual = await storage.updateRitual(id, validatedData);
      
      if (!updatedRitual) {
        return res.status(404).json({ message: "Ritual not found" });
      }
      
      res.json(updatedRitual);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid ritual data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update ritual" });
    }
  });
  
  app.delete("/api/rituals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteRitual(id);
      if (!success) {
        return res.status(404).json({ message: "Ritual not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete ritual" });
    }
  });
  
  // API routes for quantum state management
  app.get("/api/quantum-states", async (req, res) => {
    try {
      const states = await storage.getAllQuantumStates();
      res.json(states);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quantum states" });
    }
  });
  
  app.get("/api/quantum-states/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const state = await storage.getQuantumState(id);
      if (!state) {
        return res.status(404).json({ message: "Quantum state not found" });
      }
      
      res.json(state);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quantum state" });
    }
  });
  
  app.post("/api/quantum-states", async (req, res) => {
    try {
      const validatedData = insertQuantumStateSchema.parse(req.body);
      const state = await storage.createQuantumState(validatedData);
      res.status(201).json(state);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quantum state data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create quantum state" });
    }
  });
  
  app.put("/api/quantum-states/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertQuantumStateSchema.partial().parse(req.body);
      const updatedState = await storage.updateQuantumState(id, validatedData);
      
      if (!updatedState) {
        return res.status(404).json({ message: "Quantum state not found" });
      }
      
      res.json(updatedState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quantum state data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update quantum state" });
    }
  });
  
  app.delete("/api/quantum-states/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteQuantumState(id);
      if (!success) {
        return res.status(404).json({ message: "Quantum state not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete quantum state" });
    }
  });
  
  // API route for running a glyph ritual
  app.post("/api/execute-glyph", async (req, res) => {
    try {
      const { glyphName, params } = req.body;
      
      if (!glyphName) {
        return res.status(400).json({ message: "Glyph name is required" });
      }
      
      const glyph = await storage.getGlyphByName(glyphName);
      if (!glyph) {
        return res.status(404).json({ message: "Glyph not found" });
      }
      
      // Simulate execution
      const response = {
        success: true,
        glyphName,
        system: glyph.system,
        message: `${glyphName} executed successfully in ${glyph.system} subsystem.`,
        timestamp: new Date()
      };
      
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to execute glyph" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
