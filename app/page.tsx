import DernierSortie from "@/components/kp/DernierSortie";
import { KpHero } from "@/components/kp/KpHero";
import Modeles from "@/components/kp/Modeles";
import Parala from "@/components/kp/Parala";
import { Reveal } from "@/components/kp/Reveal";
import Sav from "@/components/kp/Sav";
import Sira from "@/components/kp/Sira";
import Turn from "@/components/kp/Turn";

export default function Home() {
  return (
    <div className="">
      <KpHero />

      <Reveal from="bottom" distance="lg" amount={0.18} delayMs={40}>
        <DernierSortie />
      </Reveal>
      
      <Reveal from="bottom" distance="lg" amount={0.14} delayMs={60}>
        <Modeles />
      </Reveal>


      <Reveal from="bottom" distance="lg" amount={0.14} delayMs={60}>
        <Parala />
      </Reveal>

      <Reveal from="bottom" distance="lg" amount={0.18} delayMs={60}>
        <Sav />
      </Reveal>

      <Reveal from="bottom" distance="lg" amount={0.18} delayMs={60}>
        <Turn />
      </Reveal>
    </div>
  );
}
