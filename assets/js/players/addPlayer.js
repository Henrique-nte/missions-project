import { jogadores } from "../data/data.js";
import { salvarJogadores } from "../storage/salvarJogadores.js";
import { timeOut } from "../timeOut/timeOut.js";
import { showError, showSucces } from "../ui/mensagens.js";

export function addPlayer(nome, nivel) {
  if (jogadores.some((j) => j.nome === nome)) {
    showError("Jogador já existe!!");
    return;
  }

  let pontos =
    (nivel === "senior" && 500) ||
    (nivel === "pleno" && 250) ||
    (nivel === "junior" && 50);

  const novoPlayer = {
    nome,
    nivel,
    pontos,
    missoes: [],
  };

  jogadores.push(novoPlayer);
  salvarJogadores();

  showSucces(`Jogador "${novoPlayer.nome}" adicionado com sucesso!`);

  setTimeout(() => {
    window.location.href = "/missions-project/ranking.html";
  }, timeOut);
}
