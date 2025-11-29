import { addPlayer } from "./players/addPlayer.js";
import { initAddMission } from "./missions/addMission.js";
import { showError } from "./ui/mensagens.js";
import { listarJogadores } from "./players/listarJogadores.js";

const inputNamePlayer = document.getElementById("namePlayer");
const selectLevelPlayer = document.getElementById("Nivel");
const btnAddPlayer = document.getElementById("addPlayer");

const btnAddMission = document.getElementById("addMission");
const playerSelect = document.getElementById("playerSelect");
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

listarJogadores();

initAddMission(
  btnAddMission,
  playerSelect,
  inputNameMission,
  selectDificult,
  timeMinutes,
  pointsInput
);
