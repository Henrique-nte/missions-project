import { filtrarMissoes } from "../missions/filtrarMissoes.js";

const selectDificuldades = document.querySelector("#select-dificuldades");
const inputPesquisa = document.querySelector("#pesquisa");
const selectStatus = document.querySelector("#select-status");
const selectPlayer = document.querySelector("#select-player");

export function eventoSelectDifuldades() {
  selectDificuldades.addEventListener("change", () => {
    inputPesquisa.value = "";
    selectStatus.value = "";
    selectPlayer.value = "";
    filtrarMissoes();
  });
}
