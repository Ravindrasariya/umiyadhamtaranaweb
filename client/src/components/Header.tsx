import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", labelEn: "Home", labelHi: "होम" },
  { path: "/about", labelEn: "About Us", labelHi: "हमारे बारे में" },
  { path: "/tourism", labelEn: "Tourism", labelHi: "पर्यटन" },
  { path: "/donation", labelEn: "Donation", labelHi: "दान" },
  { path: "/admin", labelEn: "Admin", labelHi: "व्यवस्थापक" },
];

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md overflow-hidden">
              <span className="text-primary font-bold text-lg">ॐ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-wide">
                {t("Umiya Dham Tarana", "उमिया धाम टाराना")}
              </span>
              <span className="text-white/80 text-xs">
                {t("Shri Umiya Dham Trust", "श्री उमिया धाम ट्रस्ट")}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-white/90 font-medium px-4 py-2 ${
                    location === item.path
                      ? "bg-white/20 text-white"
                      : ""
                  }`}
                  data-testid={`nav-${item.labelEn.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {t(item.labelEn, item.labelHi)}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="bg-white/10 border-white/30 text-white gap-2"
              data-testid="button-language-toggle"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === "en" ? "हिंदी" : "EN"}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 border-t border-white/10">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white/90 font-medium ${
                    location === item.path ? "bg-white/20 text-white" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.labelEn.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {t(item.labelEn, item.labelHi)}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
