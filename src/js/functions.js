import { jogadores } from "./data.js";

export function salvarJogadores() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}
