import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroSection from "@/components/home/HeroSection";
import WhatWeBuildSection from "@/components/home/WhatWeBuildSection";
import DataStorySection from "@/components/home/DataStorySection";
import MarketRealitySection from "@/components/home/MarketRealitySection";
import WhatAlikoreConnectsSection from "@/components/home/WhatAlikoreConnectsSection";
import WhyConstructionSection from "@/components/home/WhyConstructionSection";
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
      <WhatWeBuildSection />
      <DataStorySection />
      <MarketRealitySection />

      <WhyConstructionSection />
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
