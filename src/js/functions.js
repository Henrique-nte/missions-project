import { jogadores } from "./data.js";

const modal = document.getElementById("errorModal");
const selectPlayer = document.querySelector("#select-player");
const tabelaMissoes = document.querySelector("#tabela-missoes");

const inputPesquisa = document.querySelector("#pesquisa");

const selectDificuldades = document.querySelector("#select-dificuldades");

const selectStatus = document.querySelector("#select-status");

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

//Listo as missões na tela
export function carregarMissoes(jogadores) {
  const table = document.querySelector("table");
  let thead = table.querySelector("thead");
  if (!thead) {
    thead = document.createElement("thead");
    table.prepend(thead);
  }

  const existingTh = document.getElementById("acoes");
  existingTh && existingTh.remove();

  let headerRow = thead.querySelector("tr");
  if (!headerRow) {
    headerRow = document.createElement("tr");
    thead.appendChild(headerRow);
  }

  if (selectPlayer.value !== "" && !document.getElementById("acoes")) {
    const th = document.createElement("th");
    th.id = "acoes";
    th.textContent = "Ações";
    headerRow.appendChild(th);
  }

  // Filtra missões duplicadas
  const seen = new Set();

  tabelaMissoes.innerHTML = jogadores
    .flatMap((j) =>
      j.missoes
        .filter((m) => {
          const key = `${m.nome}|${m.dificuldade}|${m.tempo}|${m.pontos}|${m.status}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((m) => {
          const botao =
            m.status.toLowerCase() === "pendente"
              ? `<button class="btn-concluir">Concluir</button>`
              : `<button class="btn-deletar">Deletar</button>`;

          return `
            <tr>
              <td data-missao class="nome-missao">${m.nome}</td>
              <td class="dificuldade-${m.dificuldade.toLowerCase()}">${
            m.dificuldade
          }</td>
              <td>${m.tempo + " min"}</td>
              <td class="pontos">${m.pontos}</td>
              <td>${m.status}</td>
              ${selectPlayer.value !== "" ? `<td>${botao}</td>` : ""}
            </tr>
          `;
        })
    )
    .join("");
}

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
    window.location.href = "./ranking.html";
  }, 1000);
}

export function deleteMission() {
  const table = document.querySelector("table"); // ou tbody

  if (!table) return;

  table.addEventListener("click", (event) => {
    const btn = event.target.closest(".btn-deletar");
    if (!btn) return;

    const tr = btn.closest("tr");
    if (!tr) return;

    const nomePlayer = prepareString(selectPlayer.value);

    // Pega a missão corretamente
    const cellMission = tr.querySelector("[data-missao]");
    if (!cellMission) return;

    const nomeMission = prepareString(cellMission.textContent);

    // Acha o jogador certo
    const indexPlayer = jogadores.findIndex(
      (j) => prepareString(j.nome) === nomePlayer
    );

    if (indexPlayer === -1) return;

    // Acha a missão correta no jogador
    const indexMission = jogadores[indexPlayer].missoes.findIndex(
      (m) => prepareString(m.nome) === nomeMission
    );

    if (indexMission === -1) return;

    // Deleta a missão do array
    jogadores[indexPlayer].missoes.splice(indexMission, 1);

    salvarJogadores();

    showSucces(`Missão "${cellMission.textContent}" deletada com sucesso!`);

    // Remove a linha da tabela imediatamente — sem reload
    setTimeout(() => {
      tr.remove();
    }, 1000);
  });
}

export function filtrarMissoes() {
  const jogador = selectPlayer.value;
  const texto = inputPesquisa.value;
  const dificuldade = selectDificuldades.value;
  const status = selectStatus.value;

  const filtradas = filtrarArray({ jogador, texto, dificuldade, status });

  carregarMissoes(filtradas);
}

export function fixMission() {
  const table = document.querySelector("table");
  if (!table) return;

  table.addEventListener("click", (event) => {
    const btnCheck = event.target.closest(".btn-concluir");
    if (!btnCheck) return;

    const tr = btnCheck.closest("tr");
    if (!tr) return;
    const nomePlayer = prepareString(selectPlayer.value);
    const pontos = parseInt(tr.querySelector(".pontos").textContent);

    // Pega a missão corretamente
    const cellMission = tr.querySelector("[data-missao]");
    if (!cellMission) return;

    const nomeMission = prepareString(cellMission.textContent);

    // Índice do jogador certo
    const indexPlayer = jogadores.findIndex(
      (j) => prepareString(j.nome) === nomePlayer
    );

    if (indexPlayer === -1) return;

    // Agora sim: buscar a missão no jogador correto
    const indexMission = jogadores[indexPlayer].missoes.findIndex(
      (m) => prepareString(m.nome) === nomeMission
    );

    if (indexMission === -1) return;

    //Altera os dados
    jogadores[indexPlayer].missoes[indexMission].status = "Concluída";
    jogadores[indexPlayer].pontos += pontos;

    salvarJogadores();

    showSucces(`Missão "${cellMission.textContent}" marcada como concluída!`);

    setTimeout(() => {
      window.location.href = "./ranking.html";
    }, 1000);
  });
}

export function listarJogadores() {
  //Listo os jogadores
  selectPlayer.innerHTML += jogadores
    .map((j) => `<option value="${j.nome}">${j.nome}</option>`)
    .join("");
}

export function prepareString(str) {
  const normalizar = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  let produto = normalizar(str);
  produto = produto.trim();
  produto = produto.replace(/\s+/g, "");

  return produto;
}

export function salvarJogadores() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}

export function showError(msg) {
  modal.querySelector(".modal-error").textContent = msg;
  modal.classList.add("active");
  setTimeout(() => modal.classList.remove("active"), 1000);
}

export function showSucces(msg) {
  modal.querySelector(".modal-error").textContent = msg;
  modal.querySelector(".modal-error").style.color = "white";
  modal.classList.add("active");
  setTimeout(() => modal.classList.remove("active"), 1000);
}

export function eventoInputPesquisa() {
  inputPesquisa.addEventListener("input", () => {
    selectDificuldades.value = "";
    selectStatus.value = "";
    selectPlayer.value = "";
    filtrarMissoes();
  });
}

export function eventoSelectDifuldades() {
  selectDificuldades.addEventListener("change", () => {
    inputPesquisa.value = "";
    selectStatus.value = "";
    selectPlayer.value = "";
    filtrarMissoes();
  });
}

export function eventoSelectStatus() {
  selectStatus.addEventListener("change", () => {
    inputPesquisa.value = "";
    selectDificuldades.value = "";
    selectPlayer.value = "";
    filtrarMissoes();
  });
}

export function eventoSelectPlayer() {
  selectPlayer.addEventListener("change", () => {
    inputPesquisa.value = "";
    selectDificuldades.value = "";
    selectStatus.value = "";
    filtrarMissoes();

    fixMission();
    deleteMission();
  });
}
