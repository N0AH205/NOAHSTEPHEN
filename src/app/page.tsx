import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <SelectedWork />
      <Philosophy />
      <Footer />
    </main>
  );
}
