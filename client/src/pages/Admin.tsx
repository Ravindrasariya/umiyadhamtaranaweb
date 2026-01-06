import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Trash2, Plus, Save, Image, FileText, Clock, Camera, Building, Phone, Lock, Heart } from "lucide-react";
import type { SliderImage, AboutContent, PoojaTiming, Service, GalleryItem, TrustContent, ContactInfo, Donation } from "@shared/schema";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/auth/login", { password });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("adminAuth", "true");
        onLogin();
        toast({ title: t("Login successful", "लॉगिन सफल") });
      }
    } catch (error) {
      toast({ title: t("Invalid password", "अमान्य पासवर्ड"), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30" data-testid="admin-login">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{t("Admin Login", "व्यवस्थापक लॉगिन")}</h1>
          <p className="text-sm text-muted-foreground">{t("Enter password to access the admin panel", "व्यवस्थापक पैनल तक पहुंचने के लिए पासवर्ड दर्ज करें")}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t("Password", "पासवर्ड")}</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("Enter password", "पासवर्ड दर्ज करें")}
                data-testid="input-admin-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !password} data-testid="button-admin-login">
              {isLoading ? t("Logging in...", "लॉग इन हो रहा है...") : t("Login", "लॉगिन")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function SliderManager() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [newSlider, setNewSlider] = useState({ imageUrl: "", titleEn: "", titleHi: "" });

  const { data: sliders, isLoading } = useQuery<SliderImage[]>({
    queryKey: ["/api/slider-images"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<SliderImage>) => {
      return apiRequest("POST", "/api/slider-images", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slider-images"] });
      setNewSlider({ imageUrl: "", titleEn: "", titleHi: "" });
      toast({ title: t("Slider added successfully", "स्लाइडर सफलतापूर्वक जोड़ा गया") });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/slider-images/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slider-images"] });
      toast({ title: t("Slider deleted", "स्लाइडर हटाया गया") });
    },
  });

  if (isLoading) return <Skeleton className="h-48" />;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Manage Slider Images", "स्लाइडर इमेज प्रबंधित करें")}</h3>
      <p className="text-sm text-muted-foreground">{t("Maximum 3 images allowed", "अधिकतम 3 इमेज की अनुमति है")}</p>

      <div className="grid gap-4">
        {sliders?.map((slider) => (
          <Card key={slider.id} data-testid={`admin-slider-${slider.id}`}>
            <CardContent className="flex items-center gap-4 p-4">
              <img src={slider.imageUrl} alt="" className="w-24 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{slider.titleEn}</p>
                <p className="text-sm text-muted-foreground">{slider.titleHi}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteMutation.mutate(slider.id)}
                disabled={deleteMutation.isPending}
                data-testid={`button-delete-slider-${slider.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {(sliders?.length || 0) < 3 && (
        <Card>
          <CardHeader className="pb-2">
            <h4 className="font-medium">{t("Add New Slider", "नया स्लाइडर जोड़ें")}</h4>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder={t("Image URL", "इमेज URL")}
              value={newSlider.imageUrl}
              onChange={(e) => setNewSlider({ ...newSlider, imageUrl: e.target.value })}
              data-testid="input-slider-image-url"
            />
            <Input
              placeholder={t("Title (English)", "शीर्षक (अंग्रेज़ी)")}
              value={newSlider.titleEn}
              onChange={(e) => setNewSlider({ ...newSlider, titleEn: e.target.value })}
              data-testid="input-slider-title-en"
            />
            <Input
              placeholder={t("Title (Hindi)", "शीर्षक (हिंदी)")}
              value={newSlider.titleHi}
              onChange={(e) => setNewSlider({ ...newSlider, titleHi: e.target.value })}
              data-testid="input-slider-title-hi"
            />
            <Button
              onClick={() => createMutation.mutate({ ...newSlider, order: (sliders?.length || 0) + 1, isActive: true })}
              disabled={!newSlider.imageUrl || createMutation.isPending}
              data-testid="button-add-slider"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("Add Slider", "स्लाइडर जोड़ें")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AboutManager() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: about, isLoading } = useQuery<AboutContent>({
    queryKey: ["/api/about"],
  });

  const [formData, setFormData] = useState<Partial<AboutContent>>({});

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<AboutContent>) => {
      if (about?.id) {
        return apiRequest("PATCH", `/api/about/${about.id}`, data);
      }
      return apiRequest("POST", "/api/about", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/about"] });
      toast({ title: t("About content updated", "सामग्री अपडेट हुई") });
    },
  });

  if (isLoading) return <Skeleton className="h-64" />;

  const currentData = { ...about, ...formData };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("About Temple Content", "मंदिर के बारे में सामग्री")}</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">{t("Title (English)", "शीर्षक (अंग्रेज़ी)")}</label>
          <Input
            value={currentData.titleEn || ""}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            data-testid="input-about-title-en"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Title (Hindi)", "शीर्षक (हिंदी)")}</label>
          <Input
            value={currentData.titleHi || ""}
            onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
            data-testid="input-about-title-hi"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Content (English)", "सामग्री (अंग्रेज़ी)")}</label>
          <Textarea
            value={currentData.contentEn || ""}
            onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
            rows={4}
            data-testid="input-about-content-en"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Content (Hindi)", "सामग्री (हिंदी)")}</label>
          <Textarea
            value={currentData.contentHi || ""}
            onChange={(e) => setFormData({ ...formData, contentHi: e.target.value })}
            rows={4}
            data-testid="input-about-content-hi"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Image URL", "इमेज URL")}</label>
          <Input
            value={currentData.imageUrl || ""}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            data-testid="input-about-image-url"
          />
        </div>
        <Button
          onClick={() => updateMutation.mutate(formData)}
          disabled={updateMutation.isPending}
          data-testid="button-save-about"
        >
          <Save className="w-4 h-4 mr-2" />
          {t("Save Changes", "परिवर्तन सहेजें")}
        </Button>
      </div>
    </div>
  );
}

function TrustManager() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: trust, isLoading } = useQuery<TrustContent>({
    queryKey: ["/api/trust"],
  });

  const [formData, setFormData] = useState<Partial<TrustContent>>({});

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<TrustContent>) => {
      if (trust?.id) {
        return apiRequest("PATCH", `/api/trust/${trust.id}`, data);
      }
      return apiRequest("POST", "/api/trust", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/trust"] });
      toast({ title: t("Trust content updated", "ट्रस्ट सामग्री अपडेट हुई") });
    },
  });

  if (isLoading) return <Skeleton className="h-64" />;

  const currentData = { ...trust, ...formData };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Trust Content (About Us Page)", "ट्रस्ट सामग्री (हमारे बारे में पेज)")}</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">{t("Title (English)", "शीर्षक (अंग्रेज़ी)")}</label>
          <Input
            value={currentData.titleEn || ""}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            data-testid="input-trust-title-en"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Title (Hindi)", "शीर्षक (हिंदी)")}</label>
          <Input
            value={currentData.titleHi || ""}
            onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
            data-testid="input-trust-title-hi"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Subtitle (English)", "उपशीर्षक (अंग्रेज़ी)")}</label>
          <Input
            value={currentData.subtitleEn || ""}
            onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
            data-testid="input-trust-subtitle-en"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Subtitle (Hindi)", "उपशीर्षक (हिंदी)")}</label>
          <Input
            value={currentData.subtitleHi || ""}
            onChange={(e) => setFormData({ ...formData, subtitleHi: e.target.value })}
            data-testid="input-trust-subtitle-hi"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Content (English)", "सामग्री (अंग्रेज़ी)")}</label>
          <Textarea
            value={currentData.contentEn || ""}
            onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
            rows={6}
            data-testid="input-trust-content-en"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Content (Hindi)", "सामग्री (हिंदी)")}</label>
          <Textarea
            value={currentData.contentHi || ""}
            onChange={(e) => setFormData({ ...formData, contentHi: e.target.value })}
            rows={6}
            data-testid="input-trust-content-hi"
          />
        </div>
        <Button
          onClick={() => updateMutation.mutate(formData)}
          disabled={updateMutation.isPending}
          data-testid="button-save-trust"
        >
          <Save className="w-4 h-4 mr-2" />
          {t("Save Changes", "परिवर्तन सहेजें")}
        </Button>
      </div>
    </div>
  );
}

function ContactManager() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: contact, isLoading } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  const [formData, setFormData] = useState<Partial<ContactInfo>>({});

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<ContactInfo>) => {
      if (contact?.id) {
        return apiRequest("PATCH", `/api/contact/${contact.id}`, data);
      }
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({ title: t("Contact info updated", "संपर्क जानकारी अपडेट हुई") });
    },
  });

  if (isLoading) return <Skeleton className="h-64" />;

  const currentData = { ...contact, ...formData };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Contact Information", "संपर्क जानकारी")}</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">{t("Phone 1", "फ़ोन 1")}</label>
          <Input
            value={currentData.phone1 || ""}
            onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
            data-testid="input-contact-phone1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Phone 2", "फ़ोन 2")}</label>
          <Input
            value={currentData.phone2 || ""}
            onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
            data-testid="input-contact-phone2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Email 1", "ईमेल 1")}</label>
          <Input
            value={currentData.email1 || ""}
            onChange={(e) => setFormData({ ...formData, email1: e.target.value })}
            data-testid="input-contact-email1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Email 2", "ईमेल 2")}</label>
          <Input
            value={currentData.email2 || ""}
            onChange={(e) => setFormData({ ...formData, email2: e.target.value })}
            data-testid="input-contact-email2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">{t("Address (English)", "पता (अंग्रेज़ी)")}</label>
          <Textarea
            value={currentData.addressEn || ""}
            onChange={(e) => setFormData({ ...formData, addressEn: e.target.value })}
            rows={2}
            data-testid="input-contact-address-en"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">{t("Address (Hindi)", "पता (हिंदी)")}</label>
          <Textarea
            value={currentData.addressHi || ""}
            onChange={(e) => setFormData({ ...formData, addressHi: e.target.value })}
            rows={2}
            data-testid="input-contact-address-hi"
          />
        </div>
      </div>
      <Button
        onClick={() => updateMutation.mutate(formData)}
        disabled={updateMutation.isPending}
        data-testid="button-save-contact"
      >
        <Save className="w-4 h-4 mr-2" />
        {t("Save Changes", "परिवर्तन सहेजें")}
      </Button>
    </div>
  );
}

function TimingsManager() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: timings, isLoading } = useQuery<PoojaTiming[]>({
    queryKey: ["/api/pooja-timings"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/pooja-timings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pooja-timings"] });
      toast({ title: t("Timing deleted", "समय हटाया गया") });
    },
  });

  if (isLoading) return <Skeleton className="h-48" />;

  const aartiTimings = timings?.filter((t) => t.category === "aarti") || [];
  const darshanTimings = timings?.filter((t) => t.category === "darshan") || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Manage Pooja Timings", "पूजा समय प्रबंधित करें")}</h3>

      <div className="space-y-4">
        <h4 className="font-medium">{t("Aarti Timings", "आरती समय")}</h4>
        {aartiTimings.map((timing) => (
          <Card key={timing.id} data-testid={`admin-timing-${timing.id}`}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{timing.nameEn}</p>
                <p className="text-sm text-muted-foreground">{timing.nameHi}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteMutation.mutate(timing.id)}
                data-testid={`button-delete-timing-${timing.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}

        <h4 className="font-medium">{t("Darshan Timings", "दर्शन समय")}</h4>
        {darshanTimings.map((timing) => (
          <Card key={timing.id} data-testid={`admin-timing-${timing.id}`}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{timing.nameEn}</p>
                <p className="text-sm text-muted-foreground">{timing.nameHi}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteMutation.mutate(timing.id)}
                data-testid={`button-delete-timing-${timing.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GalleryManager() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [newItem, setNewItem] = useState({ type: "photo", url: "", titleEn: "", titleHi: "", thumbnailUrl: "" });

  const { data: items, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<GalleryItem>) => {
      return apiRequest("POST", "/api/gallery", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setNewItem({ type: "photo", url: "", titleEn: "", titleHi: "", thumbnailUrl: "" });
      toast({ title: t("Gallery item added", "गैलरी आइटम जोड़ा गया") });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: t("Gallery item deleted", "गैलरी आइटम हटाया गया") });
    },
  });

  if (isLoading) return <Skeleton className="h-48" />;

  const photos = items?.filter((i) => i.type === "photo") || [];
  const videos = items?.filter((i) => i.type === "video") || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Manage Gallery", "गैलरी प्रबंधित करें")}</h3>

      <div className="space-y-4">
        <h4 className="font-medium">{t("Photos", "फ़ोटो")} ({photos.length})</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((item) => (
            <div key={item.id} className="relative group" data-testid={`admin-gallery-${item.id}`}>
              <img src={item.url} alt="" className="w-full h-24 object-cover rounded" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteMutation.mutate(item.id)}
                data-testid={`button-delete-gallery-${item.id}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>

        <h4 className="font-medium">{t("Videos", "वीडियो")} ({videos.length})</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((item) => (
            <Card key={item.id} data-testid={`admin-gallery-${item.id}`}>
              <CardContent className="p-3 flex items-center justify-between gap-2">
                <span className="text-sm truncate flex-1">{item.titleEn}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteMutation.mutate(item.id)}
                  data-testid={`button-delete-gallery-${item.id}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h4 className="font-medium">{t("Add New Item", "नया आइटम जोड़ें")}</h4>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button
              variant={newItem.type === "photo" ? "default" : "outline"}
              onClick={() => setNewItem({ ...newItem, type: "photo" })}
              data-testid="button-type-photo"
            >
              {t("Photo", "फ़ोटो")}
            </Button>
            <Button
              variant={newItem.type === "video" ? "default" : "outline"}
              onClick={() => setNewItem({ ...newItem, type: "video" })}
              data-testid="button-type-video"
            >
              {t("Video", "वीडियो")}
            </Button>
          </div>
          <Input
            placeholder={newItem.type === "photo" ? t("Image URL", "इमेज URL") : t("Video Embed URL", "वीडियो एंबेड URL")}
            value={newItem.url}
            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            data-testid="input-gallery-url"
          />
          {newItem.type === "video" && (
            <Input
              placeholder={t("Thumbnail URL", "थंबनेल URL")}
              value={newItem.thumbnailUrl}
              onChange={(e) => setNewItem({ ...newItem, thumbnailUrl: e.target.value })}
              data-testid="input-gallery-thumbnail"
            />
          )}
          <Input
            placeholder={t("Title (English)", "शीर्षक (अंग्रेज़ी)")}
            value={newItem.titleEn}
            onChange={(e) => setNewItem({ ...newItem, titleEn: e.target.value })}
            data-testid="input-gallery-title-en"
          />
          <Input
            placeholder={t("Title (Hindi)", "शीर्षक (हिंदी)")}
            value={newItem.titleHi}
            onChange={(e) => setNewItem({ ...newItem, titleHi: e.target.value })}
            data-testid="input-gallery-title-hi"
          />
          <Button
            onClick={() => createMutation.mutate({ ...newItem, order: (items?.length || 0) + 1, isActive: true })}
            disabled={!newItem.url || createMutation.isPending}
            data-testid="button-add-gallery"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("Add Item", "आइटम जोड़ें")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function DonationsManager() {
  const { t } = useLanguage();

  const { data: donations, isLoading } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
  });

  if (isLoading) return <Skeleton className="h-48" />;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Donation Requests", "दान अनुरोध")}</h3>
      <p className="text-sm text-muted-foreground">
        {t("View all donation requests submitted by devotees", "भक्तों द्वारा जमा किए गए सभी दान अनुरोध देखें")}
      </p>

      {donations?.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {t("No donation requests yet", "अभी तक कोई दान अनुरोध नहीं")}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {donations?.map((donation) => (
            <Card key={donation.id} data-testid={`admin-donation-${donation.id}`}>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {donation.firstName} {donation.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{donation.phone}</p>
                    <p className="text-sm text-muted-foreground">{donation.email}</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{t("Type:", "प्रकार:")}</span> {donation.donationType}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      Rs. {donation.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {donation.city}, {donation.state}
                    </p>
                  </div>
                </div>
                {donation.address && (
                  <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">
                    {t("Address:", "पता:")} {donation.address}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" data-testid="page-admin">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t("Admin Panel", "व्यवस्थापक पैनल")}
              </h1>
              <p className="text-muted-foreground">
                {t("Manage your temple website content", "अपनी मंदिर वेबसाइट सामग्री प्रबंधित करें")}
              </p>
            </div>
            <Button variant="outline" onClick={onLogout} data-testid="button-admin-logout">
              {t("Logout", "लॉगआउट")}
            </Button>
          </div>

          <Tabs defaultValue="sliders" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-6">
              <TabsTrigger value="sliders" className="gap-1" data-testid="tab-admin-sliders">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Sliders", "स्लाइडर")}</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-1" data-testid="tab-admin-about">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">{t("About", "परिचय")}</span>
              </TabsTrigger>
              <TabsTrigger value="trust" className="gap-1" data-testid="tab-admin-trust">
                <Building className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Trust", "ट्रस्ट")}</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="gap-1" data-testid="tab-admin-contact">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Contact", "संपर्क")}</span>
              </TabsTrigger>
              <TabsTrigger value="timings" className="gap-1" data-testid="tab-admin-timings">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Timings", "समय")}</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-1" data-testid="tab-admin-gallery">
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Gallery", "गैलरी")}</span>
              </TabsTrigger>
              <TabsTrigger value="donations" className="gap-1" data-testid="tab-admin-donations">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Donations", "दान")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sliders">
              <Card>
                <CardContent className="pt-6">
                  <SliderManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <AboutManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trust">
              <Card>
                <CardContent className="pt-6">
                  <TrustManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardContent className="pt-6">
                  <ContactManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timings">
              <Card>
                <CardContent className="pt-6">
                  <TimingsManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery">
              <Card>
                <CardContent className="pt-6">
                  <GalleryManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donations">
              <Card>
                <CardContent className="pt-6">
                  <DonationsManager />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("adminAuth") === "true";
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AdminPanel onLogout={handleLogout} />;
}
