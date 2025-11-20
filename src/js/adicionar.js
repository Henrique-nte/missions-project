import { jogadores } from "./data.js";

const playerSelect = document.getElementById("playerSelect");
playerSelect.innerHTML += jogadores
  .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
  .join("");

//Adicionar Jogadores
const inputNamePlayer = document.getElementById("namePlayer");
const selectLevelPlayer = document.getElementById("Nivel");
const btnAddPlayer = document.getElementById("addPlayer");

function addPlayer(nome, nivel) {
  if (jogadores.some((j) => j.nome === nome)) {
    console.log("Jogador já existe!");
    return;
  }

  let pontos =
    (nivel === "senior" && 350) ||
    (nivel === "pleno" && 200) ||
    (nivel === "junior" && 100);

  const novoPlayer = {
    nome,
    nivel,
    pontos,
    missoes: [],
  };

  jogadores.push(novoPlayer);
  console.log(`Jogador: ${novoPlayer.nome} adicionado com sucesso!`);
  console.log(jogadores);
}

btnAddPlayer.addEventListener("click", () => {
  if (inputNamePlayer.value === "") {
    return console.log("Nome vazio!");
  }

  const valorNamePlayer = inputNamePlayer.value;
  const valorLevelPlayer = selectLevelPlayer.value;

  addPlayer(valorNamePlayer, valorLevelPlayer);
});


//Adicionar Missões
const btnAddMission = document.getElementById("addMission");
const selectDificult = document.getElementById("selectDificult");
const inputNameMission = document.getElementById("nomeMission");
const timeMinutes = document.getElementById("timeMinutes");
const pointsInput = document.getElementById("pointsInput");

btnAddMission.addEventListener("click", () => {
  const nomePlayer = playerSelect.value;

  if (nomePlayer === "") {
    //Adicionar para todos
    return;
  }

  const nome = inputNameMission.value;
  const dificuldade = selectDificult.value;
  const tempo = timeMinutes.value;
  const pontos = parseInt(pointsInput.value);
  const status = "pendente";

  const novaMissao = {
    nome,
    dificuldade,
    tempo,
    pontos,
    status,
  };

  const indexJogador = jogadores.findIndex((j) => j.nome === nomePlayer);

  jogadores[indexJogador].missoes.push(novaMissao);
  console.log(
    `Missão: ${novaMissao.nome} adicionada ao jogador ${jogadores[indexJogador].nome}!`
  );
  console.log(jogadores);
});
