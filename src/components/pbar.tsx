import { For } from "solid-js";

export default function ProgressBar(props: { progress: () => number }) {
  const totalSlots = 25;
  return (
    <div class="w-1/2 mx-auto text-center">
      {/* Progress Bar */}
      <div class="h-4 rounded-full overflow-hidden flex">
        <For each={Array.from({ length: totalSlots })}>
          {(_, index) => {
            const isFirst = index() === 0;
            const isLast = index() === totalSlots - 1;
            return (
              <div
                class={`flex-1 h-full ${
                  index() < props.progress() ? "bg-[#052f3c]" : "bg-[#faf7eb]"
                } ${
                  isFirst ? "rounded-l-full" : isLast ? "rounded-r-full" : ""
                } ${!isLast ? "mr-1" : ""}`}
              ></div>
            );
          }}
        </For>
      </div>

      {/* Progress Text */}
      <div class="mt-2 text-2xl font-medium text-gray-700">
        {props.progress()}/{totalSlots} slots filled
      </div>
    </div>
  );
}
