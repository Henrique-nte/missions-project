import { jogadores } from "./data.js";

const modal = document.getElementById("errorModal");

export function salvarJogadores() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}

export function showError(msg) {
  modal.querySelector(".modal-error").textContent = msg;
  modal.classList.add("active");
  setTimeout(() => modal.classList.remove("active"), 1000);
}

export function showSucces(msg) {
  modal.querySelector(".modal-error").textContent = msg;
  modal.querySelector(".modal-error").style.color = "white";
  modal.classList.add("active");
  setTimeout(() => modal.classList.remove("active"), 1000);
}
