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
  const nome = inputNameMission.value;

  if (nome === "") {
    console.log("Error");
    return;
  }

  const nomePlayer = playerSelect.value;
  const dificuldade = selectDificult.value;
  const tempo = timeMinutes.value;
  const pontos = pointsInput.value;
});
