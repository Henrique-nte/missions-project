import { jogadores } from "../data/data.js";

export function salvarJogadores() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}
