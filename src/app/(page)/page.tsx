import Avis from "@/components/Avis";
import ScrollUp from "@/components/common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Accueil from "@/components/Accueil";
import PointD from "@/components/PointD";
import Atouts from "@/components/Atout";
import Partenaire from "@/components/Partenaires";
import Stats from "@/components/stat";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Abonnement from "@/components/Abonnement";
import Map from "@/components/Map";

export const metadata: Metadata = {
  title: "RestoreU",
  description: "RestoreU",
  // other metadata
};

export default function Home() {
  //const Video = dynamic(() => import('@/components/Map'), { ssr: false });

  return (
    <>
      {/* <div className="bg-gray-100 flex min-h-screen flex-col"> */}
      <ScrollUp />
      <Accueil />
      <Features />
      <Atouts />
      <Partenaire />
      <PointD />
      <Map />
      <Abonnement />
      <Stats />
      <Avis />
      <Contact />
    </>
  );
}
