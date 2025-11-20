const dadosLocalStorage = localStorage.getItem("jogadores");

export const jogadores = dadosLocalStorage
  ? JSON.parse(dadosLocalStorage)
  : [
      {
        nome: "Jogador Exemplo",
        nivel: "pleno",
        pontos: 200,
        missoes: [
          {
            nome: "Ajudar o aldeão",
            dificuldade: "Fácil",
            tempo: "10 min",
            pontos: 100,
            status: "pendente",
          },
        ],
      },
    ];
