import { jogadores } from "./data.js";

function salvarJogadores() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}

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
  salvarJogadores();
}

function showError(msg) {
  modal.querySelector(".modal-error").textContent = msg;
  modal.classList.add("active");
  setTimeout(() => modal.classList.remove("active"), 1000);
}

function showSucces(msg) {
  modal.querySelector(".modal-error").textContent = msg;
  modal.querySelector(".modal-error").style.color = "white";
  modal.classList.add("active");
  setTimeout(() => modal.classList.remove("active"), 1000);
}

//Adicionar Jogadores
const inputNamePlayer = document.getElementById("namePlayer");
const selectLevelPlayer = document.getElementById("Nivel");
const btnAddPlayer = document.getElementById("addPlayer");

btnAddPlayer.addEventListener("click", () => {
  if (inputNamePlayer.value === "") {
    return showError("Nome vazio!");
  }

  const valorNamePlayer = inputNamePlayer.value;
  const valorLevelPlayer = selectLevelPlayer.value;

  addPlayer(valorNamePlayer, valorLevelPlayer);
  showSucces("Jogador adicionado com sucesso!");
});

//Adicionar Missões
const btnAddMission = document.getElementById("addMission");
const selectDificult = document.getElementById("selectDificult");
const inputNameMission = document.getElementById("nomeMission");
const timeMinutes = document.getElementById("timeMinutes");
const pointsInput = document.getElementById("pointsInput");
const modal = document.getElementById("errorModal");

btnAddMission.addEventListener("click", () => {
  const nomePlayer = playerSelect.value;
  const nome = inputNameMission.value;
  const dificuldade = selectDificult.value;
  const tempo = timeMinutes.value;
  const pontos = parseInt(pointsInput.value);
  const status = "pendente";

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

  const indexJogador = jogadores.findIndex((j) => j.nome === nomePlayer);

  jogadores[indexJogador].missoes.push(novaMissao);
  console.log(
    `Missão: ${novaMissao.nome} adicionada ao jogador ${jogadores[indexJogador].nome}!`
  );
  salvarJogadores();
  console.log(jogadores);
});

const playerSelect = document.getElementById("playerSelect");
playerSelect.innerHTML += jogadores
  .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
  .join("");
