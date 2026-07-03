import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AboutSection from "@/components/AboutSection/AboutSection";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export default function AProposPage() {
  return (
    <>
      <Header />
      <main>
        <AboutSection id="apropos" title="À propos" text={LOREM} />
      </main>
      <Footer />
    </>
  );
}
