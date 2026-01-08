import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, Video, X } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

function convertToEmbedUrl(url: string): string {
  if (!url) return url;
  
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  
  let videoId = "";
  
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }
  
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url;
}

const defaultPhotos: GalleryItem[] = [
  { id: "1", type: "photo", url: "https://images.unsplash.com/photo-1564804955013-e02e72e02ec8?w=600&h=400&fit=crop", thumbnailUrl: "", titleEn: "Temple Exterior", titleHi: "मंदिर का बाहरी दृश्य", order: 1, isActive: true },
  { id: "2", type: "photo", url: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=600&h=400&fit=crop", thumbnailUrl: "", titleEn: "Divine Idol", titleHi: "दिव्य मूर्ति", order: 2, isActive: true },
  { id: "3", type: "photo", url: "https://images.unsplash.com/photo-1545126178-d998b23ed8e5?w=600&h=400&fit=crop", thumbnailUrl: "", titleEn: "Temple Architecture", titleHi: "मंदिर की वास्तुकला", order: 3, isActive: true },
  { id: "4", type: "photo", url: "https://images.unsplash.com/photo-1600606585584-e82b0a5e6c3a?w=600&h=400&fit=crop", thumbnailUrl: "", titleEn: "Night View", titleHi: "रात्रि दृश्य", order: 4, isActive: true },
];

const defaultVideos: GalleryItem[] = [
  { id: "v1", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://images.unsplash.com/photo-1564804955013-e02e72e02ec8?w=400&h=300&fit=crop", titleEn: "Temple Tour", titleHi: "मंदिर यात्रा", order: 1, isActive: true },
  { id: "v2", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=400&h=300&fit=crop", titleEn: "Aarti Ceremony", titleHi: "आरती समारोह", order: 2, isActive: true },
];

export function GallerySection() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("photos");

  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const photos = galleryItems?.filter((item) => item.type === "photo") || defaultPhotos;
  const videos = galleryItems?.filter((item) => item.type === "video") || defaultVideos;

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-accent/30" data-testid="gallery-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Temple Gallery", "मंदिर गैलरी")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "A visual journey through the divine atmosphere of Umiya Dham Temple",
              "उमिया धाम मंदिर के दिव्य वातावरण की एक दृश्य यात्रा"
            )}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="photos" className="gap-2" data-testid="tab-photos">
              <Camera className="w-4 h-4" />
              {t("Photos", "फ़ोटो")}
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2" data-testid="tab-videos">
              <Video className="w-4 h-4" />
              {t("Videos", "वीडियो")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3] bg-muted"
                  onClick={() => setSelectedImage(photo.url)}
                  data-testid={`gallery-photo-${photo.id}`}
                >
                  <img
                    src={photo.url}
                    alt={t(photo.titleEn || "", photo.titleHi || "")}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium px-2 text-center">
                      {t(photo.titleEn || "", photo.titleHi || "")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative group overflow-hidden rounded-lg aspect-video bg-muted"
                  data-testid={`gallery-video-${video.id}`}
                >
                  {video.thumbnailUrl ? (
                    <div className="relative w-full h-full bg-muted">
                      <img
                        src={video.thumbnailUrl}
                        alt={t(video.titleEn || "", video.titleHi || "")}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                          <Video className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={convertToEmbedUrl(video.url)}
                      title={t(video.titleEn || "", video.titleHi || "")}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="text-white text-sm font-medium">
                      {t(video.titleEn || "", video.titleHi || "")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button variant="outline" className="border-primary text-primary" data-testid="button-view-gallery">
            {t("View Full Gallery", "पूरी गैलरी देखें")}
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-black/50 text-white"
            onClick={() => setSelectedImage(null)}
            data-testid="button-close-lightbox"
          >
            <X className="w-6 h-6" />
          </Button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
