import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroSection from "@/components/home/HeroSection";
import DataStorySection from "@/components/home/DataStorySection";
import MarketRealitySection from "@/components/home/MarketRealitySection";
import WhatAlikoreConnectsSection from "@/components/home/WhatAlikoreConnectsSection";
import WhereWeBuildSection from "@/components/home/WhereWeBuildSection";
import HowWeBuildSection from "@/components/home/HowWeBuildSection";
import PilotSection from "@/components/home/PilotSection";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <>
    <Seo
      title="AlikoTech | Construction Technology Built for Africa"
      description="AlikoTech builds practical construction technology, starting with Alikore, a project control and management platform designed for African construction conditions."
      path="/"
    />
    <Navbar />
    <main>
      <HeroSection />
      <DataStorySection />
      <MarketRealitySection />
      <WhatAlikoreConnectsSection />
      <HowWeBuildSection />
      <WhereWeBuildSection />
      <PilotSection />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Index;
