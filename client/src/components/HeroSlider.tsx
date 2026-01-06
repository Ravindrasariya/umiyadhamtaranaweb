import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { SliderImage } from "@shared/schema";

const defaultSlides = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1564804955013-e02e72e02ec8?w=1600&h=900&fit=crop",
    titleEn: "Welcome to Umiya Dham Tarana",
    titleHi: "उमिया धाम तराना में आपका स्वागत है",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=1600&h=900&fit=crop",
    titleEn: "Experience Divine Blessings",
    titleHi: "दिव्य आशीर्वाद का अनुभव करें",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1545126178-d998b23ed8e5?w=1600&h=900&fit=crop",
    titleEn: "A Sacred Pilgrimage Destination",
    titleHi: "एक पवित्र तीर्थ स्थल",
  },
];

export function HeroSlider() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: slides, isLoading } = useQuery<SliderImage[]>({
    queryKey: ["/api/slider-images"],
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
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden" data-testid="hero-slider">
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
        data-testid="button-slider-prev"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white border-0"
        onClick={nextSlide}
        data-testid="button-slider-next"
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
            data-testid={`slider-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
