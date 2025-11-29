import { filtrarMissoes } from "../missions/filtrarMissoes.js";

const selectStatus = document.querySelector("#select-status");
const inputPesquisa = document.querySelector("#pesquisa");
const selectDificuldades = document.querySelector("#select-dificuldades");
const selectPlayer = document.querySelector("#select-player");

export function eventoSelectStatus() {
  selectStatus.addEventListener("change", () => {
    inputPesquisa.value = "";
    selectDificuldades.value = "";
    selectPlayer.value = "";
    filtrarMissoes();
  });
}
