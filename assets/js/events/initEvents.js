import { eventoInputPesquisa } from "./pesquisa.js";
import { eventoSelectDifuldades } from "./dificuldade.js";
import { eventoSelectStatus } from "./status.js";
import { eventoSelectPlayer } from "./selectPlayer.js";

export function initEvents() {
  eventoInputPesquisa();
  eventoSelectDifuldades();
  eventoSelectStatus();
  eventoSelectPlayer();
}
