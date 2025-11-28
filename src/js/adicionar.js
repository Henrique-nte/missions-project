import {
  salvarJogadores,
  addPlayer,
  showError,
  showSucces,
} from "./functions.js";
import { jogadores } from "./data.js";

//Adicionar Jogadores
const inputNamePlayer = document.getElementById("namePlayer");
const selectLevelPlayer = document.getElementById("Nivel");
const btnAddPlayer = document.getElementById("addPlayer");

//Adicionar Missões
const btnAddMission = document.getElementById("addMission");
const selectDificult = document.getElementById("selectDificult");
const inputNameMission = document.getElementById("nomeMission");
const timeMinutes = document.getElementById("timeMinutes");
const pointsInput = document.getElementById("pointsInput");

btnAddPlayer.addEventListener("click", () => {
  if (inputNamePlayer.value.trim() === "") {
    return showError("Nome vazio!");
  }

  const valorNamePlayer = inputNamePlayer.value;
  const valorLevelPlayer = selectLevelPlayer.value;

  addPlayer(valorNamePlayer, valorLevelPlayer);
});

btnAddMission.addEventListener("click", () => {
  const nomePlayer = playerSelect.value.toLowerCase().trim();
  const nome = inputNameMission.value.trim();
  const dificuldade = selectDificult.value;
  const tempo = timeMinutes.value;
  const pontos = parseInt(pointsInput.value);
  const status = "pendente";

  const noPlayers = jogadores.length === 0;

  if (noPlayers) return showError("Erro: Adicione um jogador primeiro!");

  //Missão Ja existe
  const missionAlreadyExists =
    jogadores.findIndex((j) => {
      return j.missoes.some((m) => m.nome.includes(nome));
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
    return;
  }

  const indexJogador = jogadores.findIndex(
    (j) => j.nome.toLowerCase().trim() === nomePlayer
  );

  if (indexJogador) {
    console.log("Tem: ", indexJogador);
  }

  jogadores[indexJogador].missoes.push(novaMissao);

  showSucces(
    `Missão "${novaMissao.nome}" adicionada ao jogador "${jogadores[indexJogador].nome}"!`
  );
  salvarJogadores();

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 1000);
});

const playerSelect = document.getElementById("playerSelect");
playerSelect.innerHTML += jogadores
  .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
  .join("");
