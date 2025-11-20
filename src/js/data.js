const dadosLocalStorage = localStorage.getItem("jogadores");

export const jogadores = dadosLocalStorage ? JSON.parse(dadosLocalStorage) : [];
