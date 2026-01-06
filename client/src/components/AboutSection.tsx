import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { AboutContent } from "@shared/schema";

const defaultAbout = {
  titleEn: "About Temple",
  titleHi: "मंदिर के बारे में",
  contentEn: "Umiya Dham Tarana is a sacred temple dedicated to Goddess Umiya, the kuldevi (clan deity) of the Kadva Patidar community. The temple stands as a beacon of spiritual devotion and cultural heritage, welcoming devotees from all over the world. With its magnificent architecture and serene atmosphere, the temple offers a divine experience to all who visit. The temple complex houses beautiful idols and provides various religious services throughout the year.",
  contentHi: "उमिया धाम टाराना देवी उमिया को समर्पित एक पवित्र मंदिर है, जो कड़वा पाटीदार समुदाय की कुलदेवी हैं। यह मंदिर आध्यात्मिक भक्ति और सांस्कृतिक विरासत के प्रतीक के रूप में खड़ा है, जो दुनिया भर के भक्तों का स्वागत करता है। अपनी भव्य वास्तुकला और शांत वातावरण के साथ, मंदिर सभी आगंतुकों को एक दिव्य अनुभव प्रदान करता है। मंदिर परिसर में सुंदर मूर्तियाँ हैं और पूरे वर्ष विभिन्न धार्मिक सेवाएं प्रदान करता है।",
  imageUrl: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=600&h=400&fit=crop",
};

export function AboutSection() {
  const { t } = useLanguage();

  const { data: about, isLoading } = useQuery<AboutContent>({
    queryKey: ["/api/about"],
  });

  const displayAbout = about || defaultAbout;

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-64 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-background" data-testid="about-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t(displayAbout.titleEn, displayAbout.titleHi)}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {displayAbout.imageUrl && (
            <div className="relative">
              <img
                src={displayAbout.imageUrl}
                alt={t("Temple Image", "मंदिर की छवि")}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-lg -z-10" />
            </div>
          )}

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t(displayAbout.contentEn, displayAbout.contentHi)}
            </p>
            <Link href="/about">
              <Button variant="outline" className="border-primary text-primary" data-testid="button-read-more">
                {t("Read More", "और पढ़ें")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
