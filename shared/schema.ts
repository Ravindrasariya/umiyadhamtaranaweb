import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Hero Slider Images
export const sliderImages = pgTable("slider_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  titleEn: text("title_en"),
  titleHi: text("title_hi"),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertSliderImageSchema = createInsertSchema(sliderImages).omit({ id: true });
export type InsertSliderImage = z.infer<typeof insertSliderImageSchema>;
export type SliderImage = typeof sliderImages.$inferSelect;

// About Temple Content
export const aboutContent = pgTable("about_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  contentEn: text("content_en").notNull(),
  contentHi: text("content_hi").notNull(),
  imageUrl: text("image_url"),
});

export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({ id: true });
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type AboutContent = typeof aboutContent.$inferSelect;

// Pooja Timings
export const poojaTimings = pgTable("pooja_timings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameEn: text("name_en").notNull(),
  nameHi: text("name_hi").notNull(),
  timingKartik: text("timing_kartik"),
  timingMaha: text("timing_maha"),
  timingVaishakh: text("timing_vaishakh"),
  timingBhadra: text("timing_bhadra"),
  category: text("category").notNull(), // 'aarti' or 'darshan'
  order: integer("order").notNull().default(0),
});

export const insertPoojaTimingSchema = createInsertSchema(poojaTimings).omit({ id: true });
export type InsertPoojaTiming = z.infer<typeof insertPoojaTimingSchema>;
export type PoojaTiming = typeof poojaTimings.$inferSelect;

// Services
export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionHi: text("description_hi").notNull(),
  buttonTextEn: text("button_text_en").notNull(),
  buttonTextHi: text("button_text_hi").notNull(),
  buttonLink: text("button_link"),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Gallery Items (Photos and Videos)
export const galleryItems = pgTable("gallery_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // 'photo' or 'video'
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  titleEn: text("title_en"),
  titleHi: text("title_hi"),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({ id: true });
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;

// Site Settings (for footer, contact info, etc.)
export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  valueEn: text("value_en").notNull(),
  valueHi: text("value_hi"),
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({ id: true });
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;
