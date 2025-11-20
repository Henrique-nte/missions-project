import { jogadores } from "./data.js";

const divRanking = document.querySelector(".ranking");

if (jogadores.length === 0) {
  divRanking.innerHTML += `
     <span class="no-player">No players yet</span>
  `;
}

divRanking.innerHTML += jogadores
  .sort((a, b) => b.pontos - a.pontos)
  .map((j, i) => {
    return `

      <div class="player">
          <span class="pos">${i + 1}</span>
          <span class="name">${j.nome}</span>
          <span class="score">${j.pontos} pts</span>
      </div>
    `;
  })
  .join("");
