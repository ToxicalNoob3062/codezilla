import { API_BASE_URL } from "./base";

export type Student = {
  name: string; // max 255 chars expected
  email: string; // max 255 chars expected
  dob: string; // ISO date string, e.g. '2000-01-01'
  parent_name: string; // max 255 chars expected
  phone: string; // max 50 chars expected
  batch: "b1" | "b2"; // only 'b1' or 'b2'
  module: "m1" | "m2"; // only 'm1' or 'm2'
  eref_number: string; // max 15 chars expected
  amount: number; // integer between 0 and 999
};


export async function insertStudent(
  student: Student,
  mailId: string,
): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/students/${mailId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage = errorBody.detail || response.statusText;
    throw new Error(`Failed to insert student: ${errorMessage}`);
  }
  const data = await response.json();
  if (!data.id) {
    throw new Error("Insert response missing new student ID");
  }

  return data.id as number;
}
