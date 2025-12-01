import { jogadores } from "../data/data.js";

export function filtrarArray({
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
