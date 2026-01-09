import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Heart, Leaf, Sprout, Phone } from "lucide-react";
import type { GaushalaSlider, GaushalaAbout, GaushalaService, GaushalaGallery } from "@shared/schema";

const defaultSlides = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=1600&h=900&fit=crop",
    titleEn: "Gopal Gaushala Kachnariya",
    titleHi: "गोपाल गौशाला कचनारिया",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=1600&h=900&fit=crop",
    titleEn: "Sacred Cow Protection",
    titleHi: "पवित्र गौ रक्षा",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&h=900&fit=crop",
    titleEn: "Serving Gau Mata",
    titleHi: "गौ माता की सेवा",
  },
];

const defaultAbout: GaushalaAbout = {
  id: "default",
  titleEn: "About Gopal Gaushala Kachnariya",
  titleHi: "गोपाल गौशाला कचनारिया के बारे में",
  contentEn: "Gopal Gaushala Kachnariya is a sacred cow shelter dedicated to the protection and care of cows. The gaushala provides shelter, food, and medical care to cows and promotes the ancient tradition of cow worship. We believe in serving Gau Mata with devotion and dedication.",
  contentHi: "गोपाल गौशाला कचनारिया गायों की सुरक्षा और देखभाल के लिए समर्पित एक पवित्र गौशाला है। गौशाला गायों को आश्रय, भोजन और चिकित्सा देखभाल प्रदान करती है और गौ पूजा की प्राचीन परंपरा को बढ़ावा देती है। हम भक्ति और समर्पण के साथ गौ माता की सेवा में विश्वास करते हैं।",
  imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&h=600&fit=crop",
  contactPhone: null,
};

const defaultServices: GaushalaService[] = [
  {
    id: "1",
    titleEn: "Adopt a Gau Mata",
    titleHi: "गौ माता गोद लें",
    descriptionEn: "Sponsor a cow and contribute to her well-being. Your adoption helps provide food, shelter, and medical care to our beloved Gau Mata.",
    descriptionHi: "एक गाय को प्रायोजित करें और उसकी भलाई में योगदान दें। आपकी गोद लेने से हमारी प्रिय गौ माता को भोजन, आश्रय और चिकित्सा देखभाल प्रदान करने में मदद मिलती है।",
    imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&h=400&fit=crop",
    order: 0,
  },
  {
    id: "2",
    titleEn: "Buy Gobar Khad",
    titleHi: "गोबर खाद खरीदें",
    descriptionEn: "Pure organic cow dung manure for your gardens and farms. Rich in nutrients and completely natural, it enhances soil fertility.",
    descriptionHi: "आपके बगीचों और खेतों के लिए शुद्ध जैविक गोबर खाद। पोषक तत्वों से भरपूर और पूरी तरह से प्राकृतिक, यह मिट्टी की उर्वरता बढ़ाती है।",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    order: 1,
  },
  {
    id: "3",
    titleEn: "Buy Vermicompost Khad",
    titleHi: "वर्मीकम्पोस्ट खाद खरीदें",
    descriptionEn: "Premium quality vermicompost produced at our gaushala. Perfect for organic farming and gardening with excellent results.",
    descriptionHi: "हमारी गौशाला में उत्पादित प्रीमियम गुणवत्ता की वर्मीकम्पोस्ट। उत्कृष्ट परिणामों के साथ जैविक खेती और बागवानी के लिए उपयुक्त।",
    imageUrl: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&h=400&fit=crop",
    order: 2,
  },
];

