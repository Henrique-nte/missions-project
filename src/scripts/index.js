const missoes = [
  {
    nome: "Resgatar o aldeão",
    dificuldade: "Fácil",
    tempo: "10 min",
    pontos: "50",
    status: "Concluída",
  },
  {
    nome: "Caçar lobos na floresta",
    dificuldade: "Média",
    tempo: "25 min",
    pontos: "120",
    status: "Pendente",
  },
  {
    nome: "Derrotar o dragão da montanha",
    dificuldade: "Difícil",
    tempo: "60 min",
    pontos: "300",
    status: "Concluída",
  },
  {
    nome: "Explorar as ruínas antigas",
    dificuldade: "Difícil",
    tempo: "45 min",
    pontos: "200",
    status: "Concluída",
  },
  {
    nome: "Investigar o templo abandonado",
    dificuldade: "Difícil",
    tempo: "55 min",
    pontos: "250",
    status: "Pendente",
  },
  {
    nome: "Proteger as muralhas da vila",
    dificuldade: "Média",
    tempo: "30 min",
    pontos: "150",
    status: "Pendente",
  },
  {
    nome: "Ajudar o ferreiro a forjar armas",
    dificuldade: "Fácil",
    tempo: "20 min",
    pontos: "80",
    status: "Concluída",
  },
  {
    nome: "Mapear a floresta proibida",
    dificuldade: "Difícil",
    tempo: "50 min",
    pontos: "230",
    status: "Pendente",
  },
  {
    nome: "Acompanhar a caravana mercante",
    dificuldade: "Média",
    tempo: "35 min",
    pontos: "140",
    status: "Pendente",
  },
  {
    nome: "Coletar cristais na caverna",
    dificuldade: "Média",
    tempo: "28 min",
    pontos: "130",
    status: "Concluída",
  },
  {
    nome: "Reconstruir a ponte quebrada",
    dificuldade: "Fácil",
    tempo: "18 min",
    pontos: "90",
    status: "Pendente",
  },
  {
    nome: "Derrotar o chefe dos bandidos",
    dificuldade: "Difícil",
    tempo: "65 min",
    pontos: "320",
    status: "Pendente",
  },
];

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

module.exports = missoes;
