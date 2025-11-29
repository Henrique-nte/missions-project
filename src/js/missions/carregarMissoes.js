const selectPlayer = document.querySelector("#select-player");
const tabelaMissoes = document.querySelector("#tabela-missoes");

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
