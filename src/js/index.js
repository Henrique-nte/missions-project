import { jogadores } from "./data.js";

const inputPesquisa = document.querySelector("#pesquisa");
const selectDificuldades = document.querySelector("#select-dificuldades");
const tabelaMissoes = document.querySelector("#tabela-missoes");
const selectStatus = document.querySelector("#select-status");
const selectPlayer = document.querySelector("#select-player");

// console.log(selectPlayer);

//Listo os jogadores
selectPlayer.innerHTML += jogadores
  .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
  .join("");

function carregarMissoes(jogadores) {
  tabelaMissoes.innerHTML = jogadores
    .flatMap((j) =>
      j.missoes.map((m) => {
        const botao =
          m.status.toLowerCase() === "pendente"
            ? `<button class="btn-concluir">Concluir</button>`
            : `<button class="btn-deletar">Deletar</button>`;

        if (selectPlayer.value === "") {
          return `
          <tr>
            <td class="nome-missao">${m.nome}</td>
            <td class="dificuldade-${m.dificuldade.toLowerCase()}">${
            m.dificuldade
          }</td>
            <td>${m.tempo}</td>
            <td>${m.pontos}</td>
            <td>${m.status}</td>
          </tr>
        `;
        }

        return `
          <tr>
            <td class="nome-missao">${m.nome}</td>
            <td class="dificuldade-${m.dificuldade.toLowerCase()}">${
          m.dificuldade
        }</td>
            <td>${m.tempo}</td>
            <td>${m.pontos}</td>
            <td>${m.status}</td>
            <td>${botao}</td>
          </tr>
        `;
      })
    )
    .join("");
}

function filtrarArray({
  jogador = "",
  texto = "",
  dificuldade = "",
  status = "",
}) {
  const normalizar = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  const jgd = normalizar(jogador);
  const txt = normalizar(texto);
  const dif = normalizar(dificuldade);
  const sts = normalizar(status);

  return jogadores
    .map((j) => {
      const nomeJogador = normalizar(j.nome);

      const missoesFiltradas = j.missoes.filter((m) => {
        const nome = normalizar(m.nome);
        const difMissao = normalizar(m.dificuldade);
        const stsMissao = normalizar(m.status);

        const combinaJogador = !jgd || nomeJogador.includes(jgd);
        const combinaTexto = !txt || nome.includes(txt);
        const combinaDif = !dif || difMissao === dif;
        const combinaSts = !sts || stsMissao === sts;

        return combinaJogador && combinaTexto && combinaDif && combinaSts;
      });

      if (missoesFiltradas.length > 0) {
        return {
          jogador: j.nome,
          missoes: missoesFiltradas,
        };
      }

      return null;
    })
    .filter((item) => item !== null);
}

function filtrarMissoes() {
  const jogador = selectPlayer.value;
  const texto = inputPesquisa.value;
  const dificuldade = selectDificuldades.value;
  const status = selectStatus.value;

  const filtradas = filtrarArray({ jogador, texto, dificuldade, status });

  carregarMissoes(filtradas);
}

inputPesquisa.addEventListener("input", () => {
  selectDificuldades.value = "";
  selectStatus.value = "";
  selectPlayer.value = "";
  filtrarMissoes();
});

selectDificuldades.addEventListener("change", () => {
  inputPesquisa.value = "";
  selectStatus.value = "";
  selectPlayer.value = "";
  filtrarMissoes();
});

selectStatus.addEventListener("change", () => {
  inputPesquisa.value = "";
  selectDificuldades.value = "";
  selectPlayer.value = "";
  filtrarMissoes();
});

selectPlayer.addEventListener("change", () => {
  inputPesquisa.value = "";
  selectDificuldades.value = "";
  selectStatus.value = "";
  filtrarMissoes();
});

document.addEventListener("DOMContentLoaded", () => carregarMissoes(jogadores));
