import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { TermsContent } from "@shared/schema";

const defaultTerms = {
  titleEn: "Terms & Conditions for Donations",
  titleHi: "दान के लिए नियम और शर्तें",
  contentEn: `1. All donations made to Umiya Patidar Samaj Seva Trust are voluntary and made with the donor's free will.

2. Donations are non-refundable once processed. Please ensure all details are correct before submitting.

3. The trust reserves the right to use the donated funds for temple development, maintenance, religious activities, and charitable purposes as deemed appropriate.

4. Donors acknowledge that their contribution is for religious and charitable purposes only.

5. Personal information provided during donation will be kept confidential and used only for temple records and communication purposes.

6. Donation receipts will be provided for all contributions. Please retain your receipt for tax purposes where applicable.

7. The trust is not responsible for any technical issues during online transactions. In case of failed transactions, please contact temple administration.

8. By making a donation, donors agree that they have read and understood these terms and conditions.

9. The trust reserves the right to modify these terms and conditions at any time without prior notice.

10. For any queries regarding donations, please contact the temple office directly.

11. Donors must be of legal age and have the authority to make the donation from their own funds.

12. The trust is committed to transparency and will provide updates on how donations are utilized for temple activities.`,
  contentHi: `1. श्री उमिया धाम ट्रस्ट को किए गए सभी दान स्वैच्छिक हैं और दाता की अपनी इच्छा से किए गए हैं।

2. एक बार प्रोसेस होने के बाद दान वापस नहीं किया जाएगा। कृपया सबमिट करने से पहले सुनिश्चित करें कि सभी विवरण सही हैं।

3. ट्रस्ट के पास मंदिर विकास, रखरखाव, धार्मिक गतिविधियों और धर्मार्थ उद्देश्यों के लिए दान की गई राशि का उपयोग करने का अधिकार है।

4. दाता स्वीकार करते हैं कि उनका योगदान केवल धार्मिक और धर्मार्थ उद्देश्यों के लिए है।

5. दान के दौरान प्रदान की गई व्यक्तिगत जानकारी गोपनीय रखी जाएगी और केवल मंदिर रिकॉर्ड और संचार उद्देश्यों के लिए उपयोग की जाएगी।

6. सभी योगदानों के लिए दान रसीदें प्रदान की जाएंगी। कृपया जहां लागू हो, कर उद्देश्यों के लिए अपनी रसीद रखें।

7. ऑनलाइन लेनदेन के दौरान किसी भी तकनीकी समस्या के लिए ट्रस्ट जिम्मेदार नहीं है। विफल लेनदेन के मामले में, कृपया मंदिर प्रशासन से संपर्क करें।

8. दान करके, दाता सहमत होते हैं कि उन्होंने इन नियमों और शर्तों को पढ़ और समझ लिया है।

9. ट्रस्ट के पास बिना पूर्व सूचना के किसी भी समय इन नियमों और शर्तों को संशोधित करने का अधिकार है।

10. दान संबंधी किसी भी प्रश्न के लिए, कृपया सीधे मंदिर कार्यालय से संपर्क करें।

11. दाता कानूनी उम्र के होने चाहिए और अपने स्वयं के धन से दान करने का अधिकार रखते हों।

12. ट्रस्ट पारदर्शिता के लिए प्रतिबद्ध है और मंदिर गतिविधियों के लिए दान का उपयोग कैसे किया जाता है, इस पर अपडेट प्रदान करेगा।`,
};

export default function Terms() {
  const { t } = useLanguage();

  const { data: terms, isLoading } = useQuery<TermsContent>({
    queryKey: ["/api/terms"],
  });

  const displayTerms = terms || defaultTerms;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" data-testid="page-terms">
        <Header />
        <main className="flex-1 py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" data-testid="page-terms">
      <Header />
      <main className="flex-1 py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="text-terms-title">
              {t(displayTerms.titleEn, displayTerms.titleHi)}
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="max-w-none">
            <div className="bg-background rounded-lg p-6 md:p-8 border">
              <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed text-base" data-testid="text-terms-content">
                {t(displayTerms.contentEn, displayTerms.contentHi)}
              </pre>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
