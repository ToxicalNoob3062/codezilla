import { Show } from "solid-js";
import { Transaction } from "../handlers/verifyTransaction";
import { effect } from "solid-js/web";

export default function Transfer(props: { transaction?: Transaction }) {
  return (
    <Show when={props.transaction !== null}>
      <div class="text-[#052f3c] mx-auto p-4">
        <h2 class="text-center text-2xl mb-2">Transaction Details</h2>
        <div class="text-xl w-fit p-4 gap-6 mx-auto border-2 border-[#052f3c] rounded-lg">
          <div class="flex flex-col gap-6 mx-auto">
            <p>
              Date:{" "}
              <span class="text-[#1d848f] ml-2">{props.transaction.date}</span>
            </p>
            <p>
              Reference Number:{" "}
              <span class="text-[#1d848f] ml-2">
                {props.transaction.reference_number}
              </span>
            </p>
            <p>
              Sent From:{" "}
              <span class="text-[#1d848f] ml-2">
                {props.transaction.sent_from}
              </span>
            </p>
            <p>
              Amount:{" "}
              <span class="text-[#1d848f] ml-2">
                {props.transaction.amount}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Show>
  );
}
