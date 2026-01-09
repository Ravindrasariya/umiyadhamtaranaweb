import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import {
  insertSliderImageSchema,
  insertAboutContentSchema,
  insertPoojaTimingSchema,
  insertServiceSchema,
  insertGalleryItemSchema,
  insertTrustContentSchema,
  insertContactInfoSchema,
  insertDonationSchema,
  insertGaushalaSliderSchema,
  insertGaushalaAboutSchema,
  insertGaushalaServiceSchema,
  insertGaushalaGallerySchema,
  insertTeamMemberSchema,
  insertVivaahPageInfoSchema,
  insertVivaahSammelanSchema,
  insertVivaahParticipantSchema,
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

  // Trust Content
  app.get("/api/trust", async (req, res) => {
    try {
      const trust = await storage.getTrustContent();
      res.json(trust || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trust content" });
    }
  });

  app.post("/api/trust", async (req, res) => {
    try {
      const data = insertTrustContentSchema.parse(req.body);
      const trust = await storage.createTrustContent(data);
      res.json(trust);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/trust/:id", async (req, res) => {
    try {
      const trust = await storage.updateTrustContent(req.params.id, req.body);
      if (!trust) {
        return res.status(404).json({ error: "Trust content not found" });
      }
      res.json(trust);
    } catch (error) {
      res.status(400).json({ error: "Failed to update trust content" });
    }
  });

  // Contact Info
  app.get("/api/contact", async (req, res) => {
    try {
      const contact = await storage.getContactInfo();
      res.json(contact || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactInfoSchema.parse(req.body);
      const contact = await storage.createContactInfo(data);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/contact/:id", async (req, res) => {
    try {
      const contact = await storage.updateContactInfo(req.params.id, req.body);
      if (!contact) {
        return res.status(404).json({ error: "Contact info not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Failed to update contact info" });
    }
  });

  // Authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
      if (password !== adminPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Terms Content
  app.get("/api/terms", async (req, res) => {
    try {
      const terms = await storage.getTermsContent();
      res.json(terms || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch terms" });
    }
  });

  app.patch("/api/terms/:id", async (req, res) => {
    try {
      const terms = await storage.updateTermsContent(req.params.id, req.body);
      if (!terms) {
        return res.status(404).json({ error: "Terms not found" });
      }
      res.json(terms);
    } catch (error) {
      res.status(400).json({ error: "Failed to update terms" });
    }
  });

  // Donations
  app.get("/api/donations", async (req, res) => {
    try {
      const donations = await storage.getDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch donations" });
    }
  });

  app.post("/api/donations", async (req, res) => {
    try {
      const data = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(data);
      res.json(donation);
    } catch (error) {
      res.status(400).json({ error: "Invalid donation data" });
    }
  });

  // Gaushala Sliders
  app.get("/api/gaushala/sliders", async (req, res) => {
    try {
      const sliders = await storage.getGaushalaSliders();
      res.json(sliders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gaushala sliders" });
    }
  });

  app.post("/api/gaushala/sliders", async (req, res) => {
    try {
      const data = insertGaushalaSliderSchema.parse(req.body);
      const slider = await storage.createGaushalaSlider(data);
      res.json(slider);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/gaushala/sliders/:id", async (req, res) => {
    try {
      const slider = await storage.updateGaushalaSlider(req.params.id, req.body);
      if (!slider) {
        return res.status(404).json({ error: "Slider not found" });
      }
      res.json(slider);
    } catch (error) {
      res.status(400).json({ error: "Failed to update slider" });
    }
  });

  app.delete("/api/gaushala/sliders/:id", async (req, res) => {
    try {
      await storage.deleteGaushalaSlider(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete slider" });
    }
  });

  // Gaushala About
  app.get("/api/gaushala/about", async (req, res) => {
    try {
      const about = await storage.getGaushalaAbout();
      res.json(about || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gaushala about" });
    }
  });

  app.post("/api/gaushala/about", async (req, res) => {
    try {
      const data = insertGaushalaAboutSchema.parse(req.body);
      const about = await storage.createGaushalaAbout(data);
      res.json(about);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/gaushala/about/:id", async (req, res) => {
    try {
      const about = await storage.updateGaushalaAbout(req.params.id, req.body);
      if (!about) {
        return res.status(404).json({ error: "About not found" });
      }
      res.json(about);
    } catch (error) {
      res.status(400).json({ error: "Failed to update about" });
    }
  });

  // Gaushala Services
  app.get("/api/gaushala/services", async (req, res) => {
    try {
      const services = await storage.getGaushalaServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gaushala services" });
    }
  });

  app.post("/api/gaushala/services", async (req, res) => {
    try {
      const data = insertGaushalaServiceSchema.parse(req.body);
      const service = await storage.createGaushalaService(data);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/gaushala/services/:id", async (req, res) => {
    try {
      const service = await storage.updateGaushalaService(req.params.id, req.body);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Failed to update service" });
    }
  });

  app.delete("/api/gaushala/services/:id", async (req, res) => {
    try {
      await storage.deleteGaushalaService(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete service" });
    }
  });

  // Gaushala Gallery
  app.get("/api/gaushala/gallery", async (req, res) => {
    try {
      const gallery = await storage.getGaushalaGallery();
      res.json(gallery);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gaushala gallery" });
    }
  });

  app.post("/api/gaushala/gallery", async (req, res) => {
    try {
      const data = insertGaushalaGallerySchema.parse(req.body);
      const item = await storage.createGaushalaGalleryItem(data);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/gaushala/gallery/:id", async (req, res) => {
    try {
      const item = await storage.updateGaushalaGalleryItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Failed to update gallery item" });
    }
  });

  app.delete("/api/gaushala/gallery/:id", async (req, res) => {
    try {
      await storage.deleteGaushalaGalleryItem(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete gallery item" });
    }
  });

  // Team Members
  app.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.post("/api/team-members", async (req, res) => {
    try {
      const data = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(data);
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/team-members/:id", async (req, res) => {
    try {
      const member = await storage.updateTeamMember(req.params.id, req.body);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: "Failed to update team member" });
    }
  });

  app.delete("/api/team-members/:id", async (req, res) => {
    try {
      await storage.deleteTeamMember(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete team member" });
    }
  });

  // Vivaah Page Info
  app.get("/api/vivaah/page-info", async (req, res) => {
    try {
      const info = await storage.getVivaahPageInfo();
      res.json(info || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vivaah page info" });
    }
  });

  app.post("/api/vivaah/page-info", async (req, res) => {
    try {
      const data = insertVivaahPageInfoSchema.parse(req.body);
      const info = await storage.createVivaahPageInfo(data);
      res.json(info);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/vivaah/page-info/:id", async (req, res) => {
    try {
      const info = await storage.updateVivaahPageInfo(req.params.id, req.body);
      if (!info) {
        return res.status(404).json({ error: "Page info not found" });
      }
      res.json(info);
    } catch (error) {
      res.status(400).json({ error: "Failed to update page info" });
    }
  });

  // Vivaah Sammelan
  app.get("/api/vivaah/sammelans", async (req, res) => {
    try {
      const sammelans = await storage.getVivaahSammelans();
      res.json(sammelans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sammelans" });
    }
  });

  app.get("/api/vivaah/active-sammelan", async (req, res) => {
    try {
      const sammelan = await storage.getActiveSammelan();
      res.json(sammelan || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active sammelan" });
    }
  });

  app.post("/api/vivaah/sammelans", async (req, res) => {
    try {
      const data = insertVivaahSammelanSchema.parse(req.body);
      const sammelan = await storage.createVivaahSammelan(data);
      res.json(sammelan);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/vivaah/sammelans/:id", async (req, res) => {
    try {
      const sammelan = await storage.updateVivaahSammelan(req.params.id, req.body);
      if (!sammelan) {
        return res.status(404).json({ error: "Sammelan not found" });
      }
      res.json(sammelan);
    } catch (error) {
      res.status(400).json({ error: "Failed to update sammelan" });
    }
  });

  app.delete("/api/vivaah/sammelans/:id", async (req, res) => {
    try {
      await storage.deleteVivaahSammelan(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete sammelan" });
    }
  });

  // Vivaah Participants
  app.get("/api/vivaah/participants/:sammelanId", async (req, res) => {
    try {
      const participants = await storage.getVivaahParticipants(req.params.sammelanId);
      res.json(participants);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch participants" });
    }
  });

  app.post("/api/vivaah/participants", async (req, res) => {
    try {
      const data = insertVivaahParticipantSchema.parse(req.body);
      const participant = await storage.createVivaahParticipant(data);
      res.json(participant);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/vivaah/participants/:id", async (req, res) => {
    try {
      const participant = await storage.updateVivaahParticipant(req.params.id, req.body);
      if (!participant) {
        return res.status(404).json({ error: "Participant not found" });
      }
      res.json(participant);
    } catch (error) {
      res.status(400).json({ error: "Failed to update participant" });
    }
  });

  app.delete("/api/vivaah/participants/:id", async (req, res) => {
    try {
      await storage.deleteVivaahParticipant(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete participant" });
    }
  });

  // Register object storage routes for file uploads
  registerObjectStorageRoutes(app);

  return httpServer;
}
