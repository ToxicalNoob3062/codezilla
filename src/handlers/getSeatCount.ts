import { API_BASE_URL } from "./base";
export default function getSeatCount(
  module: "m1" | "m2",
  batch: "b1" | "b2",
): Promise<number> {
  return fetch(`${API_BASE_URL}/slots?module=${module}&batch=${batch}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.count);
}