const defaultGallery: GaushalaGallery[] = [
  { id: "1", imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&h=400&fit=crop", titleEn: "Cow at Gaushala", titleHi: "गौशाला में गाय", order: 0, isActive: true },
  { id: "2", imageUrl: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=600&h=400&fit=crop", titleEn: "Feeding Time", titleHi: "भोजन का समय", order: 1, isActive: true },
  { id: "3", imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop", titleEn: "Happy Cows", titleHi: "खुश गायें", order: 2, isActive: true },
  { id: "4", imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop", titleEn: "Gaushala View", titleHi: "गौशाला दृश्य", order: 3, isActive: true },
];

const serviceIcons = [Heart, Leaf, Sprout];

function GaushalaHeroSlider() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: slides, isLoading } = useQuery<GaushalaSlider[]>({
    queryKey: ["/api/gaushala/sliders"],
  });

  const displaySlides = slides && slides.length > 0 ? slides : defaultSlides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  }, [displaySlides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden" data-testid="gaushala-hero-slider">
      {displaySlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={t(slide.titleEn || "", slide.titleHi || "")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
              {t(slide.titleEn || "", slide.titleHi || "")}
            </h1>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white border-0"
        onClick={prevSlide}
        data-testid="button-gaushala-slider-prev"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white border-0"
        onClick={nextSlide}
        data-testid="button-gaushala-slider-next"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {displaySlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50"
            }`}
            data-testid={`gaushala-slider-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

function GaushalaAboutSection() {
  const { t } = useLanguage();

  const { data: about, isLoading } = useQuery<GaushalaAbout>({
    queryKey: ["/api/gaushala/about"],
  });

  const displayAbout = about || defaultAbout;

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-80 w-full" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background" data-testid="gaushala-about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-gaushala-about-title">
              {t(displayAbout.titleEn, displayAbout.titleHi)}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-gaushala-about-content">
              {t(displayAbout.contentEn, displayAbout.contentHi)}
            </p>
          </div>
          {displayAbout.imageUrl && (
            <div className="relative">
              <img
                src={displayAbout.imageUrl}
                alt={t(displayAbout.titleEn, displayAbout.titleHi)}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                data-testid="img-gaushala-about"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/30 rounded-full -z-10" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function GaushalaServicesSection() {
  const { t } = useLanguage();

  const { data: services, isLoading } = useQuery<GaushalaService[]>({
    queryKey: ["/api/gaushala/services"],
  });

  const displayServices = services && services.length > 0 ? services : defaultServices;

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-primary/10 to-background" data-testid="gaushala-services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-gaushala-services-title">
            {t("Our Services", "हमारी सेवाएं")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Support our gaushala and contribute to cow welfare",
              "हमारी गौशाला का समर्थन करें और गौ कल्याण में योगदान दें"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Card key={service.id} className="overflow-hidden hover-elevate" data-testid={`card-gaushala-service-${index}`}>
                {service.imageUrl && (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={t(service.titleEn, service.titleHi)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div className="bg-primary/90 p-2 rounded-full">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-lg">
                        {t(service.titleEn, service.titleHi)}
                      </h3>
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    {t(service.descriptionEn, service.descriptionHi)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GaushalaGallerySection() {
  const { t } = useLanguage();

  const { data: gallery, isLoading } = useQuery<GaushalaGallery[]>({
    queryKey: ["/api/gaushala/gallery"],
  });

  const displayGallery = gallery && gallery.length > 0 ? gallery : defaultGallery;

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background" data-testid="gaushala-gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-gaushala-gallery-title">
            {t("Photo Gallery", "फोटो गैलरी")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Glimpses of our gaushala and the cows we care for",
              "हमारी गौशाला और हमारी देखभाल में गायों की झलकियां"
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayGallery.map((item, index) => (
            <div
              key={item.id}
              className="aspect-square relative overflow-hidden rounded-lg group bg-muted"
              data-testid={`gaushala-gallery-item-${index}`}
            >
              <img
                src={item.imageUrl}
                alt={t(item.titleEn || "", item.titleHi || "")}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {(item.titleEn || item.titleHi) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">
                    {t(item.titleEn || "", item.titleHi || "")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GaushalaContactSection() {
  const { t } = useLanguage();

  const { data: about } = useQuery<GaushalaAbout>({
    queryKey: ["/api/gaushala/about"],
  });

  if (!about?.contactPhone) return null;

  return (
    <section className="py-16 bg-muted/30" data-testid="section-gaushala-contact">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6" data-testid="text-gaushala-contact-title">
            {t("Contact Gaushala", "गौशाला से संपर्क करें")}
          </h2>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t("Phone Number", "फ़ोन नंबर")}
                  </p>
                  <a
                    href={`tel:${about.contactPhone.replace(/\s/g, "")}`}
                    className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                    data-testid="link-gaushala-phone"
                  >
                    {about.contactPhone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function Gaushala() {
  return (
    <div className="min-h-screen flex flex-col" data-testid="page-gaushala">
      <Header />
      <main className="flex-1">
        <GaushalaHeroSlider />
        <GaushalaAboutSection />
        <GaushalaServicesSection />
        <GaushalaGallerySection />
        <GaushalaContactSection />
      </main>
      <Footer />
    </div>
  );
}
