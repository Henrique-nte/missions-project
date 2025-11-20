import { jogadores } from "./data.js";

const inputPesquisa = document.querySelector("#pesquisa");
const selectDificuldades = document.querySelector("#select-dificuldades");
const tabelaMissoes = document.querySelector("#tabela-missoes");
const selectStatus = document.querySelector("#select-status");
const selectPlayer = document.querySelector("#select-player");

function salvarJogadores() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}

const modal = document.getElementById("errorModal");

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

if (jogadores.length === 0) {
  document.body.innerHTML += `
  <div class="flex-span">
  <span class="no-player">No missions yet</span>
  <div/>
  `;
}

//Listo os jogadores
selectPlayer.innerHTML += jogadores
  .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
  .join("");

function carregarMissoes(jogadores) {
  const table = document.querySelector("table");
  let thead = table.querySelector("thead");
  if (!thead) {
    thead = document.createElement("thead");
    table.prepend(thead);
  }

  // Remove o <th> "Ações" se existir
  const existingTh = document.getElementById("acoes");
  existingTh && existingTh.remove();

  // Cria linha do cabeçalho se não existir
  let headerRow = thead.querySelector("tr");
  if (!headerRow) {
    headerRow = document.createElement("tr");
    thead.appendChild(headerRow);
  }

  // Adiciona <th> "Ações" apenas se houver jogador selecionado
  if (selectPlayer.value !== "" && !document.getElementById("acoes")) {
    const th = document.createElement("th");
    th.id = "acoes";
    th.textContent = "Ações";
    headerRow.appendChild(th);
  }

  // Monta as linhas da tabela
  tabelaMissoes.innerHTML = jogadores
    .flatMap((j) =>
      j.missoes.map((m) => {
        const botao =
          m.status.toLowerCase() === "pendente"
            ? `<button class="btn-concluir">Concluir</button>`
            : `<button class="btn-deletar">Deletar</button>`;

        return `
          <tr>
            <td class="nome-missao">${m.nome}</td>
            <td class="dificuldade-${m.dificuldade.toLowerCase()}">${
          m.dificuldade
        }</td>
            <td>${m.tempo}</td>
            <td>${m.pontos}</td>
            <td>${m.status}</td>
            ${selectPlayer.value !== "" ? `<td>${botao}</td>` : ""}
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

  fixMissiom();
});

function fixMissiom() {
  //Concluir missão
  const btnCheck = document.querySelector(".btn-concluir");
  if (!btnCheck) return;

  btnCheck.addEventListener("click", () => {
    const nomePlayer = prepareString(selectPlayer.value);
    const tr = btnCheck.closest("tr");
    const nomeMission = tr.querySelector("td").textContent;

    const nome = prepareString(nomeMission);

    const indexPlayer = jogadores.findIndex(
      (j) => prepareString(j.nome) === nomePlayer
    );

    const indexMission = jogadores.findIndex((j) =>
      j.missoes.filter((m) => prepareString(m.nome) === nome)
    );

    jogadores[indexPlayer].missoes[indexMission].status = "Concluída";
    showSucces("Missão Marcada como concluída!");
    salvarJogadores();
  });
}

function prepareString(str) {
  const normalizar = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  let nome = normalizar(str);
  nome = nome.trim();
  nome = nome.replace(/\s+/g, "");

  return nome;
}

document.addEventListener("DOMContentLoaded", () => carregarMissoes(jogadores));
