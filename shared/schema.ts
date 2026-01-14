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

// Trust Content (About the Trust page)
export const trustContent = pgTable("trust_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  subtitleEn: text("subtitle_en"),
  subtitleHi: text("subtitle_hi"),
  contentEn: text("content_en").notNull(),
  contentHi: text("content_hi").notNull(),
});

export const insertTrustContentSchema = createInsertSchema(trustContent).omit({ id: true });
export type InsertTrustContent = z.infer<typeof insertTrustContentSchema>;
export type TrustContent = typeof trustContent.$inferSelect;

// Contact Info
export const contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phone1: text("phone1"),
  phone2: text("phone2"),
  email1: text("email1"),
  email2: text("email2"),
  addressEn: text("address_en"),
  addressHi: text("address_hi"),
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({ id: true });
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;

// Terms & Conditions
export const termsContent = pgTable("terms_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  contentEn: text("content_en").notNull(),
  contentHi: text("content_hi").notNull(),
});

export const insertTermsContentSchema = createInsertSchema(termsContent).omit({ id: true });
export type InsertTermsContent = z.infer<typeof insertTermsContentSchema>;
export type TermsContent = typeof termsContent.$inferSelect;

// Donations
export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  pincode: text("pincode"),
  address: text("address"),
  donationType: text("donation_type").notNull(),
  amount: text("amount").notNull(),
  createdAt: text("created_at").notNull().default(sql`NOW()`),
});

export const insertDonationSchema = createInsertSchema(donations).omit({ id: true, createdAt: true });
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;

// Team Members (Chairman, Secretary, Treasurer)
export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameEn: text("name_en").notNull(),
  nameHi: text("name_hi").notNull(),
  designationEn: text("designation_en").notNull(),
  designationHi: text("designation_hi").notNull(),
  phone: text("phone"),
  email: text("email"),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

// Vivaah Sammelan Page Info
export const vivaahPageInfo = pgTable("vivaah_page_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionHi: text("description_hi").notNull(),
});

export const insertVivaahPageInfoSchema = createInsertSchema(vivaahPageInfo).omit({ id: true });
export type InsertVivaahPageInfo = z.infer<typeof insertVivaahPageInfoSchema>;
export type VivaahPageInfo = typeof vivaahPageInfo.$inferSelect;

// Vivaah Sammelan Details (upcoming sammelan, financials)
export const vivaahSammelan = pgTable("vivaah_sammelan", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  overallIncome: text("overall_income").notNull().default("0"),
  overallExpense: text("overall_expense").notNull().default("0"),
  asOfDate: text("as_of_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertVivaahSammelanSchema = createInsertSchema(vivaahSammelan).omit({ id: true });
export type InsertVivaahSammelan = z.infer<typeof insertVivaahSammelanSchema>;
export type VivaahSammelan = typeof vivaahSammelan.$inferSelect;

// Vivaah Participants (Bride/Groom entries)
export const vivaahParticipants = pgTable("vivaah_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sammelanId: varchar("sammelan_id").notNull(),
  type: text("type").notNull(), // 'bride' or 'groom'
  nameEn: text("name_en").notNull(),
  nameHi: text("name_hi").notNull(),
  fatherNameEn: text("father_name_en"),
  fatherNameHi: text("father_name_hi"),
  motherNameEn: text("mother_name_en"),
  motherNameHi: text("mother_name_hi"),
  grandfatherNameEn: text("grandfather_name_en"),
  grandfatherNameHi: text("grandfather_name_hi"),
  grandmotherNameEn: text("grandmother_name_en"),
  grandmotherNameHi: text("grandmother_name_hi"),
  locationEn: text("location_en"),
  locationHi: text("location_hi"),
  order: integer("order").notNull().default(0),
});

export const insertVivaahParticipantSchema = createInsertSchema(vivaahParticipants).omit({ id: true });
export type InsertVivaahParticipant = z.infer<typeof insertVivaahParticipantSchema>;
export type VivaahParticipant = typeof vivaahParticipants.$inferSelect;
