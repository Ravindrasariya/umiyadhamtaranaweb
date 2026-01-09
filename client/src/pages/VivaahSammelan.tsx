import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Users, Calendar, MapPin, Plus, IndianRupee } from "lucide-react";
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

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-IN').format(num);
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="overflow-visible" data-testid="card-brides">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-pink-600" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-600">
                        {t("Brides", "वधू")} ({brides.length})
                      </h3>
                    </div>
                    {participantsLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                      </div>
                    ) : brides.length > 0 ? (
                      <div className="space-y-4">
                        {brides.map((bride) => (
                          <Card key={bride.id} className="border-pink-200" data-testid={`bride-${bride.id}`}>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-foreground mb-2">
                                {language === "hi" ? bride.nameHi : bride.nameEn}
                              </h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                {(bride.fatherNameEn || bride.fatherNameHi) && (
                                  <p>{t("Father", "पिता")}: {language === "hi" ? bride.fatherNameHi : bride.fatherNameEn}</p>
                                )}
                                {(bride.motherNameEn || bride.motherNameHi) && (
                                  <p>{t("Mother", "माता")}: {language === "hi" ? bride.motherNameHi : bride.motherNameEn}</p>
                                )}
                                {(bride.grandfatherNameEn || bride.grandfatherNameHi) && (
                                  <p>{t("Grandfather", "दादा")}: {language === "hi" ? bride.grandfatherNameHi : bride.grandfatherNameEn}</p>
                                )}
                                {(bride.grandmotherNameEn || bride.grandmotherNameHi) && (
                                  <p>{t("Grandmother", "दादी")}: {language === "hi" ? bride.grandmotherNameHi : bride.grandmotherNameEn}</p>
                                )}
                                {(bride.locationEn || bride.locationHi) && (
                                  <p className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {language === "hi" ? bride.locationHi : bride.locationEn}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        {t("No brides registered yet", "अभी तक कोई वधू पंजीकृत नहीं है")}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="overflow-visible" data-testid="card-grooms">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-600">
                        {t("Grooms", "वर")} ({grooms.length})
                      </h3>
                    </div>
                    {participantsLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                      </div>
                    ) : grooms.length > 0 ? (
                      <div className="space-y-4">
                        {grooms.map((groom) => (
                          <Card key={groom.id} className="border-blue-200" data-testid={`groom-${groom.id}`}>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-foreground mb-2">
                                {language === "hi" ? groom.nameHi : groom.nameEn}
                              </h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                {(groom.fatherNameEn || groom.fatherNameHi) && (
                                  <p>{t("Father", "पिता")}: {language === "hi" ? groom.fatherNameHi : groom.fatherNameEn}</p>
                                )}
                                {(groom.motherNameEn || groom.motherNameHi) && (
                                  <p>{t("Mother", "माता")}: {language === "hi" ? groom.motherNameHi : groom.motherNameEn}</p>
                                )}
                                {(groom.grandfatherNameEn || groom.grandfatherNameHi) && (
                                  <p>{t("Grandfather", "दादा")}: {language === "hi" ? groom.grandfatherNameHi : groom.grandfatherNameEn}</p>
                                )}
                                {(groom.grandmotherNameEn || groom.grandmotherNameHi) && (
                                  <p>{t("Grandmother", "दादी")}: {language === "hi" ? groom.grandmotherNameHi : groom.grandmotherNameEn}</p>
                                )}
                                {(groom.locationEn || groom.locationHi) && (
                                  <p className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {language === "hi" ? groom.locationHi : groom.locationEn}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        {t("No grooms registered yet", "अभी तक कोई वर पंजीकृत नहीं है")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="overflow-visible text-center" data-testid="card-vivaah-community">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {t("Community Event", "सामुदायिक आयोजन")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Organized for Patidar community members seeking matrimonial alliances",
                      "वैवाहिक संबंध खोजने वाले पाटीदार समुदाय के सदस्यों के लिए आयोजित"
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-visible text-center" data-testid="card-vivaah-calendar">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {t("Annual Event", "वार्षिक आयोजन")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Held annually at the temple premises with traditional ceremonies",
                      "पारंपरिक समारोहों के साथ मंदिर परिसर में प्रतिवर्ष आयोजित"
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-visible text-center" data-testid="card-vivaah-location">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {t("Temple Venue", "मंदिर स्थल")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Conducted at Maa Umiya Dham Tarana with divine blessings",
                      "दिव्य आशीर्वाद के साथ माँ उमिया धाम तराना में आयोजित"
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>

            {!activeSammelan && !sammelanLoading && (
              <Card className="overflow-visible" data-testid="card-vivaah-info">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                    {t("About Vivaah Sammelan", "विवाह सम्मेलन के बारे में")}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p className="mb-4">
                      {t(
                        "Vivaah Sammelan is a sacred matrimonial gathering organized under the auspices of Shree Umiya Patidar Samaj Seva Trust Tarana. This event brings together eligible youth from the Patidar community seeking suitable life partners.",
                        "विवाह सम्मेलन श्री उमिया पाटीदार समाज सेवा ट्रस्ट तराना के तत्वावधान में आयोजित एक पवित्र वैवाहिक सम्मेलन है। यह आयोजन उपयुक्त जीवन साथी की तलाश में पाटीदार समुदाय के योग्य युवाओं को एक साथ लाता है।"
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
