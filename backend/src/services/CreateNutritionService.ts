import { GoogleGenerativeAI } from '@google/generative-ai';

import type { CreateNutritionProps } from '../controllers/CreateNutritionController';

class CreateNutritionService {
  async execute(data: CreateNutritionProps) {
    const { name, weight, height, age, gender, objective, level } = data;

    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const response = await model.generateContent(
        `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade "name" o nome da pessoa, propriedade "gender" com sexo, propriedade "age" com a idade, propriedade "height" com a altura, propriedade "weight" com o peso, propriedade "objective" com o objetivo atual, propriedade "diet_plan" com um array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade "time" com horário da refeição, propriedade "name" com nome e a propriedade "meals" com array contendo os alimentos dessa refeição e pode incluir uma propriedade "supplements" contendo um array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
      );

      console.log(JSON.stringify(response, null, 2));

      if (response?.response?.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string;

        // extract JSON - remove markdown format
        const jsonString = jsonText
          .replace(/```\w*\n/g, '')
          .replace(/\n```/g, '')
          .trim();

        const jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed create');
    }
  }
}

export { CreateNutritionService };
