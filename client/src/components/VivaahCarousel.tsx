import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VivaahCarouselImage } from "@shared/schema";

interface VivaahCarouselProps {
  images: VivaahCarouselImage[];
}

export function VivaahCarousel({ images }: VivaahCarouselProps) {
  const randomStartIndex = useMemo(() => 
    images.length > 0 ? Math.floor(Math.random() * images.length) : 0,
  [images.length]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    startIndex: randomStartIndex,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(randomStartIndex);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const touchResumeRef = useRef<NodeJS.Timeout | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play: advance every 3 seconds, pause on hover/touch
  useEffect(() => {
    if (!emblaApi || isHovered) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      if (touchResumeRef.current) {
        clearTimeout(touchResumeRef.current);
        touchResumeRef.current = null;
      }
    };
  }, [emblaApi, isHovered]);

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="w-full max-w-4xl mx-auto" 
      data-testid="vivaah-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => {
        if (touchResumeRef.current) clearTimeout(touchResumeRef.current);
        setIsHovered(true);
      }}
      onTouchEnd={() => {
        if (touchResumeRef.current) clearTimeout(touchResumeRef.current);
        touchResumeRef.current = setTimeout(() => setIsHovered(false), 3000);
      }}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="flex-none w-full sm:w-[60%] md:w-[45%] lg:w-[35%] min-w-0 pl-3 first:pl-0"
              >
                <div 
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg bg-muted"
                  data-testid={`carousel-slide-${index}`}
                >
                  <img
                    src={image.imageUrl}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {index + 1} / {images.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/90 rounded-full shadow-lg"
          onClick={scrollPrev}
          disabled={!canScrollPrev && !emblaApi?.canScrollPrev()}
          data-testid="button-carousel-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/90 rounded-full shadow-lg"
          onClick={scrollNext}
          disabled={!canScrollNext && !emblaApi?.canScrollNext()}
          data-testid="button-carousel-next"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex 
                ? "bg-primary w-6" 
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            data-testid={`carousel-dot-${index}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-2" data-testid="text-carousel-hint">
        Swipe to browse
      </p>
    </div>
  );
}
