import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertSliderImageSchema,
  insertAboutContentSchema,
  insertPoojaTimingSchema,
  insertServiceSchema,
  insertGalleryItemSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Slider Images
  app.get("/api/slider-images", async (req, res) => {
    try {
      const images = await storage.getSliderImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch slider images" });
    }
  });

  app.post("/api/slider-images", async (req, res) => {
    try {
      const data = insertSliderImageSchema.parse(req.body);
      const image = await storage.createSliderImage(data);
      res.json(image);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/slider-images/:id", async (req, res) => {
    try {
      const image = await storage.updateSliderImage(req.params.id, req.body);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(400).json({ error: "Failed to update image" });
    }
  });

  app.delete("/api/slider-images/:id", async (req, res) => {
    try {
      await storage.deleteSliderImage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete image" });
    }
  });

  // About Content
  app.get("/api/about", async (req, res) => {
    try {
      const about = await storage.getAboutContent();
      res.json(about || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch about content" });
    }
  });

  app.post("/api/about", async (req, res) => {
    try {
      const data = insertAboutContentSchema.parse(req.body);
      const about = await storage.createAboutContent(data);
      res.json(about);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/about/:id", async (req, res) => {
    try {
      const about = await storage.updateAboutContent(req.params.id, req.body);
      if (!about) {
        return res.status(404).json({ error: "About content not found" });
      }
      res.json(about);
    } catch (error) {
      res.status(400).json({ error: "Failed to update about content" });
    }
  });

  // Pooja Timings
  app.get("/api/pooja-timings", async (req, res) => {
    try {
      const timings = await storage.getPoojaTimings();
      res.json(timings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pooja timings" });
    }
  });

  app.post("/api/pooja-timings", async (req, res) => {
    try {
      const data = insertPoojaTimingSchema.parse(req.body);
      const timing = await storage.createPoojaTiming(data);
      res.json(timing);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/pooja-timings/:id", async (req, res) => {
    try {
      const timing = await storage.updatePoojaTiming(req.params.id, req.body);
      if (!timing) {
        return res.status(404).json({ error: "Timing not found" });
      }
      res.json(timing);
    } catch (error) {
      res.status(400).json({ error: "Failed to update timing" });
    }
  });

  app.delete("/api/pooja-timings/:id", async (req, res) => {
    try {
      await storage.deletePoojaTiming(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete timing" });
    }
  });

  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const data = insertServiceSchema.parse(req.body);
      const service = await storage.createService(data);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Failed to update service" });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      await storage.deleteService(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete service" });
    }
  });

  // Gallery Items
  app.get("/api/gallery", async (req, res) => {
    try {
      const items = await storage.getGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/:type", async (req, res) => {
    try {
      const items = await storage.getGalleryItemsByType(req.params.type);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const data = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(data);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/gallery/:id", async (req, res) => {
    try {
      const item = await storage.updateGalleryItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Failed to update gallery item" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      await storage.deleteGalleryItem(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete gallery item" });
    }
  });

  // Site Settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSiteSetting(req.params.key);
      res.json(setting || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });

  return httpServer;
}
