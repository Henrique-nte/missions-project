import { jogadores } from "./data.js";
import { eventoInputPesquisa, carregarMissoes, listarJogadores, eventoSelectDifuldades, eventoSelectStatus, eventoSelectPlayer } from "./functions.js";

if (jogadores.length === 0) {
  document.body.innerHTML += `
  <div class="flex">
  <span class="no-player">No missions yet</span>
  <div/>
  `;
}

listarJogadores();

eventoInputPesquisa();
eventoSelectDifuldades();
eventoSelectStatus();
eventoSelectPlayer();

document.addEventListener("DOMContentLoaded", () => carregarMissoes(jogadores));
