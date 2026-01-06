import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, Mail, MapPin } from "lucide-react";
import type { TrustContent, ContactInfo } from "@shared/schema";

function TrustSection() {
  const { t } = useLanguage();

  const { data: trust, isLoading } = useQuery<TrustContent>({
    queryKey: ["/api/trust"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-background" data-testid="section-trust-loading">
        <div className="max-w-4xl mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-8" />
          <Skeleton className="h-48 w-full" />
        </div>
      </section>
    );
  }

  if (!trust) return null;

  return (
    <section className="py-16 bg-background" data-testid="section-trust">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-trust-title">
            {t(trust.titleEn, trust.titleHi)}
          </h1>
          {trust.subtitleEn && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-trust-subtitle">
              {t(trust.subtitleEn, trust.subtitleHi || "")}
            </p>
          )}
        </div>

        <Card className="border-primary/20">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert" data-testid="text-trust-content">
              {t(trust.contentEn, trust.contentHi).split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useLanguage();

  const { data: contact, isLoading } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30" data-testid="section-contact-loading">
        <div className="max-w-4xl mx-auto px-4">
          <Skeleton className="h-10 w-48 mx-auto mb-8" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </section>
    );
  }

  if (!contact) return null;

  return (
    <section className="py-16 bg-muted/30" data-testid="section-contact">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12" data-testid="text-contact-title">
          {t("Contact Us", "संपर्क करें")}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover-elevate">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("Phone", "फ़ोन")}</h3>
                  {contact.phone1 && (
                    <a
                      href={`tel:${contact.phone1.replace(/\s/g, "")}`}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-phone-1"
                    >
                      {contact.phone1}
                    </a>
                  )}
                  {contact.phone2 && (
                    <a
                      href={`tel:${contact.phone2.replace(/\s/g, "")}`}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-phone-2"
                    >
                      {contact.phone2}
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("Email", "ईमेल")}</h3>
                  {contact.email1 && (
                    <a
                      href={`mailto:${contact.email1}`}
                      className="block text-muted-foreground hover:text-primary transition-colors break-all"
                      data-testid="link-email-1"
                    >
                      {contact.email1}
                    </a>
                  )}
                  {contact.email2 && (
                    <a
                      href={`mailto:${contact.email2}`}
                      className="block text-muted-foreground hover:text-primary transition-colors break-all"
                      data-testid="link-email-2"
                    >
                      {contact.email2}
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {contact.addressEn && (
            <Card className="hover-elevate md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t("Address", "पता")}</h3>
                    <p className="text-muted-foreground" data-testid="text-address">
                      {t(contact.addressEn, contact.addressHi || "")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col" data-testid="page-about">
      <Header />
      <main className="flex-1">
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
