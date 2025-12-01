import { jogadores } from "../data/data.js";
import { salvarJogadores } from "../storage/salvarJogadores.js";
import { showError, showSucces } from "../ui/mensagens.js";
import { prepareString } from "../utils/prepareString.js";
import { timeOut } from "../timeOut/timeOut.js";

export function initAddMission(
  btnAddMission,
  playerSelect,
  inputNameMission,
  selectDificult,
  timeMinutes,
  pointsInput
) {
  btnAddMission.addEventListener("click", () => {
    const nomePlayer = playerSelect.value.toLowerCase().trim();
    const nome = inputNameMission.value.trim();
    const dificuldade = selectDificult.value;
    const tempo = timeMinutes.value;
    const pontos = parseInt(pointsInput.value);
    const status = "pendente";

    const noPlayers = jogadores.length === 0;

    if (noPlayers) return showError("Erro: Adicione um jogador primeiro!");

    //Verifico se Missão Já existe
    const missionAlreadyExists =
      jogadores.findIndex((j) => {
        return j.missoes.some((m) =>
          prepareString(m.nome).includes(prepareString(nome))
        );
      }) !== -1;

    if (missionAlreadyExists) return showError("Erro: Missão já existe!");

    if (!nome || !dificuldade || !tempo || !pontos) {
      showError("Campos vazios!");
      return;
    }

    const novaMissao = {
      nome,
      dificuldade,
      tempo,
      pontos,
      status,
    };

    if (nomePlayer === "") {
      jogadores.forEach((j) => {
        j.missoes.push(novaMissao);
      });

      salvarJogadores();
      showSucces("Missões adicionadas aos jogadores!");
      setTimeout(() => {
        window.location.href = `${window.location.origin}/index.html`;
      }, timeOut);
      return;
    }

    const indexJogador = jogadores.findIndex(
      (j) => j.nome.toLowerCase().trim() === nomePlayer
    );

    jogadores[indexJogador].missoes.push(novaMissao);
    salvarJogadores();

    showSucces(
      `Missão "${novaMissao.nome}" adicionada ao jogador "${jogadores[indexJogador].nome}"!`
    );

    setTimeout(() => {
      window.location.href = `${window.location.origin}/index.html`;
    }, timeOut);
  });
}
