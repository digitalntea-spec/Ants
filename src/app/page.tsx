import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import ComoFunciona from "@/components/ComoFunciona";
import SobreNosotros from "@/components/SobreNosotros";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsappFab from "@/components/WhatsappFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <ComoFunciona />
        <SobreNosotros />
        <Testimonios />
        <Contacto />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
