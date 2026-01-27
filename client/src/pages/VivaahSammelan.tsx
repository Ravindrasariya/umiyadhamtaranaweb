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
  
  // Create maps of pair number (order) to participant for quick lookup
  const bridesByOrder = new Map(brides.map(b => [b.order, b]));
  const groomsByOrder = new Map(grooms.map(g => [g.order, g]));
  
  // Get max order number from participants to support sparse pair numbers
  const allOrderNumbers = [...brides.map(b => b.order), ...grooms.map(g => g.order)].filter(n => n > 0);
  const maxOrderFromParticipants = allOrderNumbers.length > 0 ? Math.max(...allOrderNumbers) : 0;
  
  // Use totalPairs from sammelan if set and > 0, otherwise use max order number
  const displayPairCount = (activeSammelan?.totalPairs && activeSammelan.totalPairs > 0) 
    ? activeSammelan.totalPairs 
    : maxOrderFromParticipants;
  
  // Generate pair numbers array
  const pairNumbers = displayPairCount > 0 
    ? Array.from({ length: displayPairCount }, (_, i) => i + 1) 
    : [];

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const renderParticipantCard = (participant: VivaahParticipant | undefined, type: "bride" | "groom", index: number) => {
    if (!participant) {
      return (
        <div className={`flex-1 min-w-0 p-4 rounded-lg border-2 border-dashed flex flex-row items-center gap-4 ${type === "bride" ? "border-pink-200 bg-pink-50/30" : "border-blue-200 bg-blue-50/30"}`}>
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0 ${type === "bride" ? "bg-pink-100" : "bg-blue-100"}`}>
            <span className={`text-2xl md:text-3xl ${type === "bride" ? "text-pink-300" : "text-blue-300"}`}>?</span>
          </div>
          <p className="text-muted-foreground text-sm">
            {type === "bride" ? t("Awaiting Bride", "वधू की प्रतीक्षा") : t("Awaiting Groom", "वर की प्रतीक्षा")}
          </p>
        </div>
      );
    }

    const photoElement = participant.photoUrl ? (
      <img 
        src={participant.photoUrl} 
        alt={participant.nameEn} 
        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-3 border-white shadow-lg"
      />
    ) : (
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${type === "bride" ? "bg-pink-200" : "bg-blue-200"}`}>
        <span className={`text-2xl md:text-3xl font-bold ${type === "bride" ? "text-pink-600" : "text-blue-600"}`}>
          {(participant.nameEn || participant.nameHi || "?").charAt(0).toUpperCase()}
        </span>
      </div>
    );

    const textElement = (
      <div className="min-w-0">
        <h4 className={`font-bold text-base md:text-lg ${type === "bride" ? "text-pink-700" : "text-blue-700"}`}>
          {language === "hi" ? participant.nameHi : participant.nameEn}
        </h4>
        <div className="text-sm text-muted-foreground space-y-0.5 mt-1">
          {(participant.fatherNameEn || participant.fatherNameHi) && (
            <p className="truncate">{language === "hi" ? participant.fatherNameHi : participant.fatherNameEn}</p>
          )}
          {(participant.motherNameEn || participant.motherNameHi) && (
            <p className="truncate">{language === "hi" ? participant.motherNameHi : participant.motherNameEn}</p>
          )}
          {(participant.grandfatherNameEn || participant.grandfatherNameHi) && (
            <p className="truncate">{language === "hi" ? participant.grandfatherNameHi : participant.grandfatherNameEn}</p>
          )}
          {(participant.locationEn || participant.locationHi) && (
            <p className="flex items-center gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{language === "hi" ? participant.locationHi : participant.locationEn}</span>
            </p>
          )}
        </div>
      </div>
    );

    return (
      <Card className={`flex-1 min-w-0 ${type === "bride" ? "border-pink-300 bg-pink-50/50" : "border-blue-300 bg-blue-50/50"}`} data-testid={`${type}-${participant.id}`}>
        <CardContent className="p-4">
          <div className="flex flex-row items-center gap-4">
            <div className="flex-shrink-0">
              {photoElement}
            </div>
            <div className="flex-1 min-w-0">
              {textElement}
            </div>
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
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Handshake className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary text-lg" data-testid="text-total-pairs">
                    {t(`Total Pairs # ${displayPairCount}`, `कुल जोड़े # ${displayPairCount}`)}
                  </span>
                </div>
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
                ) : pairNumbers.length > 0 ? (
                  <div className="space-y-4">
                    {pairNumbers.map((pairNumber) => (
                      <div 
                        key={pairNumber} 
                        className="border-2 border-primary rounded-xl p-3 md:p-4 bg-primary/5"
                        data-testid={`couple-row-${pairNumber}`}
                      >
                        <div className="hidden md:flex items-stretch gap-2">
                          {renderParticipantCard(bridesByOrder.get(pairNumber), "bride", pairNumber)}
                          <div className="flex-shrink-0 w-14 flex flex-col items-center justify-center gap-1">
                            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border-2 border-primary">
                              {pairNumber}
                            </span>
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                              <Handshake className="w-5 h-5 text-primary" />
                            </span>
                          </div>
                          {renderParticipantCard(groomsByOrder.get(pairNumber), "groom", pairNumber)}
                        </div>
                        <div className="md:hidden flex flex-col gap-3">
                          {renderParticipantCard(bridesByOrder.get(pairNumber), "bride", pairNumber)}
                          <div className="flex items-center justify-center gap-2 py-1">
                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border-2 border-primary">
                              {pairNumber}
                            </span>
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                              <Handshake className="w-5 h-5 text-primary" />
                            </span>
                          </div>
                          {renderParticipantCard(groomsByOrder.get(pairNumber), "groom", pairNumber)}
                        </div>
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

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
