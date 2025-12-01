import { filtrarArray } from "./filtrarArray.js";
import { carregarMissoes } from "./carregarMissoes.js";

const selectPlayer = document.querySelector("#select-player");
const inputPesquisa = document.querySelector("#pesquisa");
const selectDificuldades = document.querySelector("#select-dificuldades");
const selectStatus = document.querySelector("#select-status");

export function filtrarMissoes() {
  const jogador = selectPlayer.value;
  const texto = inputPesquisa.value;
  const dificuldade = selectDificuldades.value;
  const status = selectStatus.value;

  const filtradas = filtrarArray({ jogador, texto, dificuldade, status });

  carregarMissoes(filtradas);
}
