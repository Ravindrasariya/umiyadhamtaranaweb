import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Train, MapPin } from "lucide-react";

import mahakaleshwarImg from "@assets/stock_images/mahakaleshwar_temple_6a5146a6.jpg";
import gaushalaImg from "@assets/stock_images/indian_cow_shelter_g_33487d7e.jpg";
import harsiddhiImg from "@assets/stock_images/hindu_temple_goddess_11aa7825.jpg";
import ramGhatImg from "@assets/stock_images/indian_river_ghat_ho_546ba447.jpg";
import sandipaniImg from "@assets/stock_images/ancient_ashram_medit_335565e5.jpg";
import mangalnathImg from "@assets/stock_images/hindu_temple_archite_307fcbb0.jpg";
import chintamanImg from "@assets/stock_images/ganesh_temple_idol_h_c3b571af.jpg";

const transportOptions = [
  {
    icon: Plane,
    titleEn: "Nearest Airport",
    titleHi: "निकटतम हवाई अड्डा",
    nameEn: "Devi Ahilya Bai Holkar Airport, Indore",
    nameHi: "देवी अहिल्या बाई होल्कर हवाई अड्डा, इंदौर",
    distanceEn: "80 KM",
    distanceHi: "80 किमी",
    detailsEn: "From the airport, you can take a bus or taxi to reach the temple",
    detailsHi: "हवाई अड्डे से मंदिर तक पहुंचने के लिए बस या टैक्सी ले सकते हैं",
  },
  {
    icon: Train,
    titleEn: "Major Railway Station",
    titleHi: "प्रमुख रेलवे स्टेशन",
    nameEn: "Ujjain Railway Station",
    nameHi: "उज्जैन रेलवे स्टेशन",
    distanceEn: "35 KM",
    distanceHi: "35 किमी",
    detailsEn: "Well connected to major cities across India",
    detailsHi: "भारत भर के प्रमुख शहरों से अच्छी तरह जुड़ा हुआ",
  },
  {
    icon: MapPin,
    titleEn: "Local Railway Station",
    titleHi: "स्थानीय रेलवे स्टेशन",
    nameEn: "SumeraKheda",
    nameHi: "सुमेराखेड़ा",
    distanceEn: "5 KM",
    distanceHi: "5 किमी",
    detailsEn: "Closest station to the temple for local trains",
    detailsHi: "स्थानीय ट्रेनों के लिए मंदिर का निकटतम स्टेशन",
  },
];

