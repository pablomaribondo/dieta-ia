export const mockNutritionResponse = {
  data: {
    name: 'Jorge Amado',
    gender: 'Masculino',
    age: 26,
    height: 1.8,
    weight: 90,
    objective: 'Emagrecer',
    diet_plan: [
      {
        time: '08:00',
        name: 'Cafe da Manha',
        meals: [
          '1 fatia de pao integral',
          '1 ovo cozido',
          '1/2 papaia',
          '1 copo de leite desnatado',
        ],
      },
      {
        time: '10:00',
        name: 'Lanche da Manha',
        meals: [
          '1 iogurte grego natural desnatado com 1 colher de sopa de granola',
        ],
      },
      {
        time: '12:00',
        name: 'Almoco',
        meals: [
          '150g de frango grelhado',
          '1 xicara de arroz integral',
          'Salada verde com tomate, alface e cenoura ralada',
        ],
      },
      {
        time: '15:00',
        name: 'Lanche da Tarde',
        meals: [
          '1 iogurte grego natural desnatado com 1 colher de sopa de chia',
        ],
      },
      {
        time: '19:00',
        name: 'Jantar',
        meals: [
          '150g de peixe grelhado',
          '1 xicara de brócolis cozido no vapor',
          'Salada verde com tomate, alface e cenoura ralada',
        ],
      },
      {
        time: '21:00',
        name: 'Lanche da Noite',
        meals: ['1 pote de iogurte natural desnatado'],
      },
    ],
    supplements: ['Whey Protein', 'Creatina', 'Glutamina'],
  },
};
