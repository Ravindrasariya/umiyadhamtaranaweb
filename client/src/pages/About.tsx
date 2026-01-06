import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, Mail, MapPin, User } from "lucide-react";
import type { TrustContent, ContactInfo, TeamMember } from "@shared/schema";

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

function TeamSection() {
  const { t } = useLanguage();

  const { data: members, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30" data-testid="section-team-loading">
        <div className="max-w-5xl mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
          </div>
        </div>
      </section>
    );
  }

  const defaultMembers = [
    { id: "1", nameEn: "Name", nameHi: "नाम", designationEn: "Chairman", designationHi: "अध्यक्ष", phone: "", email: "", imageUrl: "", order: 0 },
    { id: "2", nameEn: "Name", nameHi: "नाम", designationEn: "Secretary", designationHi: "सचिव", phone: "", email: "", imageUrl: "", order: 1 },
    { id: "3", nameEn: "Name", nameHi: "नाम", designationEn: "Treasurer", designationHi: "कोषाध्यक्ष", phone: "", email: "", imageUrl: "", order: 2 },
  ];

  const displayMembers = members && members.length > 0 ? members : defaultMembers;

  return (
    <section className="py-16 bg-muted/30" data-testid="section-team">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12" data-testid="text-team-title">
          {t("Our Management", "हमारा प्रबंधन")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {displayMembers.map((member) => (
            <Card key={member.id} className="text-center overflow-visible" data-testid={`card-team-${member.id}`}>
              <CardContent className="p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted border-4 border-primary/20 flex items-center justify-center overflow-hidden">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={t(member.nameEn, member.nameHi)}
                      className="w-full h-full object-cover"
                      data-testid={`img-team-${member.id}`}
                    />
                  ) : (
                    <User className="w-16 h-16 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1" data-testid={`text-team-name-${member.id}`}>
                  {t(member.nameEn, member.nameHi)}
                </h3>
                <p className="text-primary font-medium mb-3" data-testid={`text-team-designation-${member.id}`}>
                  {t(member.designationEn, member.designationHi)}
                </p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
                      data-testid={`link-team-phone-${member.id}`}
                    >
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
                      data-testid={`link-team-email-${member.id}`}
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
