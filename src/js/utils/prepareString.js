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
