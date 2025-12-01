import { timeOut } from "../timeOut/timeOut.js";
import { toast } from "./modal.js";

export function showError(msg) {
  const messageEl = toast.querySelector(".toast-message");

  messageEl.textContent = msg;
  messageEl.style.background = "#ff3737";
  messageEl.style.color = "#fff";

  toast.classList.add("active");

  setTimeout(() => toast.classList.remove("active"), timeOut);
}

export function showSucces(msg) {
  const messageEl = toast.querySelector(".toast-message");

  messageEl.textContent = msg;
  messageEl.style.background = "#28c76f";
  messageEl.style.color = "#fff";

  toast.classList.add("active");

  setTimeout(() => toast.classList.remove("active"), timeOut);
}
