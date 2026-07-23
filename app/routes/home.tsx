import i18n from "../i18n/i18n";
import { Welcome } from "../welcome/welcome";
import  AboutUs from "../components/about";
import  Navigation from "../components/Navigation";
import  FAQ from "../components/FAQ";
import  Hero from "../components/Hero";
import  Partenaire from "../components/partenaire";
import  Process from "../components/Process";
import  Project from "../components/project";
import  ServicesStacked from "../components/Services";
import  Testimonials from "../components/Testimonials";
import  Clients from "../components/Clients";
import Contact from "../components/Contact";

export function meta() {
  return [
    { title: i18n.t("home.metaTitle") },
    { name: "description", content: i18n.t("home.metaDescription") },
  ];
}

export default function Home() {
  return (
    <div className="bg-white">
      <Navigation />
      <Hero />
      <AboutUs />
      
      <ServicesStacked />
      <Project />
      <Process />
  
      <Clients />
      <Testimonials />
      <FAQ />
      <Partenaire />
      <Contact />
      

    </div>
  );
}
