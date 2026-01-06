import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Sparkles, Home } from "lucide-react";
import type { Service } from "@shared/schema";

const defaultServices: Service[] = [
  {
    id: "1",
    titleEn: "Darshan Timing",
    titleHi: "दर्शन समय",
    descriptionEn: "The temple is open for darshan from 6:00 AM to 9:00 PM every day. Special aarti is performed at 7:00 AM and 7:00 PM.",
    descriptionHi: "मंदिर प्रतिदिन सुबह 6:00 बजे से रात 9:00 बजे तक दर्शन के लिए खुला रहता है। विशेष आरती सुबह 7:00 बजे और शाम 7:00 बजे होती है।",
    buttonTextEn: "View Schedule",
    buttonTextHi: "समय देखें",
    buttonLink: "#timings",
    imageUrl: "",
    order: 1,
  },
  {
    id: "2",
    titleEn: "Puja Services",
    titleHi: "पूजा सेवाएं",
    descriptionEn: "We offer various puja services including Abhishek, Aarti, and special rituals for occasions like weddings and birthdays.",
    descriptionHi: "हम अभिषेक, आरती और विवाह एवं जन्मदिन जैसे अवसरों के लिए विशेष अनुष्ठान सहित विभिन्न पूजा सेवाएं प्रदान करते हैं।",
    buttonTextEn: "Book Puja",
    buttonTextHi: "पूजा बुक करें",
    buttonLink: "#puja",
    imageUrl: "",
    order: 2,
  },
  {
    id: "3",
    titleEn: "Accommodation",
    titleHi: "आवास",
    descriptionEn: "The temple provides clean and comfortable accommodation facilities for devotees at nominal rates.",
    descriptionHi: "मंदिर भक्तों के लिए मामूली दरों पर स्वच्छ और आरामदायक आवास सुविधाएं प्रदान करता है।",
    buttonTextEn: "Book Now",
    buttonTextHi: "अभी बुक करें",
    buttonLink: "#accommodation",
    imageUrl: "",
    order: 3,
  },
];

const serviceIcons = [
  <Clock className="w-12 h-12 text-primary" />,
  <Sparkles className="w-12 h-12 text-primary" />,
  <Home className="w-12 h-12 text-primary" />,
];

export function ServicesSection() {
  const { t } = useLanguage();

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const displayServices = services && services.length > 0 ? services : defaultServices;

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-background" data-testid="services-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Our Services", "हमारी सेवाएं")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Explore the various services and facilities available at the temple",
              "मंदिर में उपलब्ध विभिन्न सेवाओं और सुविधाओं का अन्वेषण करें"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayServices.map((service, index) => (
            <Card
              key={service.id}
              className="group overflow-visible hover-elevate"
              data-testid={`card-service-${service.id}`}
            >
              <CardHeader className="pb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={t(service.titleEn, service.titleHi)}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    serviceIcons[index % serviceIcons.length]
                  )}
                </div>
                <h3 className="text-xl font-bold text-primary text-center">
                  {t(service.titleEn, service.titleHi)}
                </h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {t(service.descriptionEn, service.descriptionHi)}
                </p>
              </CardContent>
              <CardFooter className="pt-2 justify-center">
                <Button
                  className="w-full max-w-[200px]"
                  data-testid={`button-service-${service.id}`}
                >
                  {t(service.buttonTextEn, service.buttonTextHi)}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
