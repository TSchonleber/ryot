export const revalidate = 60;

import { Hero } from "@/components/sections/hero";
import { Coin } from "@/components/sections/coin";
import { Tracker } from "@/components/sections/tracker";
import { Nhs } from "@/components/sections/nhs";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <Coin />
      <Tracker />
      <Nhs />
      <Faq />
      <Footer />
    </main>
  );
}
