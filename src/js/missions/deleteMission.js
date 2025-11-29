import { jogadores } from "../data/data.js";
import { salvarJogadores } from "../storage/salvarJogadores.js";
import { prepareString } from "../utils/prepareString.js";
import { showSucces } from "../ui/mensagens.js";

const selectPlayer = document.querySelector("#select-player");

export function deleteMission() {
  const table = document.querySelector("table"); // ou tbody

  if (!table) return;

  table.addEventListener("click", (event) => {
    const btn = event.target.closest(".btn-deletar");
    if (!btn) return;

    const tr = btn.closest("tr");
    if (!tr) return;

    const nomePlayer = prepareString(selectPlayer.value);

    // Pega a missão corretamente
    const cellMission = tr.querySelector("[data-missao]");
    if (!cellMission) return;

    const nomeMission = prepareString(cellMission.textContent);

    // Acha o jogador certo
    const indexPlayer = jogadores.findIndex(
      (j) => prepareString(j.nome) === nomePlayer
    );

    if (indexPlayer === -1) return;

    // Acha a missão correta no jogador
    const indexMission = jogadores[indexPlayer].missoes.findIndex(
      (m) => prepareString(m.nome) === nomeMission
    );

    if (indexMission === -1) return;

    // Deleta a missão do array
    jogadores[indexPlayer].missoes.splice(indexMission, 1);

    salvarJogadores();

    showSucces(`Missão "${cellMission.textContent}" deletada com sucesso!`);

    // Remove a linha da tabela imediatamente — sem reload
    setTimeout(() => {
      tr.remove();
    }, 1000);
  });
}
