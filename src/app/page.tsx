import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StackTecnologico from "@/components/StackTecnologico";
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
        <StackTecnologico />
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
