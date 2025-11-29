import { jogadores } from "../data/data.js";
const playerSelect = document.getElementById("playerSelect");
const selectPlayer = document.getElementById("select-player");
export function listarJogadores() {
  //Listo os jogadores
  selectPlayer
    ? (selectPlayer.innerHTML += jogadores
        .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
        .join("")) //Listo os jogadores
    : (playerSelect.innerHTML += jogadores
        .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
        .join(""));
}
