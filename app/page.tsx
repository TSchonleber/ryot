import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { Stakes } from "@/components/sections/stakes";
import { Coin } from "@/components/sections/coin";
import { Tracker } from "@/components/sections/tracker";
import { Nhs } from "@/components/sections/nhs";
import { Faq } from "@/components/sections/faq";

export default function Page() {
  return (
    <main>
      <Hero />
      <Story />
      <Stakes />
      <Coin />
      <Tracker />
      <Nhs />
      <Faq />
    </main>
  );
}
