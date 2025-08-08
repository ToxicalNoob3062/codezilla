export default function Block(props: {
  img: string;
  title: string;
  description: string;
  img_direction: "left" | "right";
}) {
  return (
    <div
      class={`flex ${props.img_direction === "left" ? "flex-row" : "flex-row-reverse"} items-center h-96 gap-4 px-6`}
    >
      <div class="relative h-full w-1/3 mx-auto bg-gradient-to-br from-green-300 via-green-400 to-green-500 shadow-lg rounded-lg">
        <div class="relative w-full h-full mt-6">
          <div class="absolute inset-0 bg-gradient-to-br from-green-300 via-yellow-200 to-pink-300 rounded-2xl blur-2xl opacity-60 z-0"></div>
          <img
            src={props.img}
            alt={props.title}
            class="relative z-10 w-full h-full max-h-[100vh] object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div class="w-1/2 p-4">
        <h2 class="text-4xl mb-6 text-[#1d848f]">{props.title}</h2>
        <p class="text-[#545454] text-2xl">{props.description}</p>
      </div>
    </div>
  );
}