const nearbyTemples = [
  {
    nameEn: "Mahakaleshwar Temple",
    nameHi: "महाकालेश्वर मंदिर",
    imageUrl: mahakaleshwarImg,
    descriptionEn: "One of the 12 Jyotirlingas, Mahakaleshwar Temple is dedicated to Lord Shiva. The temple is known for its unique south-facing idol and the famous Bhasma Aarti performed with sacred ash from the cremation ground.",
    descriptionHi: "12 ज्योतिर्लिंगों में से एक, महाकालेश्वर मंदिर भगवान शिव को समर्पित है। यह मंदिर अपनी दक्षिण मुखी मूर्ति और श्मशान भूमि की पवित्र राख से की जाने वाली प्रसिद्ध भस्म आरती के लिए जाना जाता है।",
  },
  {
    nameEn: "Gopal Gaushala Kachnariya",
    nameHi: "गोपाल गौशाला कचनारिया",
    distanceEn: "10 KM",
    distanceHi: "10 किमी",
    imageUrl: gaushalaImg,
    descriptionEn: "Gopal Gaushala Kachnariya is a sacred cow shelter dedicated to the protection and care of cows. The gaushala provides shelter, food, and medical care to cows and promotes the ancient tradition of cow worship.",
    descriptionHi: "गोपाल गौशाला कचनारिया गायों की सुरक्षा और देखभाल के लिए समर्पित एक पवित्र गौशाला है। गौशाला गायों को आश्रय, भोजन और चिकित्सा देखभाल प्रदान करती है और गौ पूजा की प्राचीन परंपरा को बढ़ावा देती है।",
  },
  {
    nameEn: "Harsiddhi Mata Temple",
    nameHi: "हरसिद्धि माता मंदिर",
    imageUrl: harsiddhiImg,
    descriptionEn: "A renowned Shakti Pith, Harsiddhi Mata Temple is one of the 51 Shakti Peethas. The temple houses the idol of Goddess Harsiddhi and is famous for its two pillars adorned with lamps that are lit during Navratri.",
    descriptionHi: "एक प्रसिद्ध शक्ति पीठ, हरसिद्धि माता मंदिर 51 शक्ति पीठों में से एक है। मंदिर में देवी हरसिद्धि की मूर्ति है और यह दीपों से सजे दो स्तंभों के लिए प्रसिद्ध है जो नवरात्रि के दौरान जलाए जाते हैं।",
  },
  {
    nameEn: "Ram Ghat",
    nameHi: "राम घाट",
    imageUrl: ramGhatImg,
    descriptionEn: "Ram Ghat is the main ghat on the banks of River Shipra. It is believed that Lord Rama performed his father's last rites here. The ghat is famous for the Simhastha Kumbh Mela and daily evening aarti.",
    descriptionHi: "राम घाट शिप्रा नदी के तट पर मुख्य घाट है। ऐसा माना जाता है कि भगवान राम ने यहां अपने पिता का अंतिम संस्कार किया था। यह घाट सिंहस्थ कुंभ मेला और दैनिक शाम की आरती के लिए प्रसिद्ध है।",
  },
  {
    nameEn: "Sandipani Ashram",
    nameHi: "सांदीपनी आश्रम",
    imageUrl: sandipaniImg,
    descriptionEn: "This ancient ashram is where Lord Krishna, along with Balarama and Sudama, received education from Guru Sandipani. The ashram still has the stone slab used for counting and a sacred well.",
    descriptionHi: "यह प्राचीन आश्रम वह स्थान है जहां भगवान कृष्ण ने बलराम और सुदामा के साथ गुरु सांदीपनी से शिक्षा प्राप्त की थी। आश्रम में अभी भी गिनती के लिए इस्तेमाल की जाने वाली पत्थर की शिला और एक पवित्र कुआं है।",
  },
  {
    nameEn: "Mangalnath Temple",
    nameHi: "मंगलनाथ मंदिर",
    imageUrl: mangalnathImg,
    descriptionEn: "According to ancient texts, Mangalnath Temple is considered the birthplace of Mars (Mangal). The temple is significant for those performing Mangal Dosha remedies and offers panoramic views of the city.",
    descriptionHi: "प्राचीन ग्रंथों के अनुसार, मंगलनाथ मंदिर को मंगल ग्रह का जन्मस्थान माना जाता है। यह मंदिर मंगल दोष निवारण करने वालों के लिए महत्वपूर्ण है और शहर का मनोरम दृश्य प्रस्तुत करता है।",
  },
  {
    nameEn: "Chintaman Ganesh Temple",
    nameHi: "चिंतामन गणेश मंदिर",
    imageUrl: chintamanImg,
    descriptionEn: "One of the three self-manifested Ganesh temples in Ujjain, Chintaman Ganesh is believed to remove all worries (chinta) of devotees. The idol is said to be naturally formed and of ancient origin.",
    descriptionHi: "उज्जैन में तीन स्वयंभू गणेश मंदिरों में से एक, चिंतामन गणेश भक्तों की सभी चिंताओं को दूर करने वाले माने जाते हैं। मूर्ति प्राकृतिक रूप से निर्मित और प्राचीन मूल की बताई जाती है।",
  },
];

export default function Tourism() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" data-testid="page-tourism">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-tourism-title">
                {t("How to Reach the Temple", "मंदिर कैसे पहुंचें")}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t(
                  "Plan your sacred journey to Umiya Dham Tarana with our travel guide",
                  "हमारी यात्रा गाइड के साथ उमिया धाम तराना की अपनी पवित्र यात्रा की योजना बनाएं"
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {transportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card key={index} className="overflow-visible" data-testid={`card-transport-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">
                            {t(option.titleEn, option.titleHi)}
                          </h3>
                          <span className="text-sm text-primary font-semibold">
                            {t(option.distanceEn, option.distanceHi)}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {t(option.nameEn, option.nameHi)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t(option.detailsEn, option.detailsHi)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-nearby-temples-title">
                {t("Nearby Sacred Places", "आसपास के पवित्र स्थल")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t(
                  "Explore the spiritual heritage of Ujjain - the city of temples",
                  "उज्जैन की आध्यात्मिक विरासत का अन्वेषण करें - मंदिरों का शहर"
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyTemples.map((temple, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`card-temple-${index}`}>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={temple.imageUrl}
                      alt={t(temple.nameEn, temple.nameHi)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg">
                        {t(temple.nameEn, temple.nameHi)}
                      </h3>
                      {temple.distanceEn && (
                        <p className="text-white/80 text-sm mt-1">
                          {t(temple.distanceEn, temple.distanceHi)} {t("away", "दूर")}
                        </p>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(temple.descriptionEn, temple.descriptionHi)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
