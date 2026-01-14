import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, MapPin, IndianRupee, Handshake } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { VivaahPageInfo, VivaahSammelan as VivaahSammelanType, VivaahParticipant } from "@shared/schema";

export default function VivaahSammelan() {
  const { t, language } = useLanguage();

  const { data: pageInfo, isLoading: pageInfoLoading } = useQuery<VivaahPageInfo>({
    queryKey: ["/api/vivaah/page-info"],
  });

  const { data: activeSammelan, isLoading: sammelanLoading } = useQuery<VivaahSammelanType>({
    queryKey: ["/api/vivaah/active-sammelan"],
  });

  const { data: participants, isLoading: participantsLoading } = useQuery<VivaahParticipant[]>({
    queryKey: ["/api/vivaah/participants", activeSammelan?.id],
    enabled: !!activeSammelan?.id,
  });

  const brides = participants?.filter(p => p.type === "bride") || [];
  const grooms = participants?.filter(p => p.type === "groom") || [];
  const maxCouples = Math.max(brides.length, grooms.length);

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const renderParticipantCard = (participant: VivaahParticipant | undefined, type: "bride" | "groom", index: number) => {
    if (!participant) {
      return (
        <div className={`flex-1 basis-0 min-w-0 p-3 rounded-lg border-2 border-dashed ${type === "bride" ? "border-pink-200 bg-pink-50/30" : "border-blue-200 bg-blue-50/30"}`}>
          <p className="text-muted-foreground text-center text-xs">
            {type === "bride" ? t("Awaiting", "प्रतीक्षा") : t("Awaiting", "प्रतीक्षा")}
          </p>
        </div>
      );
    }

    return (
      <Card className={`flex-1 basis-0 min-w-0 overflow-hidden ${type === "bride" ? "border-pink-300 bg-pink-50/50" : "border-blue-300 bg-blue-50/50"}`} data-testid={`${type}-${participant.id}`}>
        <CardContent className="p-2 md:p-4">
          <h4 className={`font-semibold mb-1 text-sm md:text-base truncate ${type === "bride" ? "text-pink-700" : "text-blue-700"}`}>
            {index + 1}. {language === "hi" ? participant.nameHi : participant.nameEn}
          </h4>
          <div className="text-xs md:text-sm text-muted-foreground space-y-0.5">
            {(participant.fatherNameEn || participant.fatherNameHi) && (
              <p className="truncate">{t("Father", "पिता")}: {language === "hi" ? participant.fatherNameHi : participant.fatherNameEn}</p>
            )}
            {(participant.motherNameEn || participant.motherNameHi) && (
              <p className="truncate">{t("Mother", "माता")}: {language === "hi" ? participant.motherNameHi : participant.motherNameEn}</p>
            )}
            {(participant.grandfatherNameEn || participant.grandfatherNameHi) && (
              <p className="truncate hidden md:block">{t("Grandfather", "दादा")}: {language === "hi" ? participant.grandfatherNameHi : participant.grandfatherNameEn}</p>
            )}
            {(participant.grandmotherNameEn || participant.grandmotherNameHi) && (
              <p className="truncate hidden md:block">{t("Grandmother", "दादी")}: {language === "hi" ? participant.grandmotherNameHi : participant.grandmotherNameEn}</p>
            )}
            {(participant.locationEn || participant.locationHi) && (
              <p className="flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{language === "hi" ? participant.locationHi : participant.locationEn}</span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col" data-testid="page-vivaah-sammelan">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
              </div>
              {pageInfoLoading ? (
                <Skeleton className="h-10 w-64 mx-auto mb-4" />
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-vivaah-title">
                  {pageInfo ? (language === "hi" ? pageInfo.titleHi : pageInfo.titleEn) : t("Vivaah Sammelan", "विवाह सम्मेलन")}
                </h1>
              )}
              {pageInfoLoading ? (
                <Skeleton className="h-6 w-96 mx-auto" />
              ) : (
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  {pageInfo ? (language === "hi" ? pageInfo.descriptionHi : pageInfo.descriptionEn) : t(
                    "A sacred platform for finding suitable life partners within our community, blessed by Maa Umiya",
                    "माँ उमिया के आशीर्वाद से हमारे समुदाय में उपयुक्त जीवन साथी खोजने का एक पवित्र मंच"
                  )}
                </p>
              )}
            </div>

            {sammelanLoading ? (
              <Skeleton className="h-32 mb-8" />
            ) : activeSammelan && (
              <Card className="mb-8 overflow-visible border-primary/20" data-testid="card-active-sammelan">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4" data-testid="text-sammelan-title">
                      {language === "hi" ? activeSammelan.titleHi : activeSammelan.titleEn}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 font-semibold" data-testid="text-income">
                          {t("Income", "आय")}: ₹{formatCurrency(activeSammelan.overallIncome)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-red-600" />
                        <span className="text-red-600 font-semibold" data-testid="text-expense">
                          {t("Expense", "व्यय")}: ₹{formatCurrency(activeSammelan.overallExpense)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground" data-testid="text-as-of-date">
                      {t("As of", "दिनांक")}: {activeSammelan.asOfDate}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSammelan && (
              <div className="mb-12">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                    <span className="text-pink-600 font-semibold">{t("Brides", "वधू")} ({brides.length})</span>
                  </div>
                  <Handshake className="w-8 h-8 text-primary" />
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-blue-600 font-semibold">{t("Grooms", "वर")} ({grooms.length})</span>
                  </div>
                </div>

                {participantsLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                  </div>
                ) : maxCouples > 0 ? (
                  <div className="space-y-3">
                    {Array.from({ length: maxCouples }).map((_, index) => (
                      <div key={index} className="flex items-stretch gap-1" data-testid={`couple-row-${index}`}>
                        {renderParticipantCard(brides[index], "bride", index)}
                        <div className="flex-shrink-0 w-8 md:w-12 flex items-center justify-center">
                          <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Handshake className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                          </div>
                        </div>
                        {renderParticipantCard(grooms[index], "groom", index)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="overflow-visible">
                    <CardContent className="p-8 text-center">
                      <Handshake className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {t("No participants registered yet. Check back soon!", "अभी तक कोई प्रतिभागी पंजीकृत नहीं है। जल्द ही देखें!")}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {!activeSammelan && !sammelanLoading && (
              <Card className="overflow-visible" data-testid="card-vivaah-info">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                    {t("About Vivaah Sammelan", "विवाह सम्मेलन के बारे में")}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p className="mb-4">
                      {t(
                        "Vivaah Sammelan is a sacred matrimonial gathering organized under the auspices of Umiya Patidar Samaj Seva Trust Tarana. This event brings together eligible youth from the Patidar community seeking suitable life partners.",
                        "विवाह सम्मेलन उमिया पाटीदार समाज सेवा ट्रस्ट तराना के तत्वावधान में आयोजित एक पवित्र वैवाहिक सम्मेलन है। यह आयोजन उपयुक्त जीवन साथी की तलाश में पाटीदार समुदाय के योग्य युवाओं को एक साथ लाता है।"
                      )}
                    </p>
                    <p className="mb-4">
                      {t(
                        "The event is conducted with full traditional values and under the divine blessings of Maa Umiya. Families from across the region participate in this auspicious gathering to find compatible matches for their children.",
                        "यह आयोजन पूर्ण पारंपरिक मूल्यों के साथ और माँ उमिया के दिव्य आशीर्वाद में आयोजित किया जाता है। क्षेत्र भर के परिवार अपने बच्चों के लिए उपयुक्त रिश्ते खोजने के लिए इस शुभ सम्मेलन में भाग लेते हैं।"
                      )}
                    </p>
                    <p>
                      {t(
                        "For registration and more information about upcoming Vivaah Sammelan events, please contact the temple administration or visit during office hours.",
                        "पंजीकरण और आगामी विवाह सम्मेलन कार्यक्रमों के बारे में अधिक जानकारी के लिए, कृपया मंदिर प्रशासन से संपर्क करें या कार्यालय समय के दौरान आएं।"
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
