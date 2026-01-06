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
            <span className="text-white font-extrabold text-xl md:text-2xl tracking-wide">
              {language === "hi" ? (
                <span className="text-2xl md:text-3xl">उमिया धाम तराना</span>
              ) : (
                "Umiya Dham Tarana"
              )}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-white/90 font-bold text-base px-5 py-2 ${
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
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="bg-white/10 border-white/30 text-white gap-2"
              data-testid="button-language-toggle"
            >
              <Globe className="w-5 h-5" />
              <span className="font-bold text-base">{language === "en" ? "हिंदी" : "EN"}</span>
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
                  className={`w-full justify-start text-white/90 font-bold text-base ${
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
