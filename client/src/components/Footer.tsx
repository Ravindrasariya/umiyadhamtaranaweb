import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

const quickLinks = [
  { path: "/", labelEn: "Home", labelHi: "होम" },
  { path: "/about", labelEn: "About Temple", labelHi: "मंदिर के बारे में" },
  { path: "/tourism", labelEn: "Tourism", labelHi: "पर्यटन" },
  { path: "/donation", labelEn: "Donation", labelHi: "दान" },
];

const additionalLinks = [
  { path: "/gallery", labelEn: "Gallery", labelHi: "गैलरी" },
  { path: "/terms", labelEn: "Terms & Conditions", labelHi: "नियम और शर्तें" },
  { path: "/privacy", labelEn: "Privacy Policy", labelHi: "गोपनीयता नीति" },
];

function FooterLink({ path, children }: { path: string; children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  
  return (
    <button
      onClick={() => setLocation(path)}
      className="block text-gray-300 hover:text-primary transition-colors cursor-pointer text-left"
    >
      {children}
    </button>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1a3326] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t("About Us", "हमारे बारे में")}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t(
                "Umiya Dham Tarana is a sacred temple dedicated to Goddess Umiya, the kuldevi of Kadva Patidar community. We welcome devotees from all over the world.",
                "उमिया धाम तराना देवी उमिया को समर्पित एक पवित्र मंदिर है, जो कड़वा पाटीदार समुदाय की कुलदेवी हैं। हम दुनिया भर के भक्तों का स्वागत करते हैं।"
              )}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-youtube"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t("Quick Links", "त्वरित लिंक")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <FooterLink key={link.path} path={link.path}>
                    {t(link.labelEn, link.labelHi)}
                  </FooterLink>
                ))}
              </div>
              <div className="space-y-2">
                {additionalLinks.map((link) => (
                  <FooterLink key={link.path} path={link.path}>
                    {t(link.labelEn, link.labelHi)}
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t("Contact Us", "संपर्क करें")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  {t(
                    "Temple Office, Umiya Dham Tarana, Dist. Ujjain, Madhya Pradesh, India",
                    "मंदिर कार्यालय, उमिया धाम तराना, जिला उज्जैन, मध्य प्रदेश, भारत"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-300">+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-300">info@umiyadhamtarana.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <p className="text-gray-400 text-sm">
              {t(
                "2025 Shri Umiya Dham Trust. All Rights Reserved.",
                "2025 श्री उमिया धाम ट्रस्ट। सर्वाधिकार सुरक्षित।"
              )}
            </p>
            <p className="text-gray-400 text-sm">
              {t("Powered By", "संचालित")}:{" "}
              <a
                href="https://krashuved.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
                data-testid="link-powered-by"
              >
                KrashuVed Pvt. Ltd.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
