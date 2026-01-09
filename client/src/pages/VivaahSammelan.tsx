import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Calendar, MapPin } from "lucide-react";

export default function VivaahSammelan() {
  const { t } = useLanguage();

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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-vivaah-title">
                {t("Vivaah Sammelan", "विवाह सम्मेलन")}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t(
                  "A sacred platform for finding suitable life partners within our community, blessed by Maa Umiya",
                  "माँ उमिया के आशीर्वाद से हमारे समुदाय में उपयुक्त जीवन साथी खोजने का एक पवित्र मंच"
                )}
              </p>
            </div>

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
                      "Conducted at Umiya Dham Tarana with divine blessings",
                      "दिव्य आशीर्वाद के साथ उमिया धाम तराना में आयोजित"
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>

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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
