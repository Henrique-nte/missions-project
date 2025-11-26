const dadosLocalStorage = localStorage.getItem("jogadores");

export const jogadores = dadosLocalStorage
  ? JSON.parse(dadosLocalStorage)
  : [
      {
        nome: "Artemis",
        nivel: "junior",
        pontos: 50,
        missoes: [
          {
            nome: "Coletar ervas",
            dificuldade: "Fácil",
            tempo: 5,
            pontos: 20,
            status: "pendente",
          },
        ],
      },
    ];

// export const jogadores = dadosLocalStorage
//   ? JSON.parse(dadosLocalStorage)
//   : [
//       {
//         nome: "Artemis",
//         nivel: "junior",
//         pontos: 50,
//         missoes: [
//           {
//             nome: "Coletar ervas",
//             dificuldade: "Fácil",
//             tempo: 5,
//             pontos: 20,
//             status: "pendente",
//           },
//           {
//             nome: "Entregar mensagem",
//             dificuldade: "Médio",
//             tempo: 10,
//             pontos: 30,
//             status: "pendente",
//           },
//         ],
//       },
//       {
//         nome: "Darius",
//         nivel: "pleno",
//         pontos: 250,
//         missoes: [
//           {
//             nome: "Ajudar o aldeão",
//             dificuldade: "Fácil",
//             tempo: 10,
//             pontos: 40,
//             status: "pendente",
//           },
//           {
//             nome: "Proteger a caravana",
//             dificuldade: "Difícil",
//             tempo: 30,
//             pontos: 120,
//             status: "pendente",
//           },
//         ],
//       },
//       {
//         nome: "Selene",
//         nivel: "senior",
//         pontos: 500,
//         missoes: [
//           {
//             nome: "Caçar a fera da floresta",
//             dificuldade: "Difícil",
//             tempo: 45,
//             pontos: 200,
//             status: "pendente",
//           },
//           {
//             nome: "Reconstruir o santuário",
//             dificuldade: "Médio",
//             tempo: 25,
//             pontos: 150,
//             status: "pendente",
//           },
//         ],
//       },
//     ];
