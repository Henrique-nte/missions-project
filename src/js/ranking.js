import { jogadores } from "./data/data.js";

const divRanking = document.querySelector(".ranking");

if (jogadores.length === 0) {
  divRanking.innerHTML += `
     <span class="no-player">No players yet</span>
  `;
}

divRanking.innerHTML += jogadores
  .sort((a, b) => b.pontos - a.pontos)
  .map((j, i) => {
    let nivel =
      (j.pontos >= 500 && "senior") ||
      (j.pontos >= 250 && "pleno") ||
      (j.pontos >= 50 && "junior");

    return `
      <div class="player">
          <span class="pos">${i + 1}</span>
          <span class="name">${j.nome}</span>

          <span class="score">${j.pontos} pts</span>
          <span class="level level-${nivel}">
            ${nivel}
          </span>

      </div>
    `;
  })
  .join("");
