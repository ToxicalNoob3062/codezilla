import { createSignal, Setter, Show } from "solid-js";
import verifyTransaction, { Transaction } from "../handlers/verifyTransaction";
import Transfer from "./transfer";
import { insertStudent, Student } from "../handlers/addStudent";

function getMaxDate() {
  const today = new Date();
  const year = today.getFullYear() - 15;
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
  const day = today.getDate().toString().padStart(2, "0");
  const maxDate = `${year}-${month}-${day}`;
  return maxDate;
}

export default function Form(props: {
  module: "m1" | "m2";
  setBatch: Setter<"b1" | "b2">;
  isFull: () => boolean;
  setReservedSpots: Setter<number>;
}) {
  let eref_input: HTMLInputElement;
  let [transaction, setTransaction] = createSignal<Transaction | null>(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        let student: Student = {
          name: e.currentTarget.sname.value,
          email: e.currentTarget.email.value,
          dob: e.currentTarget.dob.value,
          parent_name: e.currentTarget.parent_name.value,
          phone: e.currentTarget.phone.value,
          batch: e.currentTarget.batch.value,
          module: props.module,
          eref_number: transaction().reference_number,
          amount: Math.round(
            parseFloat(transaction().amount.replace(/[^0-9.-]+/g, "")),
          ),
        };
        try {
          const id = await insertStudent(student, transaction().mail_id);
          props.setReservedSpots((prev) => prev + 1);
          setTransaction(null);
          alert("Registration successful! Registration ID: " + id);
        } catch (error) {
          alert("Registration failed: " + error.message);
        }
        form.reset();
      }}
      class="bg-[#faf7eb] w-1/2 mx-auto p-12 mt-32 flex flex-col gap-6 rounded-lg shadow-lg relative"
    >
      {/* students name , date of birth and email */}
      <div class="flex justify-start items-center gap-2">
        <div class="w-60 flex flex-col gap-4 mb-6">
          <label class="text-2xl text-[#052f3c]">Name:</label>
          <input
            name="sname"
            placeholder="John Doe"
            type="text"
            class="p-2 border border-gray-300 bg-white rounded"
            required
          />
        </div>
        <div class="w-60 flex flex-col gap-4 mb-6">
          <label class="text-2xl text-[#052f3c]">Email:</label>
          <input
            name="email"
            placeholder="john@example.com"
            type="email"
            class="p-2 border border-gray-300 bg-white rounded"
            required
          />
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-2xl text-[#052f3c]">Date of Birth:</label>
          <input
            name="dob"
            type="date"
            class="p-2 border border-gray-300 bg-white rounded"
            max={getMaxDate()}
            required
          />
        </div>
      </div>
      {/* parent/guardian name and phone number */}
      <div class="flex justify-start items-center gap-2">
        <div class="w-60 flex flex-col gap-4 mb-6">
          <label class="text-2xl text-[#052f3c]">Parent Name:</label>
          <input
            name="parent_name"
            placeholder="Jack Doe"
            type="text"
            class="p-2 border border-gray-300 bg-white rounded"
            required
          />
        </div>
        <div class="w-60 flex flex-col gap-4 mb-6">
          <label class="text-2xl text-[#052f3c]">Phone Number:</label>
          <input
            name="phone"
            placeholder="3431234123"
            type="tel"
            class="p-2 border border-gray-300 bg-white rounded"
            required
          />
        </div>
        <div class="w-40 flex flex-col gap-4 mb-6">
          <label class="text-2xl text-[#052f3c]">Batch:</label>
          <select
            name="batch"
            class="p-2 border border-gray-300 bg-white rounded"
            onChange={(e) => {
              props.setBatch(e.currentTarget.value as "b1" | "b2");
            }}
            required
          >
            <option value="b1">Batch 1</option>
            <option value="b2">Batch 2</option>
          </select>
        </div>
      </div>
      {/* external reference number of e-transfer */}
      <div class="flex justify-start items-center gap-4 mx-auto">
        <Show
          when={props.isFull()}
          fallback={
            <>
              <div class="flex flex-col gap-4 mb-6">
                <label class="text-2xl text-[#052f3c]">
                  E-Transfer Reference Number:
                </label>
                <input
                  name="eref_number"
                  ref={eref_input}
                  placeholder="C1ArUTzJwR5v"
                  type="text"
                  class="p-2 border border-gray-300 bg-white rounded"
                  required
                />
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  if (eref_input.value.trim() === "") {
                    alert("E-Transfer Reference Number is required");
                    return;
                  }
                  const tx = await verifyTransaction(eref_input.value.trim());
                  if (!tx) {
                    setTransaction(null);
                    alert(
                      "Sorry, We did not find your payment or the reference number has been re-used. But nothing to worry! Please contact at rahat3515@zynclo.com, (reply within 30 mins).",
                    );
                    return;
                  }
                  setTransaction(tx);
                }}
                type="button"
                class="w-fit py-2 px-4 text-2xl bg-[#1d848f] text-white rounded mt-6 cursor-pointer hover:scale-105"
              >
                Verify
              </button>
            </>
          }
        >
          <span class="text-red-500 text-3xl">Registration is full 😭</span>
        </Show>
      </div>
      <div>
        <Transfer transaction={transaction()} />
        <Show when={transaction() !== null}>
          <button
            type="submit"
            class="block w-fit mx-auto py-3 px-5 text-2xl bg-[#052f3c] text-[#faf7eb] rounded mt-6 cursor-pointer hover:scale-105"
          >
            Register
          </button>
        </Show>
      </div>
      <img
        src="./form.png"
        alt="Logo"
        class="w-32 mx-auto mb-6 scale-150 absolute -top-32 left-1/2 transform -translate-x-1/2 "
      />
    </form>
  );
}
