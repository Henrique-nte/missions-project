import { jogadores } from "./data/data.js";
import { carregarMissoes } from "./missions/carregarMissoes.js";

import { listarJogadores } from "./players/listarJogadores.js";
import { initEvents } from "./events/initEvents.js";

document.addEventListener("DOMContentLoaded", () => {
  // Caso não existam jogadores
  if (jogadores.length === 0) {
    document.body.innerHTML += `
      <div class="flex">
        <span class="no-player">Nenhuma missão encontrada</span>
      </div>
    `;
    return;
  }

  listarJogadores();
  initEvents();
  carregarMissoes(jogadores);
});
