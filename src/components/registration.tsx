import { createSignal } from "solid-js";
import Form from "./form";
import ProgressBar from "./pbar";
import { effect } from "solid-js/web";
import getSeatCount from "../handlers/getSeatCount";
export default function Registration() {
  let [module, setModule] = createSignal<"m1" | "m2">("m1");
  let [batch, setBatch] = createSignal<"b1" | "b2">("b1");
  let price = () => (module() === "m1" ? 195 : 595);
  let [reservedSpots, setReservedSpots] = createSignal<number>(0);
  effect(async () => {
    const count = await getSeatCount(module(), batch());
    setReservedSpots(count);
  });
  return (
    <section
      id="registration"
      class="bg-gradient-to-br from-green-300 via-green-400 to-green-500 rounded-bl-4xl rounded-br-4xl flex flex-col gap-16"
    >
      <h2 class="text-5xl text-[#052f3c] text-center mt-10">Registration</h2>
      <h4 class="text-2xl text-[#faf7eb] text-center">
        Please E-Transfer{" "}
        <span class="text-4xl text-yellow-200 mx-2">
          {price()} CAD (early bird)
        </span>{" "}
        to{" "}
        <span class="text-3xl text-[#1d848f] mx-2">rahat3515@zynclo.com</span>{" "}
        and then fill the form after successful payment.
      </h4>
      <Form
        module={module()}
        setBatch={setBatch}
        isFull={() => reservedSpots() >= 25}
        setReservedSpots={setReservedSpots}
      />
      <div>
        <ProgressBar progress={reservedSpots} />
        <div class="flex justify-center w-fit my-6 mx-auto rounded-lg shadow-lg overflow-hidden">
          <button
            class={`py-3 px-5 cursor-pointer ${module() === "m1" ? "bg-[#052f3c] text-[#faf7eb]" : "bg-[#faf7eb] text-[#052f3c]"}`}
            onClick={() => setModule("m1")}
          >
            Module 1
          </button>
          <button
            class={`py-3 px-5 cursor-pointer ${module() === "m1" ? "bg-[#faf7eb] text-[#052f3c]" : "bg-[#052f3c] text-[#faf7eb]"}`}
            onClick={() => setModule("m2")}
          >
            Module 2
          </button>
        </div>
      </div>
    </section>
  );
}
