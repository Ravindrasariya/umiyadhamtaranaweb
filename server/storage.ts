import {
  type User,
  type InsertUser,
  type SliderImage,
  type InsertSliderImage,
  type AboutContent,
  type InsertAboutContent,
  type PoojaTiming,
  type InsertPoojaTiming,
  type Service,
  type InsertService,
  type GalleryItem,
  type InsertGalleryItem,
  type SiteSetting,
  type InsertSiteSetting,
  type TrustContent,
  type InsertTrustContent,
  type ContactInfo,
  type InsertContactInfo,
  type TermsContent,
  type InsertTermsContent,
  type Donation,
  type InsertDonation,
  type GaushalaSlider,
  type InsertGaushalaSlider,
  type GaushalaAbout,
  type InsertGaushalaAbout,
  type GaushalaService,
  type InsertGaushalaService,
  type GaushalaGallery,
  type InsertGaushalaGallery,
  type TeamMember,
  type InsertTeamMember,
  type VivaahPageInfo,
  type InsertVivaahPageInfo,
  type VivaahSammelan,
  type InsertVivaahSammelan,
  type VivaahParticipant,
  type InsertVivaahParticipant,
  users,
  sliderImages,
  aboutContent,
  poojaTimings,
  services,
  galleryItems,
  siteSettings,
  trustContent,
  contactInfo,
  termsContent,
  donations,
  gaushalaSliders,
  gaushalaAbout,
  gaushalaServices,
  gaushalaGallery,
  teamMembers,
  vivaahPageInfo,
  vivaahSammelan,
  vivaahParticipants,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Slider Images
  getSliderImages(): Promise<SliderImage[]>;
  getSliderImage(id: string): Promise<SliderImage | undefined>;
  createSliderImage(data: InsertSliderImage): Promise<SliderImage>;
  updateSliderImage(id: string, data: Partial<InsertSliderImage>): Promise<SliderImage | undefined>;
  deleteSliderImage(id: string): Promise<boolean>;

  // About Content
  getAboutContent(): Promise<AboutContent | undefined>;
  updateAboutContent(id: string, data: Partial<InsertAboutContent>): Promise<AboutContent | undefined>;
  createAboutContent(data: InsertAboutContent): Promise<AboutContent>;

  // Pooja Timings
  getPoojaTimings(): Promise<PoojaTiming[]>;
  createPoojaTiming(data: InsertPoojaTiming): Promise<PoojaTiming>;
  updatePoojaTiming(id: string, data: Partial<InsertPoojaTiming>): Promise<PoojaTiming | undefined>;
  deletePoojaTiming(id: string): Promise<boolean>;

  // Services
  getServices(): Promise<Service[]>;
  createService(data: InsertService): Promise<Service>;
  updateService(id: string, data: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  // Gallery Items
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByType(type: string): Promise<GalleryItem[]>;
  createGalleryItem(data: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: string, data: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: string): Promise<boolean>;

  // Site Settings
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  upsertSiteSetting(data: InsertSiteSetting): Promise<SiteSetting>;

  // Trust Content
  getTrustContent(): Promise<TrustContent | undefined>;
  updateTrustContent(id: string, data: Partial<InsertTrustContent>): Promise<TrustContent | undefined>;
  createTrustContent(data: InsertTrustContent): Promise<TrustContent>;

  // Contact Info
  getContactInfo(): Promise<ContactInfo | undefined>;
  updateContactInfo(id: string, data: Partial<InsertContactInfo>): Promise<ContactInfo | undefined>;
  createContactInfo(data: InsertContactInfo): Promise<ContactInfo>;

  // Terms Content
  getTermsContent(): Promise<TermsContent | undefined>;
  updateTermsContent(id: string, data: Partial<InsertTermsContent>): Promise<TermsContent | undefined>;
  createTermsContent(data: InsertTermsContent): Promise<TermsContent>;

  // Donations
  getDonations(): Promise<Donation[]>;
  createDonation(data: InsertDonation): Promise<Donation>;

  // Gaushala Sliders
  getGaushalaSliders(): Promise<GaushalaSlider[]>;
  createGaushalaSlider(data: InsertGaushalaSlider): Promise<GaushalaSlider>;
  updateGaushalaSlider(id: string, data: Partial<InsertGaushalaSlider>): Promise<GaushalaSlider | undefined>;
  deleteGaushalaSlider(id: string): Promise<boolean>;

  // Gaushala About
  getGaushalaAbout(): Promise<GaushalaAbout | undefined>;
  createGaushalaAbout(data: InsertGaushalaAbout): Promise<GaushalaAbout>;
  updateGaushalaAbout(id: string, data: Partial<InsertGaushalaAbout>): Promise<GaushalaAbout | undefined>;

  // Gaushala Services
  getGaushalaServices(): Promise<GaushalaService[]>;
  createGaushalaService(data: InsertGaushalaService): Promise<GaushalaService>;
  updateGaushalaService(id: string, data: Partial<InsertGaushalaService>): Promise<GaushalaService | undefined>;
  deleteGaushalaService(id: string): Promise<boolean>;

  // Gaushala Gallery
  getGaushalaGallery(): Promise<GaushalaGallery[]>;
  createGaushalaGalleryItem(data: InsertGaushalaGallery): Promise<GaushalaGallery>;
  updateGaushalaGalleryItem(id: string, data: Partial<InsertGaushalaGallery>): Promise<GaushalaGallery | undefined>;
  deleteGaushalaGalleryItem(id: string): Promise<boolean>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(data: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, data: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  // Vivaah Page Info
  getVivaahPageInfo(): Promise<VivaahPageInfo | undefined>;
  createVivaahPageInfo(data: InsertVivaahPageInfo): Promise<VivaahPageInfo>;
  updateVivaahPageInfo(id: string, data: Partial<InsertVivaahPageInfo>): Promise<VivaahPageInfo | undefined>;

  // Vivaah Sammelan
  getVivaahSammelans(): Promise<VivaahSammelan[]>;
  getActiveSammelan(): Promise<VivaahSammelan | undefined>;
  createVivaahSammelan(data: InsertVivaahSammelan): Promise<VivaahSammelan>;
  updateVivaahSammelan(id: string, data: Partial<InsertVivaahSammelan>): Promise<VivaahSammelan | undefined>;
  deleteVivaahSammelan(id: string): Promise<boolean>;

  // Vivaah Participants
  getVivaahParticipants(sammelanId: string): Promise<VivaahParticipant[]>;
  createVivaahParticipant(data: InsertVivaahParticipant): Promise<VivaahParticipant>;
  updateVivaahParticipant(id: string, data: Partial<InsertVivaahParticipant>): Promise<VivaahParticipant | undefined>;
  deleteVivaahParticipant(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Slider Images
  async getSliderImages(): Promise<SliderImage[]> {
    return db.select().from(sliderImages).where(eq(sliderImages.isActive, true)).orderBy(asc(sliderImages.order));
  }

  async getSliderImage(id: string): Promise<SliderImage | undefined> {
    const [image] = await db.select().from(sliderImages).where(eq(sliderImages.id, id));
    return image || undefined;
  }

  async createSliderImage(data: InsertSliderImage): Promise<SliderImage> {
    const [image] = await db.insert(sliderImages).values(data).returning();
    return image;
  }

  async updateSliderImage(id: string, data: Partial<InsertSliderImage>): Promise<SliderImage | undefined> {
    const [image] = await db.update(sliderImages).set(data).where(eq(sliderImages.id, id)).returning();
    return image || undefined;
  }

  async deleteSliderImage(id: string): Promise<boolean> {
    const result = await db.delete(sliderImages).where(eq(sliderImages.id, id));
    return true;
  }

  // About Content
  async getAboutContent(): Promise<AboutContent | undefined> {
    const [content] = await db.select().from(aboutContent).limit(1);
    return content || undefined;
  }

  async updateAboutContent(id: string, data: Partial<InsertAboutContent>): Promise<AboutContent | undefined> {
    const [content] = await db.update(aboutContent).set(data).where(eq(aboutContent.id, id)).returning();
    return content || undefined;
  }

  async createAboutContent(data: InsertAboutContent): Promise<AboutContent> {
    const [content] = await db.insert(aboutContent).values(data).returning();
    return content;
  }

  // Pooja Timings
  async getPoojaTimings(): Promise<PoojaTiming[]> {
    return db.select().from(poojaTimings).orderBy(asc(poojaTimings.order));
  }

  async createPoojaTiming(data: InsertPoojaTiming): Promise<PoojaTiming> {
    const [timing] = await db.insert(poojaTimings).values(data).returning();
    return timing;
  }

  async updatePoojaTiming(id: string, data: Partial<InsertPoojaTiming>): Promise<PoojaTiming | undefined> {
    const [timing] = await db.update(poojaTimings).set(data).where(eq(poojaTimings.id, id)).returning();
    return timing || undefined;
  }

  async deletePoojaTiming(id: string): Promise<boolean> {
    await db.delete(poojaTimings).where(eq(poojaTimings.id, id));
    return true;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return db.select().from(services).orderBy(asc(services.order));
  }

  async createService(data: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(data).returning();
    return service;
  }

  async updateService(id: string, data: Partial<InsertService>): Promise<Service | undefined> {
    const [service] = await db.update(services).set(data).where(eq(services.id, id)).returning();
    return service || undefined;
  }

  async deleteService(id: string): Promise<boolean> {
    await db.delete(services).where(eq(services.id, id));
    return true;
  }

  // Gallery Items
  async getGalleryItems(): Promise<GalleryItem[]> {
    return db.select().from(galleryItems).where(eq(galleryItems.isActive, true)).orderBy(asc(galleryItems.order));
  }

  async getGalleryItemsByType(type: string): Promise<GalleryItem[]> {
    return db.select().from(galleryItems).where(eq(galleryItems.type, type)).orderBy(asc(galleryItems.order));
  }

  async createGalleryItem(data: InsertGalleryItem): Promise<GalleryItem> {
    const [item] = await db.insert(galleryItems).values(data).returning();
    return item;
  }

  async updateGalleryItem(id: string, data: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const [item] = await db.update(galleryItems).set(data).where(eq(galleryItems.id, id)).returning();
    return item || undefined;
  }

  async deleteGalleryItem(id: string): Promise<boolean> {
    await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return true;
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSetting[]> {
    return db.select().from(siteSettings);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting || undefined;
  }

  async upsertSiteSetting(data: InsertSiteSetting): Promise<SiteSetting> {
    const existing = await this.getSiteSetting(data.key);
    if (existing) {
      const [setting] = await db.update(siteSettings).set(data).where(eq(siteSettings.key, data.key)).returning();
      return setting;
    }
    const [setting] = await db.insert(siteSettings).values(data).returning();
    return setting;
  }

  // Trust Content
  async getTrustContent(): Promise<TrustContent | undefined> {
    const [content] = await db.select().from(trustContent).limit(1);
    return content || undefined;
  }

  async updateTrustContent(id: string, data: Partial<InsertTrustContent>): Promise<TrustContent | undefined> {
    const [content] = await db.update(trustContent).set(data).where(eq(trustContent.id, id)).returning();
    return content || undefined;
  }

  async createTrustContent(data: InsertTrustContent): Promise<TrustContent> {
    const [content] = await db.insert(trustContent).values(data).returning();
    return content;
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | undefined> {
    const [info] = await db.select().from(contactInfo).limit(1);
    return info || undefined;
  }

  async updateContactInfo(id: string, data: Partial<InsertContactInfo>): Promise<ContactInfo | undefined> {
    const [info] = await db.update(contactInfo).set(data).where(eq(contactInfo.id, id)).returning();
    return info || undefined;
  }

  async createContactInfo(data: InsertContactInfo): Promise<ContactInfo> {
    const [info] = await db.insert(contactInfo).values(data).returning();
    return info;
  }

  // Terms Content
  async getTermsContent(): Promise<TermsContent | undefined> {
    const [content] = await db.select().from(termsContent).limit(1);
    return content || undefined;
  }

  async updateTermsContent(id: string, data: Partial<InsertTermsContent>): Promise<TermsContent | undefined> {
    const [content] = await db.update(termsContent).set(data).where(eq(termsContent.id, id)).returning();
    return content || undefined;
  }

  async createTermsContent(data: InsertTermsContent): Promise<TermsContent> {
    const [content] = await db.insert(termsContent).values(data).returning();
    return content;
  }

  // Donations
  async getDonations(): Promise<Donation[]> {
    return db.select().from(donations).orderBy(desc(donations.createdAt));
  }

  async createDonation(data: InsertDonation): Promise<Donation> {
    const [donation] = await db.insert(donations).values(data).returning();
    return donation;
  }

  // Gaushala Sliders
  async getGaushalaSliders(): Promise<GaushalaSlider[]> {
    return db.select().from(gaushalaSliders).where(eq(gaushalaSliders.isActive, true)).orderBy(asc(gaushalaSliders.order));
  }

  async createGaushalaSlider(data: InsertGaushalaSlider): Promise<GaushalaSlider> {
    const [slider] = await db.insert(gaushalaSliders).values(data).returning();
    return slider;
  }

  async updateGaushalaSlider(id: string, data: Partial<InsertGaushalaSlider>): Promise<GaushalaSlider | undefined> {
    const [slider] = await db.update(gaushalaSliders).set(data).where(eq(gaushalaSliders.id, id)).returning();
    return slider || undefined;
  }

  async deleteGaushalaSlider(id: string): Promise<boolean> {
    await db.delete(gaushalaSliders).where(eq(gaushalaSliders.id, id));
    return true;
  }

  // Gaushala About
  async getGaushalaAbout(): Promise<GaushalaAbout | undefined> {
    const [content] = await db.select().from(gaushalaAbout).limit(1);
    return content || undefined;
  }

  async createGaushalaAbout(data: InsertGaushalaAbout): Promise<GaushalaAbout> {
    const [content] = await db.insert(gaushalaAbout).values(data).returning();
    return content;
  }

  async updateGaushalaAbout(id: string, data: Partial<InsertGaushalaAbout>): Promise<GaushalaAbout | undefined> {
    const [content] = await db.update(gaushalaAbout).set(data).where(eq(gaushalaAbout.id, id)).returning();
    return content || undefined;
  }

  // Gaushala Services
  async getGaushalaServices(): Promise<GaushalaService[]> {
    return db.select().from(gaushalaServices).orderBy(asc(gaushalaServices.order));
  }

  async createGaushalaService(data: InsertGaushalaService): Promise<GaushalaService> {
    const [service] = await db.insert(gaushalaServices).values(data).returning();
    return service;
  }

  async updateGaushalaService(id: string, data: Partial<InsertGaushalaService>): Promise<GaushalaService | undefined> {
    const [service] = await db.update(gaushalaServices).set(data).where(eq(gaushalaServices.id, id)).returning();
    return service || undefined;
  }

  async deleteGaushalaService(id: string): Promise<boolean> {
    await db.delete(gaushalaServices).where(eq(gaushalaServices.id, id));
    return true;
  }

  // Gaushala Gallery
  async getGaushalaGallery(): Promise<GaushalaGallery[]> {
    return db.select().from(gaushalaGallery).where(eq(gaushalaGallery.isActive, true)).orderBy(asc(gaushalaGallery.order));
  }

  async createGaushalaGalleryItem(data: InsertGaushalaGallery): Promise<GaushalaGallery> {
    const [item] = await db.insert(gaushalaGallery).values(data).returning();
    return item;
  }

  async updateGaushalaGalleryItem(id: string, data: Partial<InsertGaushalaGallery>): Promise<GaushalaGallery | undefined> {
    const [item] = await db.update(gaushalaGallery).set(data).where(eq(gaushalaGallery.id, id)).returning();
    return item || undefined;
  }

  async deleteGaushalaGalleryItem(id: string): Promise<boolean> {
    await db.delete(gaushalaGallery).where(eq(gaushalaGallery.id, id));
    return true;
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).orderBy(asc(teamMembers.order));
  }

  async createTeamMember(data: InsertTeamMember): Promise<TeamMember> {
    const [member] = await db.insert(teamMembers).values(data).returning();
    return member;
  }

  async updateTeamMember(id: string, data: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const [member] = await db.update(teamMembers).set(data).where(eq(teamMembers.id, id)).returning();
    return member || undefined;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return true;
  }

  // Vivaah Page Info
  async getVivaahPageInfo(): Promise<VivaahPageInfo | undefined> {
    const [info] = await db.select().from(vivaahPageInfo).limit(1);
    return info || undefined;
  }

  async createVivaahPageInfo(data: InsertVivaahPageInfo): Promise<VivaahPageInfo> {
    const [info] = await db.insert(vivaahPageInfo).values(data).returning();
    return info;
  }

  async updateVivaahPageInfo(id: string, data: Partial<InsertVivaahPageInfo>): Promise<VivaahPageInfo | undefined> {
    const [info] = await db.update(vivaahPageInfo).set(data).where(eq(vivaahPageInfo.id, id)).returning();
    return info || undefined;
  }

  // Vivaah Sammelan
  async getVivaahSammelans(): Promise<VivaahSammelan[]> {
    return db.select().from(vivaahSammelan);
  }

  async getActiveSammelan(): Promise<VivaahSammelan | undefined> {
    const [sammelan] = await db.select().from(vivaahSammelan).where(eq(vivaahSammelan.isActive, true)).limit(1);
    return sammelan || undefined;
  }

  async createVivaahSammelan(data: InsertVivaahSammelan): Promise<VivaahSammelan> {
    const [sammelan] = await db.insert(vivaahSammelan).values(data).returning();
    return sammelan;
  }

  async updateVivaahSammelan(id: string, data: Partial<InsertVivaahSammelan>): Promise<VivaahSammelan | undefined> {
    const [sammelan] = await db.update(vivaahSammelan).set(data).where(eq(vivaahSammelan.id, id)).returning();
    return sammelan || undefined;
  }

  async deleteVivaahSammelan(id: string): Promise<boolean> {
    await db.delete(vivaahParticipants).where(eq(vivaahParticipants.sammelanId, id));
    await db.delete(vivaahSammelan).where(eq(vivaahSammelan.id, id));
    return true;
  }

  // Vivaah Participants
  async getVivaahParticipants(sammelanId: string): Promise<VivaahParticipant[]> {
    return db.select().from(vivaahParticipants).where(eq(vivaahParticipants.sammelanId, sammelanId)).orderBy(asc(vivaahParticipants.order));
  }

  async createVivaahParticipant(data: InsertVivaahParticipant): Promise<VivaahParticipant> {
    const [participant] = await db.insert(vivaahParticipants).values(data).returning();
    return participant;
  }

  async updateVivaahParticipant(id: string, data: Partial<InsertVivaahParticipant>): Promise<VivaahParticipant | undefined> {
    const [participant] = await db.update(vivaahParticipants).set(data).where(eq(vivaahParticipants.id, id)).returning();
    return participant || undefined;
  }

  async deleteVivaahParticipant(id: string): Promise<boolean> {
    await db.delete(vivaahParticipants).where(eq(vivaahParticipants.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
