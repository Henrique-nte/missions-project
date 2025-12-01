import { jogadores } from "../data/data.js";
import { salvarJogadores } from "../storage/salvarJogadores.js";
import { prepareString } from "../utils/prepareString.js";
import { showSucces } from "../ui/mensagens.js";
import { timeOut } from "../timeOut/timeOut.js";

const selectPlayer = document.querySelector("#select-player");

export function fixMission() {
  const table = document.querySelector("table");
  if (!table) return;

  table.addEventListener("click", (event) => {
    const btnCheck = event.target.closest(".btn-concluir");
    if (!btnCheck) return;

    const tr = btnCheck.closest("tr");
    if (!tr) return;
    const nomePlayer = prepareString(selectPlayer.value);
    const pontos = parseInt(tr.querySelector(".pontos").textContent);

    // Pega a missão corretamente
    const cellMission = tr.querySelector("[data-missao]");
    if (!cellMission) return;

    const nomeMission = prepareString(cellMission.textContent);

    // Índice do jogador certo
    const indexPlayer = jogadores.findIndex(
      (j) => prepareString(j.nome) === nomePlayer
    );

    if (indexPlayer === -1) return;

    // Agora sim: buscar a missão no jogador correto
    const indexMission = jogadores[indexPlayer].missoes.findIndex(
      (m) => prepareString(m.nome) === nomeMission
    );

    if (indexMission === -1) return;

    //Altera os dados
    jogadores[indexPlayer].missoes[indexMission].status = "Concluída";
    jogadores[indexPlayer].pontos += pontos;

    salvarJogadores();

    showSucces(`Missão "${cellMission.textContent}" marcada como concluída!`);

    setTimeout(() => {
      window.location.href = `${location.origin}/missions-project/ranking.html`;
    }, timeOut);
  });
}
