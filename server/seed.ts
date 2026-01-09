import { db } from "./db";
import {
  sliderImages,
  aboutContent,
  poojaTimings,
  services,
  galleryItems,
  trustContent,
  contactInfo,
  termsContent,
  users,
} from "@shared/schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  try {
    const existingSliders = await db.select().from(sliderImages).limit(1);
    if (existingSliders.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database...");

    await db.insert(sliderImages).values([
      {
        imageUrl: "https://images.unsplash.com/photo-1564804955013-e02e72e02ec8?w=1600&h=900&fit=crop",
        titleEn: "Welcome to Umiya Dham Tarana",
        titleHi: "उमिया धाम तराना में आपका स्वागत है",
        order: 1,
        isActive: true,
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=1600&h=900&fit=crop",
        titleEn: "Experience Divine Blessings",
        titleHi: "दिव्य आशीर्वाद का अनुभव करें",
        order: 2,
        isActive: true,
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1545126178-d998b23ed8e5?w=1600&h=900&fit=crop",
        titleEn: "A Sacred Pilgrimage Destination",
        titleHi: "एक पवित्र तीर्थ स्थल",
        order: 3,
        isActive: true,
      },
    ]);

    await db.insert(aboutContent).values({
      titleEn: "About Temple",
      titleHi: "मंदिर के बारे में",
      contentEn: "Umiya Dham Tarana is a sacred temple dedicated to Goddess Umiya, the kuldevi (clan deity) of the Kadva Patidar community. The temple stands as a beacon of spiritual devotion and cultural heritage, welcoming devotees from all over the world. With its magnificent architecture and serene atmosphere, the temple offers a divine experience to all who visit. The temple complex houses beautiful idols and provides various religious services throughout the year.",
      contentHi: "उमिया धाम तराना देवी उमिया को समर्पित एक पवित्र मंदिर है, जो कड़वा पाटीदार समुदाय की कुलदेवी हैं। यह मंदिर आध्यात्मिक भक्ति और सांस्कृतिक विरासत के प्रतीक के रूप में खड़ा है, जो दुनिया भर के भक्तों का स्वागत करता है। अपनी भव्य वास्तुकला और शांत वातावरण के साथ, मंदिर सभी आगंतुकों को एक दिव्य अनुभव प्रदान करता है। मंदिर परिसर में सुंदर मूर्तियाँ हैं और पूरे वर्ष विभिन्न धार्मिक सेवाएं प्रदान करता है।",
      imageUrl: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=600&h=400&fit=crop",
    });

    await db.insert(poojaTimings).values([
      { nameEn: "Morning (Mangla)", nameHi: "प्रातःकाल (मंगला)", timingKartik: "6:15", timingMaha: "6:00", timingVaishakh: "5:45", timingBhadra: "6:00", category: "aarti", order: 1 },
      { nameEn: "Evening (Sandhya)", nameHi: "सायंकाल (सांध्य)", timingKartik: "6:15", timingMaha: "6:45", timingVaishakh: "7:15", timingBhadra: "6:45", category: "aarti", order: 2 },
      { nameEn: "Night (Shayan)", nameHi: "रात्रि (शयन)", timingKartik: "9:15", timingMaha: "9:15", timingVaishakh: "9:15", timingBhadra: "9:15", category: "aarti", order: 3 },
      { nameEn: "Morning to Afternoon", nameHi: "सुबह से दोपहर", timingKartik: "6:15 - 1:30", timingMaha: "6:00 - 1:30", timingVaishakh: "5:45 - 1:30", timingBhadra: "6:00 - 1:30", category: "darshan", order: 1 },
      { nameEn: "Afternoon to Night", nameHi: "दोपहर से रात", timingKartik: "2:30 - 9:15", timingMaha: "2:30 - 9:15", timingVaishakh: "2:30 - 9:15", timingBhadra: "2:30 - 9:15", category: "darshan", order: 2 },
    ]);

    await db.insert(services).values([
      {
        titleEn: "Darshan Timing",
        titleHi: "दर्शन समय",
        descriptionEn: "The temple is open for darshan from 6:00 AM to 9:00 PM every day. Special aarti is performed at 7:00 AM and 7:00 PM.",
        descriptionHi: "मंदिर प्रतिदिन सुबह 6:00 बजे से रात 9:00 बजे तक दर्शन के लिए खुला रहता है। विशेष आरती सुबह 7:00 बजे और शाम 7:00 बजे होती है।",
        buttonTextEn: "View Schedule",
        buttonTextHi: "समय देखें",
        buttonLink: "#timings",
        order: 1,
      },
      {
        titleEn: "Puja Services",
        titleHi: "पूजा सेवाएं",
        descriptionEn: "We offer various puja services including Abhishek, Aarti, and special rituals for occasions like weddings and birthdays.",
        descriptionHi: "हम अभिषेक, आरती और विवाह एवं जन्मदिन जैसे अवसरों के लिए विशेष अनुष्ठान सहित विभिन्न पूजा सेवाएं प्रदान करते हैं।",
        buttonTextEn: "Book Puja",
        buttonTextHi: "पूजा बुक करें",
        buttonLink: "#puja",
        order: 2,
      },
      {
        titleEn: "Accommodation",
        titleHi: "आवास",
        descriptionEn: "The temple provides clean and comfortable accommodation facilities for devotees at nominal rates.",
        descriptionHi: "मंदिर भक्तों के लिए मामूली दरों पर स्वच्छ और आरामदायक आवास सुविधाएं प्रदान करता है।",
        buttonTextEn: "Book Now",
        buttonTextHi: "अभी बुक करें",
        buttonLink: "#accommodation",
        order: 3,
      },
    ]);

    await db.insert(galleryItems).values([
      { type: "photo", url: "https://images.unsplash.com/photo-1564804955013-e02e72e02ec8?w=600&h=400&fit=crop", titleEn: "Temple Exterior", titleHi: "मंदिर का बाहरी दृश्य", order: 1, isActive: true },
      { type: "photo", url: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=600&h=400&fit=crop", titleEn: "Divine Idol", titleHi: "दिव्य मूर्ति", order: 2, isActive: true },
      { type: "photo", url: "https://images.unsplash.com/photo-1545126178-d998b23ed8e5?w=600&h=400&fit=crop", titleEn: "Temple Architecture", titleHi: "मंदिर की वास्तुकला", order: 3, isActive: true },
      { type: "photo", url: "https://images.unsplash.com/photo-1600606585584-e82b0a5e6c3a?w=600&h=400&fit=crop", titleEn: "Night View", titleHi: "रात्रि दृश्य", order: 4, isActive: true },
      { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://images.unsplash.com/photo-1564804955013-e02e72e02ec8?w=400&h=300&fit=crop", titleEn: "Temple Tour", titleHi: "मंदिर यात्रा", order: 1, isActive: true },
      { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://images.unsplash.com/photo-1609766934622-2a8e7f159a2e?w=400&h=300&fit=crop", titleEn: "Aarti Ceremony", titleHi: "आरती समारोह", order: 2, isActive: true },
    ]);

    await db.insert(trustContent).values({
      titleEn: "Maa Umiya Patidar Samaj Seva Trust",
      titleHi: "माँ उमिया पाटीदार समाज सेवा ट्रस्ट",
      subtitleEn: "Learn about the organization that maintains and preserves the sacred Maa Umiya Dham Temple",
      subtitleHi: "उस संगठन के बारे में जानें जो पवित्र माँ उमिया धाम मंदिर का रखरखाव और संरक्षण करता है",
      contentEn: "The Maa Umiya Patidar Samaj Seva Trust was established with the sacred mission of preserving and promoting the spiritual heritage of the Maa Umiya Dham Temple in Tarana, Ujjain, Madhya Pradesh. Our trust is dedicated to maintaining the temple's sanctity while serving the spiritual needs of devotees worldwide.\n\nRegistered under the Madhya Pradesh Public Trusts Act, our trust comprises devoted members who work tirelessly to ensure the temple's operations, rituals, and community services are carried out with utmost devotion and transparency.\n\nOver the years, the trust has objective to expanded its activities beyond temple maintenance to include educational initiatives, community welfare programs, and preservation of cultural heritage.",
      contentHi: "माँ उमिया पाटीदार समाज सेवा ट्रस्ट की स्थापना तराना, उज्जैन, मध्य प्रदेश में माँ उमिया धाम मंदिर की आध्यात्मिक विरासत को संरक्षित और बढ़ावा देने के पवित्र मिशन के साथ की गई थी। हमारा ट्रस्ट दुनिया भर के भक्तों की आध्यात्मिक जरूरतों को पूरा करते हुए मंदिर की पवित्रता को बनाए रखने के लिए समर्पित है।\n\nमध्य प्रदेश पब्लिक ट्रस्ट अधिनियम के तहत पंजीकृत, हमारे ट्रस्ट में समर्पित सदस्य शामिल हैं जो यह सुनिश्चित करने के लिए अथक प्रयास करते हैं कि मंदिर के संचालन, अनुष्ठान और सामुदायिक सेवाएं अत्यंत भक्ति और पारदर्शिता के साथ की जाएं।\n\nवर्षों से, ट्रस्ट ने मंदिर के रखरखाव से परे शैक्षिक पहल, सामुदायिक कल्याण कार्यक्रम और सांस्कृतिक विरासत के संरक्षण को शामिल करने के लिए अपनी गतिविधियों का विस्तार करने का उद्देश्य रखा है।",
    });

    await db.insert(contactInfo).values({
      phone1: "+91 98765 43210",
      phone2: "+91 12345 67890",
      email1: "info@umiyadhamtarana.org",
      email2: "contact@umiyadhamtarana.org",
      addressEn: "Umiya Dham Tarana, Ujjain, Madhya Pradesh, India",
      addressHi: "उमिया धाम तराना, उज्जैन, मध्य प्रदेश, भारत",
    });

    await db.insert(termsContent).values({
      titleEn: "Terms & Conditions for Donations",
      titleHi: "दान के लिए नियम और शर्तें",
      contentEn: `1. All donations made to Maa Umiya Patidar Samaj Seva Trust are voluntary and made with the donor's free will.

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
    });

    await db.insert(users).values({
      username: "admin",
      password: "admin123",
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
