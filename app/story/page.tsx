import type { Metadata } from "next";
import { StoryHero } from "@/components/story-page/story-hero";
import { StorySection } from "@/components/story-page/story-section";
import { StoryCta } from "@/components/story-page/story-cta";
import { CHARITY } from "@/lib/charity";

export const metadata: Metadata = {
  title: "Ryot's Story — $RYOT",
  description:
    "How Ryot got out before the breeder's clock ran out, and why most animals don't. The longform case for $RYOT and North Shore Animal League America.",
  openGraph: {
    title: "Ryot's Story — $RYOT",
    description:
      "Four months old. Two strikes. One last chance. Ryot got out. Most don't.",
    url: "/story",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryot's Story — $RYOT",
    description:
      "Four months old. Two strikes. One last chance. Ryot got out. Most don't.",
  },
};

export default function StoryPage() {
  return (
    <main>
      <StoryHero />

      <StorySection number="01." title="Before the pond.">
        <p>
          There&apos;s a piece of how dogs are bought and sold that doesn&apos;t
          get talked about much. Somewhere between the rescues and the puppy
          mills, there are operations that breed dogs to sell and quietly
          dispose of the ones they can&apos;t move. Not all breeders. Not even
          most. But enough that this story keeps repeating itself across the
          country, in different breeds, in different counties, with different
          dogs and the same ending.
        </p>
        <p>That&apos;s the world Ryot was born into.</p>
        <p>
          The first family that took him home was an older couple. They loved
          the idea of a husky. They hadn&apos;t priced in what a four-month-old
          husky actually was: lungs like an alarm, legs like a sled team, hours
          of energy with nowhere to put it and not enough hours in a retired
          day to drain it. They returned him. They were honest about it. They
          knew they couldn&apos;t do right by him.
        </p>
        <p>
          The second family was a young couple, fresh out of college and into
          a first apartment. A husky needs space. A husky needs attention. A
          husky needs time, and more of all of it than two people figuring out
          their own week could give. They returned him too.
        </p>
        <p>
          By then Ryot was four months old and counting against himself. The
          breeder he&apos;d come from didn&apos;t keep dogs that bounced back
          twice. The arithmetic was cold and the arithmetic was clear: dogs
          that couldn&apos;t be placed were a problem, and the cheapest way to
          solve a problem is to end it. That&apos;s not metaphor. That&apos;s
          how it works in those places. The clock starts the moment you
          can&apos;t sell, and it doesn&apos;t stop.
        </p>
        <p>
          He was fourteen weeks past being the puppy anyone wanted, with two
          strikes against him, in a place where two strikes was usually the
          end of the count.
        </p>
      </StorySection>

      <StorySection number="02." title="The day I met him.">
        <p>
          I didn&apos;t know any of this when I drove out there. I knew there
          was a four-month-old husky who&apos;d been bounced twice and was
          about to run out of options. I knew enough to go.
        </p>
        <p>
          The first time I saw Ryot, he was smaller than I expected. Quieter,
          too. Huskies are not quiet dogs. They tell you what they think about
          everything: the door, the wind, the mailman, you. Ryot was watching.
          Deciding whether this was another stop or a real one. He&apos;d been
          here before. He&apos;d been other places before. He didn&apos;t have
          any reason to assume this one would be different.
        </p>
        <p>I took him home that day.</p>
        <p>
          That&apos;s the moment most rescue stories want to dress up.
          I&apos;m not going to. There was no music. There was no slow-motion
          run across a field. There was a four-month-old dog who got into the
          back seat with the kind of caution you&apos;d expect from an animal
          that had been packed up and re-packed three times. There was a drive
          home where neither of us said much. There was a first night in a new
          apartment where he slept against the door, because he didn&apos;t
          fully trust he&apos;d still be there in the morning.
        </p>
        <p className="font-display text-text-primary text-xl sm:text-2xl leading-snug !mt-8">
          What changed wasn&apos;t dramatic. What changed was that the clock
          stopped.
        </p>
      </StorySection>

      <StorySection number="03." title="Living with him.">
        <p>Ryot is four now. He turns five in November. He weighs 110 pounds.</p>
        <p>
          That last fact matters, because most of the romance about rescuing a
          dog skips the part where the dog is large and athletic and absolutely
          does not understand that the lamp is not a chew toy. He pulls hard on
          a leash. He has the kind of physical confidence that comes with being
          a hundred and ten pounds of working-breed muscle that genuinely
          believes a closed door is a request, not a refusal.
        </p>
        <p>
          The first year was expensive. By a rough count, he ate or destroyed
          something like ten thousand dollars of tech equipment. Cables, a
          couple of laptops, headphones, controllers, anything left within
          reach. He was four months old when I got him and a husky and bored
          and full of energy that had not yet been pointed at anything
          productive. I learned how to tire him out. He learned that some
          things are not for chewing. We met somewhere in the middle.
          That&apos;s where most of rescue actually happens. The first
          afternoon is dramatic. The first year is the slow process of two
          animals figuring out how to live in the same space.
        </p>
        <p>
          I&apos;ve been with him every day since the day I brought him home.
          That&apos;s not a sentence I write to be sentimental. It&apos;s a
          fact, and it is the part of his story that matters most.
        </p>
        <p>
          The rescue moment is a single afternoon. The years after the rescue
          are the actual reason rescue exists. The whole point of pulling a
          dog out of an ending is that the dog gets to have everything that
          comes after. The walks. The naps. The way he watches me put my shoes
          on and decides whether the situation calls for participation. The
          fact that he&apos;ll hand you his paw without being asked, and the
          fact that he&apos;ll absolutely scream at the door if you take too
          long getting back.
        </p>
        <p>
          He is, by any reasonable measure, a normal dog now. That is the
          entire victory.
        </p>

        <div className="!mt-10 !mb-10 space-y-3">
          <p className="font-display text-2xl sm:text-3xl text-text-primary leading-snug">
            He&apos;s my best friend.
          </p>
          <p className="font-display text-2xl sm:text-3xl text-text-primary leading-snug">
            I trust him more than anything in this world.
          </p>
          <p className="font-display text-2xl sm:text-3xl text-accent leading-snug">
            He fills my heart with love.
          </p>
        </div>

        <p className="font-display text-text-primary text-xl sm:text-2xl leading-snug">
          The miracle isn&apos;t the second chance. The miracle is the boring
          four years of a normal life that the second chance bought.
        </p>
      </StorySection>

      <StorySection number="04." title="The economy of disposable dogs.">
        <p>This is where Ryot&apos;s story stops being about Ryot.</p>
        <p>
          There are a lot of operations like the one Ryot came from. Some are
          licensed and some aren&apos;t. Some are open about how they run and
          some aren&apos;t. The thing they share is a business model where the
          value of a dog drops to zero, or below zero, the moment that dog can
          no longer be sold or rehomed. From there, the math is the math.
        </p>
        <p>
          The pipeline that produces these situations is not exotic. People
          want puppies. Puppies are profitable. Adult dogs are not. When a
          litter doesn&apos;t all sell, when a dog gets returned, when an
          animal stops being marketable, what happens next depends entirely on
          the kind of person running the operation. Some make calls and find
          shelters and rescues and homes. Some don&apos;t. The ones that
          don&apos;t are the reason places like {CHARITY.shortName} have to
          exist.
        </p>
        <p>
          Most animals who end up in that situation don&apos;t have a Ryot
          ending. They don&apos;t have a stranger driving out to meet them on
          the day before the day. They don&apos;t have an internet-connected
          coin trying to redirect attention into rescue funding. They have a
          clock and they don&apos;t have anyone watching it.
        </p>
        <p>
          That&apos;s the part that should make you angry, and it&apos;s the
          part that makes no-kill rescue worth fighting for. A no-kill rescue
          is an organization that has decided, structurally, that the clock
          doesn&apos;t get to win. They take in animals other shelters can&apos;t
          or won&apos;t. They hold them for as long as it takes. They
          don&apos;t run out of time on a dog the way the rest of the system
          can.
        </p>
        <p>
          That&apos;s the alternative to what almost happened to Ryot.
          That&apos;s what your money is buying when 90% of these fees flow to{" "}
          {CHARITY.shortName}.
        </p>
      </StorySection>

      <StorySection
        number="05."
        title="Why North Shore Animal League America."
      >
        <p>
          {CHARITY.name} has been doing this work since 1944. They are, by any
          measure that matters, the largest no-kill animal rescue and adoption
          organization in the world. They are also part of the reason the
          words &ldquo;no-kill rescue&rdquo; carry the weight they carry now.
          They proved, at scale, that the model works.
        </p>
        <p>
          They started by pulling animals out of one local kill shelter on
          Long Island. They still pull animals out of kill shelters now, but
          now they pull from across the country. They run mobile adoption
          fleets. They run transport networks. They fund medical cases other
          shelters can&apos;t afford. They take animals other organizations
          have already given up on.
        </p>
        <p>
          If you have ever wondered whether one rescue can actually change the
          math at scale, NSAL is the proof of concept. They&apos;ve placed over
          a million animals into homes across the eight decades they&apos;ve
          been doing this.
        </p>
        <p>
          If you live in a part of the country where animals routinely leave a
          shelter alive, NSAL is part of the reason. They built the playbook.
        </p>
        <p className="font-display text-text-primary text-xl sm:text-2xl leading-snug !mt-8">
          That&apos;s where the money is going.
        </p>
      </StorySection>

      <StorySection number="06." title="How $RYOT moves the math.">
        <p>The coin part is, on purpose, the simplest section.</p>
        <p>
          $RYOT is a memecoin on pump.fun. Every time it trades, the platform
          collects a small creator fee. 90% of those fees route directly to{" "}
          {CHARITY.name}. The remaining 10% covers the Solana transaction cost
          of every donation, plus paid boosts and DEX listings. That 10% is
          operational expense, not founder income. There is no salary. There
          is no profit margin. The split exists because the alternative is
          fewer donations reaching NSAL, not more.
        </p>
        <p>
          A memecoin is, traditionally, a very stupid thing. The bet here is
          that the very stupid thing has a real audience and a real velocity,
          and that audience and velocity can be aimed at something that is the
          opposite of stupid. Attention turns into trades. Trades turn into
          fees. Fees turn into rescue funding.
        </p>
        <p>
          It&apos;s not a clever financial product. It&apos;s a redirect. The
          point is what&apos;s at the end of it, not what it looks like in the
          middle.
        </p>
        <p>
          If the coin moves, NSAL gets paid. If the coin sits still, NSAL gets
          nothing. That&apos;s the design.
        </p>
      </StorySection>

      <StoryCta />
    </main>
  );
}
