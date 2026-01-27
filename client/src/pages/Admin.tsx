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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Trash2, Plus, Save, Image, FileText, Clock, Camera, Building, Phone, Lock, Heart, ScrollText, Home, Users, Upload, Pencil, X, Archive, ArchiveRestore } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import type { SliderImage, AboutContent, PoojaTiming, Service, GalleryItem, TrustContent, ContactInfo, TermsContent, Donation, TeamMember, VivaahPageInfo, VivaahSammelan, VivaahParticipant, VivaahCarouselImage } from "@shared/schema";
import { HeartHandshake } from "lucide-react";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ imageUrl: string; titleEn: string; titleHi: string }>({ imageUrl: "", titleEn: "", titleHi: "" });

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

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SliderImage> }) => {
      return apiRequest("PATCH", `/api/slider-images/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slider-images"] });
      setEditingId(null);
      setEditData({ imageUrl: "", titleEn: "", titleHi: "" });
      toast({ title: t("Slider updated successfully", "स्लाइडर सफलतापूर्वक अपडेट हुआ") });
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

  const startEditing = (slider: SliderImage) => {
    setEditingId(slider.id);
    setEditData({ imageUrl: slider.imageUrl, titleEn: slider.titleEn || "", titleHi: slider.titleHi || "" });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ imageUrl: "", titleEn: "", titleHi: "" });
  };

  if (isLoading) return <Skeleton className="h-48" />;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Manage Slider Images", "स्लाइडर इमेज प्रबंधित करें")}</h3>
      <p className="text-sm text-muted-foreground">{t("Maximum 3 images allowed", "अधिकतम 3 इमेज की अनुमति है")}</p>

      <div className="grid gap-4">
        {sliders?.map((slider) => (
          <Card key={slider.id} data-testid={`admin-slider-${slider.id}`}>
            {editingId === slider.id ? (
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("Upload Image", "इमेज अपलोड करें")}</label>
                  <ImageUploader
                    currentImageUrl={editData.imageUrl}
                    onImageUploaded={(objectPath) => setEditData({ ...editData, imageUrl: objectPath })}
                    onImageRemoved={() => setEditData({ ...editData, imageUrl: "" })}
                    placeholder={t("Click to upload slider image", "स्लाइडर इमेज अपलोड करने के लिए क्लिक करें")}
                  />
                </div>
                <Input
                  placeholder={t("Title (English)", "शीर्षक (अंग्रेज़ी)")}
                  value={editData.titleEn}
                  onChange={(e) => setEditData({ ...editData, titleEn: e.target.value })}
                  data-testid={`input-edit-slider-title-en-${slider.id}`}
                />
                <Input
                  placeholder={t("Title (Hindi)", "शीर्षक (हिंदी)")}
                  value={editData.titleHi}
                  onChange={(e) => setEditData({ ...editData, titleHi: e.target.value })}
                  data-testid={`input-edit-slider-title-hi-${slider.id}`}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => updateMutation.mutate({ id: slider.id, data: editData })}
                    disabled={!editData.imageUrl || updateMutation.isPending}
                    data-testid={`button-save-slider-${slider.id}`}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {t("Save", "सहेजें")}
                  </Button>
                  <Button variant="outline" onClick={cancelEditing} data-testid={`button-cancel-edit-slider-${slider.id}`}>
                    <X className="w-4 h-4 mr-2" />
                    {t("Cancel", "रद्द करें")}
                  </Button>
                </div>
              </CardContent>
            ) : (
              <CardContent className="flex items-center gap-4 p-4">
                <img src={slider.imageUrl} alt="" className="w-24 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium">{slider.titleEn}</p>
                  <p className="text-sm text-muted-foreground">{slider.titleHi}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => startEditing(slider)}
                    data-testid={`button-edit-slider-${slider.id}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(slider.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-slider-${slider.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {(sliders?.length || 0) < 3 && (
        <Card>
          <CardHeader className="pb-2">
            <h4 className="font-medium">{t("Add New Slider", "नया स्लाइडर जोड़ें")}</h4>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("Upload Image", "इमेज अपलोड करें")}</label>
              <ImageUploader
                currentImageUrl={newSlider.imageUrl}
                onImageUploaded={(objectPath) => setNewSlider({ ...newSlider, imageUrl: objectPath })}
                onImageRemoved={() => setNewSlider({ ...newSlider, imageUrl: "" })}
                placeholder={t("Click to upload slider image", "स्लाइडर इमेज अपलोड करने के लिए क्लिक करें")}
              />
            </div>
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
          <label className="text-sm font-medium mb-2 block">{t("Upload Image", "इमेज अपलोड करें")}</label>
          <ImageUploader
            currentImageUrl={currentData.imageUrl || ""}
            onImageUploaded={(objectPath) => setFormData({ ...formData, imageUrl: objectPath })}
            onImageRemoved={() => setFormData({ ...formData, imageUrl: "" })}
            placeholder={t("Click to upload image", "इमेज अपलोड करने के लिए क्लिक करें")}
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
              onClick={() => setNewItem({ ...newItem, type: "photo", url: "", thumbnailUrl: "" })}
              data-testid="button-type-photo"
            >
              {t("Photo", "फ़ोटो")}
            </Button>
            <Button
              variant={newItem.type === "video" ? "default" : "outline"}
              onClick={() => setNewItem({ ...newItem, type: "video", url: "", thumbnailUrl: "" })}
              data-testid="button-type-video"
            >
              {t("Video", "वीडियो")}
            </Button>
          </div>
          {newItem.type === "photo" ? (
            <div>
              <label className="text-sm font-medium mb-2 block">{t("Upload Photo", "फ़ोटो अपलोड करें")}</label>
              <ImageUploader
                currentImageUrl={newItem.url}
                onImageUploaded={(objectPath) => setNewItem({ ...newItem, url: objectPath })}
                onImageRemoved={() => setNewItem({ ...newItem, url: "" })}
                placeholder={t("Click to upload photo", "फ़ोटो अपलोड करने के लिए क्लिक करें")}
              />
            </div>
          ) : (
            <>
              <Input
                placeholder={t("Video Embed URL (YouTube)", "वीडियो एंबेड URL (YouTube)")}
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                data-testid="input-gallery-url"
              />
              <div>
                <label className="text-sm font-medium mb-2 block">{t("Upload Thumbnail", "थंबनेल अपलोड करें")}</label>
                <ImageUploader
                  currentImageUrl={newItem.thumbnailUrl}
                  onImageUploaded={(objectPath) => setNewItem({ ...newItem, thumbnailUrl: objectPath })}
                  onImageRemoved={() => setNewItem({ ...newItem, thumbnailUrl: "" })}
                  placeholder={t("Click to upload thumbnail", "थंबनेल अपलोड करने के लिए क्लिक करें")}
                />
              </div>
            </>
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

function TermsManager() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: terms, isLoading } = useQuery<TermsContent>({
    queryKey: ["/api/terms"],
  });

  const [form, setForm] = useState({
    titleEn: "",
    titleHi: "",
    contentEn: "",
    contentHi: "",
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<TermsContent>) => {
      await apiRequest("PATCH", `/api/terms/${terms?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/terms"] });
      toast({ title: t("Terms updated", "नियम अपडेट किए गए") });
    },
  });

  if (isLoading) return <Skeleton className="h-48" />;

  const currentForm = {
    titleEn: form.titleEn || terms?.titleEn || "",
    titleHi: form.titleHi || terms?.titleHi || "",
    contentEn: form.contentEn || terms?.contentEn || "",
    contentHi: form.contentHi || terms?.contentHi || "",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Terms & Conditions", "नियम और शर्तें")}</h3>
      <p className="text-sm text-muted-foreground">
        {t("Manage the terms and conditions shown on the donation page", "दान पृष्ठ पर दिखाई देने वाले नियम और शर्तें प्रबंधित करें")}
      </p>

      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">{t("Title (English)", "शीर्षक (अंग्रेज़ी)")}</label>
            <Input
              value={currentForm.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
              data-testid="input-terms-title-en"
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t("Title (Hindi)", "शीर्षक (हिंदी)")}</label>
            <Input
              value={currentForm.titleHi}
              onChange={(e) => setForm({ ...form, titleHi: e.target.value })}
              data-testid="input-terms-title-hi"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">{t("Content (English)", "सामग्री (अंग्रेज़ी)")}</label>
          <Textarea
            value={currentForm.contentEn}
            onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
            rows={12}
            data-testid="input-terms-content-en"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("Content (Hindi)", "सामग्री (हिंदी)")}</label>
          <Textarea
            value={currentForm.contentHi}
            onChange={(e) => setForm({ ...form, contentHi: e.target.value })}
            rows={12}
            data-testid="input-terms-content-hi"
          />
        </div>
        <Button
          onClick={() => updateMutation.mutate({
            titleEn: currentForm.titleEn,
            titleHi: currentForm.titleHi,
            contentEn: currentForm.contentEn,
            contentHi: currentForm.contentHi,
          })}
          disabled={updateMutation.isPending}
          data-testid="button-save-terms"
        >
          <Save className="w-4 h-4 mr-2" />
          {t("Save Changes", "परिवर्तन सहेजें")}
        </Button>
      </div>
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

function TeamMembersManager() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [newMember, setNewMember] = useState({
    nameEn: "",
    nameHi: "",
    designationEn: "",
    designationHi: "",
    phone: "",
    email: "",
    imageUrl: "",
  });

  const { data: members, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<TeamMember>) => {
      return apiRequest("POST", "/api/team-members", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      setNewMember({ nameEn: "", nameHi: "", designationEn: "", designationHi: "", phone: "", email: "", imageUrl: "" });
      toast({ title: t("Team member added", "टीम सदस्य जोड़ा गया") });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TeamMember> }) => {
      return apiRequest("PATCH", `/api/team-members/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({ title: t("Team member updated", "टीम सदस्य अपडेट किया गया") });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/team-members/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({ title: t("Team member deleted", "टीम सदस्य हटाया गया") });
    },
  });

  if (isLoading) return <Skeleton className="h-48" />;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("Team Members", "टीम सदस्य")}</h3>
      <p className="text-sm text-muted-foreground">{t("Manage Chairman, Secretary and Treasurer details", "अध्यक्ष, सचिव और कोषाध्यक्ष का विवरण प्रबंधित करें")}</p>

      <div className="space-y-4">
        {members?.map((member) => (
          <Card key={member.id} data-testid={`admin-team-${member.id}`}>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder={t("Name (English)", "नाम (अंग्रेज़ी)")}
                  defaultValue={member.nameEn}
                  onBlur={(e) => updateMutation.mutate({ id: member.id, data: { nameEn: e.target.value } })}
                  data-testid={`input-team-name-en-${member.id}`}
                />
                <Input
                  placeholder={t("Name (Hindi)", "नाम (हिंदी)")}
                  defaultValue={member.nameHi}
                  onBlur={(e) => updateMutation.mutate({ id: member.id, data: { nameHi: e.target.value } })}
                  data-testid={`input-team-name-hi-${member.id}`}
                />
                <Input
                  placeholder={t("Designation (English)", "पद (अंग्रेज़ी)")}
                  defaultValue={member.designationEn}
                  onBlur={(e) => updateMutation.mutate({ id: member.id, data: { designationEn: e.target.value } })}
                  data-testid={`input-team-designation-en-${member.id}`}
                />
                <Input
                  placeholder={t("Designation (Hindi)", "पद (हिंदी)")}
                  defaultValue={member.designationHi}
                  onBlur={(e) => updateMutation.mutate({ id: member.id, data: { designationHi: e.target.value } })}
                  data-testid={`input-team-designation-hi-${member.id}`}
                />
                <Input
                  placeholder={t("Phone", "फ़ोन")}
                  defaultValue={member.phone || ""}
                  onBlur={(e) => updateMutation.mutate({ id: member.id, data: { phone: e.target.value } })}
                  data-testid={`input-team-phone-${member.id}`}
                />
                <Input
                  placeholder={t("Email", "ईमेल")}
                  defaultValue={member.email || ""}
                  onBlur={(e) => updateMutation.mutate({ id: member.id, data: { email: e.target.value } })}
                  data-testid={`input-team-email-${member.id}`}
                />
              </div>
              <div className="md:col-span-2 mt-3">
                <label className="text-sm font-medium mb-2 block">{t("Photo", "फ़ोटो")}</label>
                <ImageUploader
                  currentImageUrl={member.imageUrl || ""}
                  onImageUploaded={(objectPath) => updateMutation.mutate({ id: member.id, data: { imageUrl: objectPath } })}
                  onImageRemoved={() => updateMutation.mutate({ id: member.id, data: { imageUrl: "" } })}
                  placeholder={t("Click to upload photo", "फ़ोटो अपलोड करने के लिए क्लिक करें")}
                />
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(member.id)}
                  data-testid={`button-delete-team-${member.id}`}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t("Delete", "हटाएं")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h4 className="font-medium">{t("Add New Member", "नया सदस्य जोड़ें")}</h4>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder={t("Name (English)", "नाम (अंग्रेज़ी)")}
              value={newMember.nameEn}
              onChange={(e) => setNewMember({ ...newMember, nameEn: e.target.value })}
              data-testid="input-new-team-name-en"
            />
            <Input
              placeholder={t("Name (Hindi)", "नाम (हिंदी)")}
              value={newMember.nameHi}
              onChange={(e) => setNewMember({ ...newMember, nameHi: e.target.value })}
              data-testid="input-new-team-name-hi"
            />
            <Input
              placeholder={t("Designation (English) - e.g. Chairman", "पद (अंग्रेज़ी) - जैसे Chairman")}
              value={newMember.designationEn}
              onChange={(e) => setNewMember({ ...newMember, designationEn: e.target.value })}
              data-testid="input-new-team-designation-en"
            />
            <Input
              placeholder={t("Designation (Hindi) - e.g. अध्यक्ष", "पद (हिंदी) - जैसे अध्यक्ष")}
              value={newMember.designationHi}
              onChange={(e) => setNewMember({ ...newMember, designationHi: e.target.value })}
              data-testid="input-new-team-designation-hi"
            />
            <Input
              placeholder={t("Phone", "फ़ोन")}
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              data-testid="input-new-team-phone"
            />
            <Input
              placeholder={t("Email", "ईमेल")}
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              data-testid="input-new-team-email"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t("Upload Photo", "फ़ोटो अपलोड करें")}</label>
            <ImageUploader
              currentImageUrl={newMember.imageUrl}
              onImageUploaded={(objectPath) => setNewMember({ ...newMember, imageUrl: objectPath })}
              onImageRemoved={() => setNewMember({ ...newMember, imageUrl: "" })}
              placeholder={t("Click to upload photo", "फ़ोटो अपलोड करने के लिए क्लिक करें")}
            />
          </div>
          <Button
            onClick={() => createMutation.mutate({ ...newMember, order: (members?.length || 0) + 1 })}
            disabled={!newMember.nameEn || !newMember.designationEn || createMutation.isPending}
            data-testid="button-add-team-member"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("Add Member", "सदस्य जोड़ें")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function VivaahSammelanManager() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: pageInfo, isLoading: pageInfoLoading } = useQuery<VivaahPageInfo>({
    queryKey: ["/api/vivaah/page-info"],
  });

  const { data: activeSammelan, isLoading: sammelanLoading } = useQuery<VivaahSammelan>({
    queryKey: ["/api/vivaah/active-sammelan"],
  });

  const { data: participants } = useQuery<VivaahParticipant[]>({
    queryKey: ["/api/vivaah/participants", activeSammelan?.id],
    enabled: !!activeSammelan?.id,
  });

  const { data: carouselImages } = useQuery<VivaahCarouselImage[]>({
    queryKey: ["/api/vivaah/carousel", activeSammelan?.id],
    enabled: !!activeSammelan?.id,
  });

  const [pageFormData, setPageFormData] = useState<Partial<VivaahPageInfo>>({});
  const [sammelanFormData, setSammelanFormData] = useState<Partial<VivaahSammelan>>({});
  const [newParticipant, setNewParticipant] = useState({ type: "bride" as "bride" | "groom", nameEn: "", nameHi: "", fatherNameEn: "", fatherNameHi: "", motherNameEn: "", motherNameHi: "", grandfatherNameEn: "", grandfatherNameHi: "", grandmotherNameEn: "", grandmotherNameHi: "", locationEn: "", locationHi: "", photoUrl: "" });
  const [editingParticipantId, setEditingParticipantId] = useState<string | null>(null);
  const [editParticipantData, setEditParticipantData] = useState<Partial<VivaahParticipant>>({});

  const updatePageInfoMutation = useMutation({
    mutationFn: async (data: Partial<VivaahPageInfo>) => {
      if (pageInfo?.id) {
        return apiRequest("PATCH", `/api/vivaah/page-info/${pageInfo.id}`, data);
      }
      return apiRequest("POST", "/api/vivaah/page-info", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/page-info"] });
      toast({ title: t("Page info updated", "पेज जानकारी अपडेट हुई") });
    },
  });

  const saveSammelanMutation = useMutation({
    mutationFn: async (data: Partial<VivaahSammelan>) => {
      if (activeSammelan?.id) {
        return apiRequest("PATCH", `/api/vivaah/sammelans/${activeSammelan.id}`, data);
      }
      return apiRequest("POST", "/api/vivaah/sammelans", { ...data, isActive: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/active-sammelan"] });
      toast({ title: t("Sammelan saved", "सम्मेलन सहेजा गया") });
    },
  });

  const createParticipantMutation = useMutation({
    mutationFn: async (data: Partial<VivaahParticipant>) => apiRequest("POST", "/api/vivaah/participants", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/participants", activeSammelan?.id] });
      setNewParticipant({ type: "bride", nameEn: "", nameHi: "", fatherNameEn: "", fatherNameHi: "", motherNameEn: "", motherNameHi: "", grandfatherNameEn: "", grandfatherNameHi: "", grandmotherNameEn: "", grandmotherNameHi: "", locationEn: "", locationHi: "", photoUrl: "" });
      toast({ title: t("Participant added", "प्रतिभागी जोड़ा गया") });
    },
  });

  const updateParticipantMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<VivaahParticipant> }) => apiRequest("PATCH", `/api/vivaah/participants/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/participants", activeSammelan?.id] });
      setEditingParticipantId(null);
      setEditParticipantData({});
      toast({ title: t("Participant updated", "प्रतिभागी अपडेट हुआ") });
    },
  });

  const deleteParticipantMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/vivaah/participants/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/participants", activeSammelan?.id] });
      setDeleteConfirmId(null);
      toast({ title: t("Participant deleted", "प्रतिभागी हटाया गया") });
    },
  });

  const archiveParticipantMutation = useMutation({
    mutationFn: async ({ id, archived }: { id: string; archived: boolean }) => apiRequest("PATCH", `/api/vivaah/participants/${id}`, { archived }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/participants", activeSammelan?.id] });
      toast({ title: t("Participant updated", "प्रतिभागी अपडेट हुआ") });
    },
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadingCarousel, setUploadingCarousel] = useState(false);

  const addCarouselImageMutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      if (!activeSammelan?.id) throw new Error("No active sammelan");
      return apiRequest("POST", "/api/vivaah/carousel", { 
        sammelanId: activeSammelan.id, 
        imageUrl, 
        order: (carouselImages?.length || 0) + 1 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/carousel", activeSammelan?.id] });
      toast({ title: t("Image added to carousel", "कैरोसेल में छवि जोड़ी गई") });
    },
  });

  const deleteCarouselImageMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/vivaah/carousel/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vivaah/carousel", activeSammelan?.id] });
      toast({ title: t("Image removed from carousel", "कैरोसेल से छवि हटाई गई") });
    },
  });

  const handleCarouselUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingCarousel(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/uploads', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          await addCarouselImageMutation.mutateAsync(data.filePath);
        }
      }
    } catch (error) {
      toast({ title: t("Upload failed", "अपलोड विफल"), variant: "destructive" });
    } finally {
      setUploadingCarousel(false);
      e.target.value = '';
    }
  };

  const startEditingParticipant = (participant: VivaahParticipant) => {
    setEditingParticipantId(participant.id);
    setEditParticipantData({
      type: participant.type,
      nameEn: participant.nameEn,
      nameHi: participant.nameHi || "",
      fatherNameEn: participant.fatherNameEn || "",
      fatherNameHi: participant.fatherNameHi || "",
      motherNameEn: participant.motherNameEn || "",
      motherNameHi: participant.motherNameHi || "",
      grandfatherNameEn: participant.grandfatherNameEn || "",
      grandfatherNameHi: participant.grandfatherNameHi || "",
      grandmotherNameEn: participant.grandmotherNameEn || "",
      grandmotherNameHi: participant.grandmotherNameHi || "",
      locationEn: participant.locationEn || "",
      locationHi: participant.locationHi || "",
    });
  };

  const cancelEditingParticipant = () => {
    setEditingParticipantId(null);
    setEditParticipantData({});
  };

  if (pageInfoLoading || sammelanLoading) return <Skeleton className="h-64" />;

  const currentPageData = { ...pageInfo, ...pageFormData };
  const currentSammelanData = activeSammelan ? { ...activeSammelan, ...sammelanFormData } : sammelanFormData;
  const brides = participants?.filter(p => p.type === "bride") || [];
  const grooms = participants?.filter(p => p.type === "groom") || [];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t("Vivaah Sammelan Management", "विवाह सम्मेलन प्रबंधन")}</h3>

      <Card>
        <CardHeader className="pb-2">
          <h4 className="font-medium">{t("Page Info (Title & Description)", "पेज जानकारी (शीर्षक और विवरण)")}</h4>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder={t("Title (English)", "शीर्षक (अंग्रेज़ी)")} value={currentPageData.titleEn || ""} onChange={(e) => setPageFormData({ ...pageFormData, titleEn: e.target.value })} data-testid="input-vivaah-page-title-en" />
            <Input placeholder={t("Title (Hindi)", "शीर्षक (हिंदी)")} value={currentPageData.titleHi || ""} onChange={(e) => setPageFormData({ ...pageFormData, titleHi: e.target.value })} data-testid="input-vivaah-page-title-hi" />
          </div>
          <Textarea placeholder={t("Description (English)", "विवरण (अंग्रेज़ी)")} value={currentPageData.descriptionEn || ""} onChange={(e) => setPageFormData({ ...pageFormData, descriptionEn: e.target.value })} rows={3} data-testid="input-vivaah-page-desc-en" />
          <Textarea placeholder={t("Description (Hindi)", "विवरण (हिंदी)")} value={currentPageData.descriptionHi || ""} onChange={(e) => setPageFormData({ ...pageFormData, descriptionHi: e.target.value })} rows={3} data-testid="input-vivaah-page-desc-hi" />
          <Button onClick={() => updatePageInfoMutation.mutate(pageFormData)} disabled={updatePageInfoMutation.isPending} data-testid="button-save-vivaah-page-info">
            <Save className="w-4 h-4 mr-2" />
            {t("Save Page Info", "पेज जानकारी सहेजें")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h4 className="font-medium">{t("Current Sammelan (Event & Finances)", "वर्तमान सम्मेलन (कार्यक्रम और वित्त)")}</h4>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder={t("Event Title (English)", "कार्यक्रम शीर्षक (अंग्रेज़ी)")} value={currentSammelanData.titleEn || ""} onChange={(e) => setSammelanFormData({ ...sammelanFormData, titleEn: e.target.value })} data-testid="input-sammelan-title-en" />
            <Input placeholder={t("Event Title (Hindi)", "कार्यक्रम शीर्षक (हिंदी)")} value={currentSammelanData.titleHi || ""} onChange={(e) => setSammelanFormData({ ...sammelanFormData, titleHi: e.target.value })} data-testid="input-sammelan-title-hi" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-green-600">{t("Overall Income (₹)", "कुल आय (₹)")}</label>
              <Input placeholder="0" value={currentSammelanData.overallIncome || ""} onChange={(e) => setSammelanFormData({ ...sammelanFormData, overallIncome: e.target.value })} data-testid="input-sammelan-income" />
            </div>
            <div>
              <label className="text-sm font-medium text-red-600">{t("Overall Expense (₹)", "कुल व्यय (₹)")}</label>
              <Input placeholder="0" value={currentSammelanData.overallExpense || ""} onChange={(e) => setSammelanFormData({ ...sammelanFormData, overallExpense: e.target.value })} data-testid="input-sammelan-expense" />
            </div>
            <div>
              <label className="text-sm font-medium">{t("As of Date", "दिनांक")}</label>
              <Input type="date" value={currentSammelanData.asOfDate || ""} onChange={(e) => setSammelanFormData({ ...sammelanFormData, asOfDate: e.target.value })} data-testid="input-sammelan-date" />
            </div>
            <div>
              <label className="text-sm font-medium text-primary">{t("Total Pairs #", "कुल जोड़े #")}</label>
              <Input type="number" min="0" placeholder="0" value={currentSammelanData.totalPairs || ""} onChange={(e) => setSammelanFormData({ ...sammelanFormData, totalPairs: parseInt(e.target.value) || 0 })} data-testid="input-sammelan-total-pairs" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Switch
              checked={currentSammelanData.showCarousel !== false}
              onCheckedChange={(checked) => setSammelanFormData({ ...sammelanFormData, showCarousel: checked })}
              data-testid="switch-show-carousel"
            />
            <label className="text-sm font-medium">{t("Show Marketing Carousel on Public Page", "सार्वजनिक पेज पर मार्केटिंग कैरोसेल दिखाएं")}</label>
          </div>
          <Button onClick={() => saveSammelanMutation.mutate(sammelanFormData)} disabled={saveSammelanMutation.isPending} data-testid="button-save-sammelan">
            <Save className="w-4 h-4 mr-2" />
            {activeSammelan ? t("Update", "अपडेट करें") : t("Create Sammelan", "सम्मेलन बनाएं")}
          </Button>
        </CardContent>
      </Card>

      {activeSammelan && (
        <>
          <Card>
            <CardHeader className="pb-2">
              <h4 className="font-medium">{t("Marketing Carousel Images", "मार्केटिंग कैरोसेल छवियाँ")}</h4>
              <p className="text-sm text-muted-foreground">{t("Upload A5 size images for the swipeable carousel (max 20 images)", "स्वाइप करने योग्य कैरोसेल के लिए A5 आकार की छवियाँ अपलोड करें (अधिकतम 20 छवियाँ)")}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleCarouselUpload}
                    className="hidden"
                    disabled={uploadingCarousel || (carouselImages?.length || 0) >= 20}
                    data-testid="input-carousel-upload"
                  />
                  <Button asChild disabled={uploadingCarousel || (carouselImages?.length || 0) >= 20}>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingCarousel ? t("Uploading...", "अपलोड हो रहा है...") : t("Upload Images", "छवियाँ अपलोड करें")}
                    </span>
                  </Button>
                </label>
                <span className="text-sm text-muted-foreground">
                  {carouselImages?.length || 0} / 20 {t("images", "छवियाँ")}
                </span>
              </div>
              
              {carouselImages && carouselImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {carouselImages.map((img, idx) => (
                    <div key={img.id} className="relative aspect-[3/4] rounded-lg border-2 border-border bg-muted" data-testid={`carousel-image-${img.id}`}>
                      <img src={img.imageUrl} alt={`Carousel ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                      <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded z-10">
                        {idx + 1}
                      </div>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-1 right-1 z-10"
                        onClick={() => deleteCarouselImageMutation.mutate(img.id)}
                        disabled={deleteCarouselImageMutation.isPending}
                        data-testid={`button-delete-carousel-${img.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {(!carouselImages || carouselImages.length === 0) && (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>{t("No carousel images uploaded yet", "अभी तक कोई कैरोसेल छवियाँ अपलोड नहीं की गई हैं")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h4 className="font-medium">{t("Add New Participant", "नया प्रतिभागी जोड़ें")}</h4>
              <p className="text-sm text-muted-foreground">{t("Total", "कुल")}: {brides.length} {t("Brides", "वधू")} | {grooms.length} {t("Grooms", "वर")}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-6 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="participantType" checked={newParticipant.type === "bride"} onChange={() => setNewParticipant({ ...newParticipant, type: "bride" })} className="w-4 h-4" />
                  <span className="text-pink-600 font-medium">{t("Bride", "वधू")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="participantType" checked={newParticipant.type === "groom"} onChange={() => setNewParticipant({ ...newParticipant, type: "groom" })} className="w-4 h-4" />
                  <span className="text-blue-600 font-medium">{t("Groom", "वर")}</span>
                </label>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-24 flex-shrink-0">
                  <label className="text-sm font-medium mb-2 block">{t("Photo", "फ़ोटो")}</label>
                  <ImageUploader
                    currentImageUrl={newParticipant.photoUrl}
                    onImageUploaded={(objectPath) => setNewParticipant({ ...newParticipant, photoUrl: objectPath })}
                    onImageRemoved={() => setNewParticipant({ ...newParticipant, photoUrl: "" })}
                    placeholder={t("Upload", "अपलोड")}
                    className="w-24 h-24 rounded-full overflow-hidden"
                  />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                <Input placeholder={t("Name (English)", "नाम")} value={newParticipant.nameEn} onChange={(e) => setNewParticipant({ ...newParticipant, nameEn: e.target.value })} data-testid="input-participant-name-en" />
                <Input placeholder={t("Name (Hindi)", "नाम (हिंदी)")} value={newParticipant.nameHi} onChange={(e) => setNewParticipant({ ...newParticipant, nameHi: e.target.value })} data-testid="input-participant-name-hi" />
                <Input placeholder={t("Father's Name (English)", "पिता का नाम")} value={newParticipant.fatherNameEn} onChange={(e) => setNewParticipant({ ...newParticipant, fatherNameEn: e.target.value })} />
                <Input placeholder={t("Father's Name (Hindi)", "पिता का नाम (हिंदी)")} value={newParticipant.fatherNameHi} onChange={(e) => setNewParticipant({ ...newParticipant, fatherNameHi: e.target.value })} />
                <Input placeholder={t("Mother's Name (English)", "माता का नाम")} value={newParticipant.motherNameEn} onChange={(e) => setNewParticipant({ ...newParticipant, motherNameEn: e.target.value })} />
                <Input placeholder={t("Mother's Name (Hindi)", "माता का नाम (हिंदी)")} value={newParticipant.motherNameHi} onChange={(e) => setNewParticipant({ ...newParticipant, motherNameHi: e.target.value })} />
                <Input placeholder={t("Grandfather's Name (English)", "दादा का नाम")} value={newParticipant.grandfatherNameEn} onChange={(e) => setNewParticipant({ ...newParticipant, grandfatherNameEn: e.target.value })} />
                <Input placeholder={t("Grandfather's Name (Hindi)", "दादा का नाम (हिंदी)")} value={newParticipant.grandfatherNameHi} onChange={(e) => setNewParticipant({ ...newParticipant, grandfatherNameHi: e.target.value })} />
                <Input placeholder={t("Grandmother's Name (English)", "दादी का नाम")} value={newParticipant.grandmotherNameEn} onChange={(e) => setNewParticipant({ ...newParticipant, grandmotherNameEn: e.target.value })} />
                <Input placeholder={t("Grandmother's Name (Hindi)", "दादी का नाम (हिंदी)")} value={newParticipant.grandmotherNameHi} onChange={(e) => setNewParticipant({ ...newParticipant, grandmotherNameHi: e.target.value })} />
                <Input placeholder={t("Location (English)", "स्थान")} value={newParticipant.locationEn} onChange={(e) => setNewParticipant({ ...newParticipant, locationEn: e.target.value })} />
                <Input placeholder={t("Location (Hindi)", "स्थान (हिंदी)")} value={newParticipant.locationHi} onChange={(e) => setNewParticipant({ ...newParticipant, locationHi: e.target.value })} />
                </div>
              </div>
              <Button onClick={() => createParticipantMutation.mutate({ ...newParticipant, sammelanId: activeSammelan.id, order: (participants?.length || 0) + 1 })} disabled={!newParticipant.nameEn || createParticipantMutation.isPending} data-testid="button-add-participant">
                <Plus className="w-4 h-4 mr-2" />
                {t("Add Participant", "प्रतिभागी जोड़ें")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h4 className="font-medium">{t("Registered Participants", "पंजीकृत प्रतिभागी")}</h4>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-pink-600 mb-3">{t("Brides", "वधू")} ({brides.length})</h5>
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {brides.map((bride, idx) => (
                      <Card key={bride.id} className={`border-pink-200 ${bride.archived ? "opacity-50 blur-[1px]" : ""}`} data-testid={`participant-bride-${bride.id}`}>
                        <CardContent className="p-3">
                          {bride.archived && <span className="text-xs bg-muted px-2 py-0.5 rounded mb-1 inline-block">{t("Archived", "संग्रहीत")}</span>}
                          {editingParticipantId === bride.id ? (
                            <div className="space-y-2">
                              <div className="flex items-start gap-3">
                                <div className="w-16 flex-shrink-0">
                                  <ImageUploader
                                    currentImageUrl={editParticipantData.photoUrl || ""}
                                    onImageUploaded={(objectPath) => setEditParticipantData({ ...editParticipantData, photoUrl: objectPath })}
                                    onImageRemoved={() => setEditParticipantData({ ...editParticipantData, photoUrl: "" })}
                                    placeholder=""
                                    className="w-16 h-16 rounded-full overflow-hidden"
                                  />
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                  <Input placeholder={t("Name (English)", "नाम")} value={editParticipantData.nameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, nameEn: e.target.value })} />
                                  <Input placeholder={t("Name (Hindi)", "नाम (हिंदी)")} value={editParticipantData.nameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, nameHi: e.target.value })} />
                                  <Input placeholder={t("Father's Name (English)", "पिता का नाम")} value={editParticipantData.fatherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, fatherNameEn: e.target.value })} />
                                  <Input placeholder={t("Father's Name (Hindi)", "पिता का नाम (हिंदी)")} value={editParticipantData.fatherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, fatherNameHi: e.target.value })} />
                                  <Input placeholder={t("Mother's Name (English)", "माता का नाम")} value={editParticipantData.motherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, motherNameEn: e.target.value })} />
                                  <Input placeholder={t("Mother's Name (Hindi)", "माता का नाम (हिंदी)")} value={editParticipantData.motherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, motherNameHi: e.target.value })} />
                                  <Input placeholder={t("Grandfather's Name (English)", "दादा का नाम")} value={editParticipantData.grandfatherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandfatherNameEn: e.target.value })} />
                                  <Input placeholder={t("Grandfather's Name (Hindi)", "दादा का नाम (हिंदी)")} value={editParticipantData.grandfatherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandfatherNameHi: e.target.value })} />
                                  <Input placeholder={t("Grandmother's Name (English)", "दादी का नाम")} value={editParticipantData.grandmotherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandmotherNameEn: e.target.value })} />
                                  <Input placeholder={t("Grandmother's Name (Hindi)", "दादी का नाम (हिंदी)")} value={editParticipantData.grandmotherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandmotherNameHi: e.target.value })} />
                                  <Input placeholder={t("Location (English)", "स्थान")} value={editParticipantData.locationEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, locationEn: e.target.value })} />
                                  <Input placeholder={t("Location (Hindi)", "स्थान (हिंदी)")} value={editParticipantData.locationHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, locationHi: e.target.value })} />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateParticipantMutation.mutate({ id: bride.id, data: editParticipantData })} disabled={updateParticipantMutation.isPending}>
                                  <Save className="w-3 h-3 mr-1" />{t("Save", "सहेजें")}
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEditingParticipant}>
                                  <X className="w-3 h-3 mr-1" />{t("Cancel", "रद्द")}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                {bride.photoUrl && <img src={bride.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />}
                                <div className="text-sm">
                                  <p className="font-medium">{idx + 1}. {bride.nameEn} / {bride.nameHi}</p>
                                  <p className="text-muted-foreground">{t("Father", "पिता")}: {bride.fatherNameEn || "-"}</p>
                                  <p className="text-muted-foreground">{t("Location", "स्थान")}: {bride.locationEn || "-"}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button size="icon" variant="ghost" onClick={() => startEditingParticipant(bride)} data-testid={`button-edit-bride-${bride.id}`}><Pencil className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" onClick={() => archiveParticipantMutation.mutate({ id: bride.id, archived: !bride.archived })} title={bride.archived ? t("Unarchive", "पुनर्स्थापित") : t("Archive", "संग्रहित करें")}>
                                  {bride.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                                </Button>
                                {deleteConfirmId === bride.id ? (
                                  <div className="flex items-center gap-1 bg-destructive/10 px-2 py-1 rounded">
                                    <span className="text-xs text-destructive">{t("Sure?", "पक्का?")}</span>
                                    <Button size="sm" variant="destructive" className="h-6 px-2" onClick={() => deleteParticipantMutation.mutate(bride.id)}>{t("Yes", "हाँ")}</Button>
                                    <Button size="sm" variant="outline" className="h-6 px-2" onClick={() => setDeleteConfirmId(null)}>{t("No", "नहीं")}</Button>
                                  </div>
                                ) : (
                                  <Button size="icon" variant="destructive" onClick={() => setDeleteConfirmId(bride.id)}><Trash2 className="w-4 h-4" /></Button>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    {brides.length === 0 && <p className="text-muted-foreground text-center py-4">{t("No brides yet", "अभी कोई वधू नहीं")}</p>}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-blue-600 mb-3">{t("Grooms", "वर")} ({grooms.length})</h5>
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {grooms.map((groom, idx) => (
                      <Card key={groom.id} className={`border-blue-200 ${groom.archived ? "opacity-50 blur-[1px]" : ""}`} data-testid={`participant-groom-${groom.id}`}>
                        <CardContent className="p-3">
                          {groom.archived && <span className="text-xs bg-muted px-2 py-0.5 rounded mb-1 inline-block">{t("Archived", "संग्रहीत")}</span>}
                          {editingParticipantId === groom.id ? (
                            <div className="space-y-2">
                              <div className="flex items-start gap-3">
                                <div className="w-16 flex-shrink-0">
                                  <ImageUploader
                                    currentImageUrl={editParticipantData.photoUrl || ""}
                                    onImageUploaded={(objectPath) => setEditParticipantData({ ...editParticipantData, photoUrl: objectPath })}
                                    onImageRemoved={() => setEditParticipantData({ ...editParticipantData, photoUrl: "" })}
                                    placeholder=""
                                    className="w-16 h-16 rounded-full overflow-hidden"
                                  />
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                  <Input placeholder={t("Name (English)", "नाम")} value={editParticipantData.nameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, nameEn: e.target.value })} />
                                  <Input placeholder={t("Name (Hindi)", "नाम (हिंदी)")} value={editParticipantData.nameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, nameHi: e.target.value })} />
                                  <Input placeholder={t("Father's Name (English)", "पिता का नाम")} value={editParticipantData.fatherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, fatherNameEn: e.target.value })} />
                                  <Input placeholder={t("Father's Name (Hindi)", "पिता का नाम (हिंदी)")} value={editParticipantData.fatherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, fatherNameHi: e.target.value })} />
                                  <Input placeholder={t("Mother's Name (English)", "माता का नाम")} value={editParticipantData.motherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, motherNameEn: e.target.value })} />
                                  <Input placeholder={t("Mother's Name (Hindi)", "माता का नाम (हिंदी)")} value={editParticipantData.motherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, motherNameHi: e.target.value })} />
                                  <Input placeholder={t("Grandfather's Name (English)", "दादा का नाम")} value={editParticipantData.grandfatherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandfatherNameEn: e.target.value })} />
                                  <Input placeholder={t("Grandfather's Name (Hindi)", "दादा का नाम (हिंदी)")} value={editParticipantData.grandfatherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandfatherNameHi: e.target.value })} />
                                  <Input placeholder={t("Grandmother's Name (English)", "दादी का नाम")} value={editParticipantData.grandmotherNameEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandmotherNameEn: e.target.value })} />
                                  <Input placeholder={t("Grandmother's Name (Hindi)", "दादी का नाम (हिंदी)")} value={editParticipantData.grandmotherNameHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, grandmotherNameHi: e.target.value })} />
                                  <Input placeholder={t("Location (English)", "स्थान")} value={editParticipantData.locationEn || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, locationEn: e.target.value })} />
                                  <Input placeholder={t("Location (Hindi)", "स्थान (हिंदी)")} value={editParticipantData.locationHi || ""} onChange={(e) => setEditParticipantData({ ...editParticipantData, locationHi: e.target.value })} />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateParticipantMutation.mutate({ id: groom.id, data: editParticipantData })} disabled={updateParticipantMutation.isPending}>
                                  <Save className="w-3 h-3 mr-1" />{t("Save", "सहेजें")}
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEditingParticipant}>
                                  <X className="w-3 h-3 mr-1" />{t("Cancel", "रद्द")}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                {groom.photoUrl && <img src={groom.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />}
                                <div className="text-sm">
                                  <p className="font-medium">{idx + 1}. {groom.nameEn} / {groom.nameHi}</p>
                                  <p className="text-muted-foreground">{t("Father", "पिता")}: {groom.fatherNameEn || "-"}</p>
                                  <p className="text-muted-foreground">{t("Location", "स्थान")}: {groom.locationEn || "-"}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button size="icon" variant="ghost" onClick={() => startEditingParticipant(groom)} data-testid={`button-edit-groom-${groom.id}`}><Pencil className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" onClick={() => archiveParticipantMutation.mutate({ id: groom.id, archived: !groom.archived })} title={groom.archived ? t("Unarchive", "पुनर्स्थापित") : t("Archive", "संग्रहित करें")}>
                                  {groom.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                                </Button>
                                {deleteConfirmId === groom.id ? (
                                  <div className="flex items-center gap-1 bg-destructive/10 px-2 py-1 rounded">
                                    <span className="text-xs text-destructive">{t("Sure?", "पक्का?")}</span>
                                    <Button size="sm" variant="destructive" className="h-6 px-2" onClick={() => deleteParticipantMutation.mutate(groom.id)}>{t("Yes", "हाँ")}</Button>
                                    <Button size="sm" variant="outline" className="h-6 px-2" onClick={() => setDeleteConfirmId(null)}>{t("No", "नहीं")}</Button>
                                  </div>
                                ) : (
                                  <Button size="icon" variant="destructive" onClick={() => setDeleteConfirmId(groom.id)}><Trash2 className="w-4 h-4" /></Button>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    {grooms.length === 0 && <p className="text-muted-foreground text-center py-4">{t("No grooms yet", "अभी कोई वर नहीं")}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
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
            <TabsList className="flex flex-wrap w-full gap-1 h-auto mb-6 p-2">
              <div className="w-full mb-2 text-xs font-medium text-muted-foreground">{t("Temple", "मंदिर")}</div>
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
              <TabsTrigger value="terms" className="gap-1" data-testid="tab-admin-terms">
                <ScrollText className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Terms", "नियम")}</span>
              </TabsTrigger>
              <TabsTrigger value="donations" className="gap-1" data-testid="tab-admin-donations">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Donations", "दान")}</span>
              </TabsTrigger>
              <div className="w-full mt-3 mb-2 pt-2 border-t text-xs font-medium text-muted-foreground">{t("Team", "टीम")}</div>
              <TabsTrigger value="team" className="gap-1" data-testid="tab-admin-team">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Team", "टीम")}</span>
              </TabsTrigger>
              <div className="w-full mt-3 mb-2 pt-2 border-t text-xs font-medium text-muted-foreground">{t("Vivaah Sammelan", "विवाह सम्मेलन")}</div>
              <TabsTrigger value="vivaah" className="gap-1" data-testid="tab-admin-vivaah">
                <HeartHandshake className="w-4 h-4" />
                <span className="hidden sm:inline">{t("Vivaah", "विवाह")}</span>
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

            <TabsContent value="terms">
              <Card>
                <CardContent className="pt-6">
                  <TermsManager />
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

            <TabsContent value="team">
              <Card>
                <CardContent className="pt-6">
                  <TeamMembersManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vivaah">
              <Card>
                <CardContent className="pt-6">
                  <VivaahSammelanManager />
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
