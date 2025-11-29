import { filtrarMissoes } from "../missions/filtrarMissoes.js";
import { fixMission } from "../missions/fixMission.js";
import { deleteMission } from "../missions/deleteMission.js";

const selectPlayer = document.querySelector("#select-player");
const inputPesquisa = document.querySelector("#pesquisa");
const selectDificuldades = document.querySelector("#select-dificuldades");
const selectStatus = document.querySelector("#select-status");

export function eventoSelectPlayer() {
  if (!selectPlayer) return;

  selectPlayer.addEventListener("change", () => {
    inputPesquisa.value = "";
    selectDificuldades.value = "";
    selectStatus.value = "";
    filtrarMissoes();

    fixMission();
    deleteMission();
  });
}
