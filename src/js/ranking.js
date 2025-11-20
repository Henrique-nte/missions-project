import { jogadores } from "./data.js";

const divRanking = document.querySelector(".ranking");

divRanking.innerHTML += jogadores
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
