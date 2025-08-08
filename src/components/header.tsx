import { onMount } from "solid-js";

export default function Header() {
  onMount(() => {
    const container = document.getElementById("logo-container")!;
    const glow = document.getElementById("glow-bg")!;
    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxOffset = 120;
      const moveX = ((x - centerX) / centerX) * maxOffset;
      const moveY = ((y - centerY) / centerY) * maxOffset;
      glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    container.addEventListener("mouseleave", () => {
      glow.style.transform = "translate(0, 0)";
    });
  });
  return (
    <section class="block bg-gradient-to-br from-green-300 via-green-400 to-green-500 rounded-tl-4xl rounded-tr-4xl">
      <div class="flex justify-between items-center max-w-screen-2xl mx-auto px-4 py-8">
        <div id="logo-container" class="relative w-1/2 mx-auto">
          <div
            id="glow-bg"
            class="absolute -inset-5 bg-gradient-to-br from-green-300 via-yellow-200 to-pink-300 rounded-full blur-3xl opacity-60 z-0 transition-transform duration-200 eas"
          ></div>
          <img src="./Blogo.png" alt="Logo" class="relative z-10 w-full" />
        </div>
        <div class="w-1/2 flex flex-col gap-3">
          <h1 class="text-7xl text-[#052f3c]">Web Development Bootcamp</h1>
          <h3 class="text-4xl text-[#1d848f]">
            Fall 2025 | Live & Online | Ages 15+
          </h3>
          <p class="text-2xl text-[#faf7eb]">
            Camp-Codezilla is a cutting-edge, beginner-focused web development
            bootcamp dedicated to equipping students with the skills needed to
            thrive in the fast-paced world of technology. Designed for absolute
            beginners, this program blends a modern curriculum with hands-on
            project work and individualized support, enabling participants to
            build and deploy production-ready web applications using today’s top
            frameworks and tools.
          </p>
          <div class="flex gap-6">
            <a
              href="#registration"
              class="w-fit py-2 px-4 text-2xl bg-[#1d848f] text-white rounded mt-6 cursor-pointer hover:scale-105"
            >
              Register Now
            </a>
            <a
              href="http://localhost:8000/pdf"
              download="file.pdf"
              class="w-fit py-2 px-4 text-2xl bg-[#1d848f] text-white rounded mt-6 cursor-pointer hover:scale-105 inline-block text-center"
            >
              Download Details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
