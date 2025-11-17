import { missoes } from "./missions.mjs";

const inputPesquisa = document.querySelector("#pesquisa");
const selectDificuldades = document.querySelector("#select-dificuldades");
const tabelaMissoes = document.querySelector("#tabela-missoes");
const selectStatus = document.querySelector("#select-status");

function carregarMissoes(array) {
  tabelaMissoes.innerHTML = array
    .map(
      (m) => `
      <tr>
        <td class="nome-missao">${m.nome}</td>
        <td class="dificuldade-${m.dificuldade}">${m.dificuldade}</td>
        <td>${m.tempo}</td>
        <td>${m.pontos}</td>
        <td>${m.status}</td>
      </tr>
    `
    )
    .join("");
}

function filtrarArray({ texto = "", dificuldade = "", status }) {
  const normalizar = (str) =>
    str
      .toLowerCase()
      .normalize("NFD") //Quebra acentos
      .replace(/\p{Diacritic}/gu, ""); //Remove acentos

  const txt = normalizar(texto);
  const dif = normalizar(dificuldade);
  const sts = normalizar(status);

  return missoes.filter((m) => {
    const nome = normalizar(m.nome);
    const difMissao = normalizar(m.dificuldade);
    const stsMissao = normalizar(m.status);

    const combinaTexto = !txt || nome.includes(txt);
    const combinaDif = !dif || difMissao === dif;
    const combinaSts = !sts || stsMissao === sts;

    return combinaTexto && combinaDif && combinaSts;
  });
}

function filtrarMissoes() {
  const texto = inputPesquisa.value;
  const dificuldade = selectDificuldades.value;
  const status = selectStatus.value;

  const filtradas = filtrarArray({ texto, dificuldade, status });

  carregarMissoes(filtradas);
}

inputPesquisa.addEventListener("input", () => {
  selectDificuldades.value = "";
  selectStatus.value = "";
  filtrarMissoes();
});

selectDificuldades.addEventListener("change", () => {
  inputPesquisa.value = "";
  selectStatus.value = "";
  filtrarMissoes();
});

selectStatus.addEventListener("change", () => {
  inputPesquisa.value = "";
  selectDificuldades.value = "";
  filtrarMissoes();
});

document.addEventListener("DOMContentLoaded", () => carregarMissoes(missoes));