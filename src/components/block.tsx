export default function Block(props: {
  img: string;
  title: string;
  description: string;
  img_direction: "left" | "right";
}) {
  return (
    <div
  class={`flex flex-col ${props.img_direction === "left" ? "lg:flex-row" : "lg:flex-row-reverse"} items-center lg:h-96 gap-4 px-6`}
    >
      <div class="relative w-auto sm:h-72 h-80 lg:h-full lg:w-1/3 mx-auto bg-gradient-to-br from-green-300 via-green-400 to-green-500 shadow-lg rounded-lg">
        <div class="relative w-full h-full mt-6">
          <div class="absolute inset-0 bg-gradient-to-br from-green-300 via-yellow-200 to-pink-300 rounded-2xl blur-2xl opacity-60 z-0"></div>
          <img
            src={props.img}
            alt={props.title}
            class="relative z-10 w-full h-full max-h-[100vh] object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div class="w-full md:w-[80%] lg:w-1/2 p-0 lg:p-4 text-left">
        <h2 class="text-3xl lg:text-4xl mb-6 text-[#1d848f] text-center lg:text-left">{props.title}</h2>
        <p class="text-[#545454] text-justify text-xl lg:text-2xl mx-auto">{props.description}</p>
      </div>
    </div>
  );
}
