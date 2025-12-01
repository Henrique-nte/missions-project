import { filtrarMissoes } from "../missions/filtrarMissoes.js";

const inputPesquisa = document.querySelector("#pesquisa");
const selectDificuldades = document.querySelector("#select-dificuldades");
const selectStatus = document.querySelector("#select-status");
const selectPlayer = document.querySelector("#select-player");

export function eventoInputPesquisa() {
  inputPesquisa.addEventListener("input", () => {
    selectDificuldades.value = "";
    selectStatus.value = "";
    selectPlayer.value = "";
    filtrarMissoes();
  });
}
