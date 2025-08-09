import Block from "./block";

export default function Features() {
  return (
    <section>
      <h2 class="text-4xl lg:text-5xl text-[#052f3c] text-center mb-16">
        Why Choose Camp-Codezilla?
      </h2>
      <div class="flex flex-col gap-6">
        <Block
          img="./coin.png"
          title="Cheaper Than Ever"
          description="Camp-Codezilla offers unbeatable value with live, expert-led training at just $12/hr—far below Ontario’s average high school rate of $30/hr. Choose one or both modules with full flexibility. Get 76.5 hours of professional instruction for just $780 CAD with our early bird offer. High-quality coding education has never been this affordable in Canada!"
          img_direction="left"
        />
        <Block
          img="./care.png"
          title="Compact Private Tutoring"
          description="At Camp-Codezilla, every child matters. That’s why we keep our batches small—just 25 students per group—to ensure personalized guidance, meaningful interaction, and focused support in every session. With two flexible batch timings, your child can learn at their own pace, ask questions freely, and receive the individual attention they truly deserve."
          img_direction="right"
        />
        <Block
          img="./techy.png"
          title="Latest and Advanced Curriculum"
          description="At Camp-Codezilla, we teach what’s trending, powerful, and practical. Our hands-on program goes beyond outdated basics, equipping your child with modern tools to build real-world web apps and become a confident, future-ready tech leader."
          img_direction="left"
        />
        <Block
          img="./graduation.png"
          title="From Learners to Leaders"
          description="At Camp-Codezilla, we don’t just teach coding—we shape confident, self-reliant young professionals. Starting at age 15, students gain practical skills to build real projects, support their communities, and launch side hustles. They graduate with a Certificate of Completion, opening doors to freelance gigs, internships, and more. It’s future-ready empowerment."
          img_direction="right"
        />
      </div>
    </section>
  );
}
