import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { AboutSection } from "@/components/AboutSection";
import { PoojaTimings } from "@/components/PoojaTimings";
import { ServicesSection } from "@/components/ServicesSection";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" data-testid="page-home">
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <AboutSection />
        <PoojaTimings />
        <ServicesSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
