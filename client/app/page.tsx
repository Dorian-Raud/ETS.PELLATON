import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import InfoHighlight from "@/components/InfoHighlight";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <InfoHighlight>
          <InfoSection
            id="conseil"
            title="Conseil"
            text="Notre équipe accompagne collectionneurs et institutions dans la constitution et le suivi de leur collection, de l'acquisition à la conservation."
          />
          <InfoSection
            id="apropos"
            title="À propos"
            text="Fondée par passion pour l'art contemporain, notre galerie présente des artistes émergents et confirmés à travers des expositions exigeantes."
          />
        </InfoHighlight>
      </main>
      <Footer />
    </>
  );
}
