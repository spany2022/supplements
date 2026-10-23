import { Hero } from "@/components/home/Hero";
import { ShopByGoal } from "@/components/home/ShopByGoal";
import { Bestsellers } from "@/components/home/Bestsellers";
import { Discovery } from "@/components/home/Discovery";
import { Science } from "@/components/home/Science";
import { Lab } from "@/components/home/Lab";
import { WhyUs } from "@/components/home/WhyUs";
import { Community } from "@/components/home/Community";
import { Guides } from "@/components/home/Guides";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd, organizationLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <Hero />
      <ShopByGoal />
      <Bestsellers />
      <Discovery />
      <Science />
      <Lab />
      <WhyUs />
      <Community />
      <Guides />
      <FinalCta />
    </>
  );
}
