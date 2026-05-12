import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NextEvent from "@/components/NextEvent";
import Medals from "@/components/Medals";
import About from "@/components/About";
import PracticalInfo from "@/components/PracticalInfo";
import Social from "@/components/Social";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <NextEvent />
      <Medals />
      <About />
      <PracticalInfo />
      <Social />
      <Contact />
      <Footer />
    </>
  );
}
