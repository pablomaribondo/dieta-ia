import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

import { CreateNutritionController } from './controllers/CreateNutritionController';

export async function routes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  app.get('/health-check', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ok: true });
  });

  app.get('/test', (request: FastifyRequest, reply: FastifyReply) => {
    const mockResponseText =
      '```json\n{\n  "nome": "Matheus",\n  "sexo": "Masculino",\n  "idade": 28,\n  "altura": 1.80,\n  "peso": 74,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Café da manhã",\n      "alimentos": [\n        "2 fatias de pão integral",\n        "2 ovos mexidos",\n        "1 banana",\n        "1 copo de leite desnatado"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manhã",\n        "alimentos": [\n        "1 iogurte grego com granola"\n      ]\n    },\n    {\n      "horario": "12:00",\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xícara de arroz integral",\n        "1 xícara de brócolis cozido",\n        "Salada verde a vontade"\n      ]\n    },\n    {\n      "horario": "15:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "1 batata doce média",\n        "1 scoop de whey protein"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe grelhado",\n        "1 xícara de batata doce cozida",\n        "1 xícara de espinafre cozido",\n        "Salada verde a vontade"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche antes de dormir",\n        "alimentos": [\n        "1 scoop de caseína"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey Protein",\n    "Creatina",\n    "BCAA",\n    "Glutamina",\n    "Multivitamínico"\n  ]\n}\n```';

    try {
      // extract JSON
      const jsonString = mockResponseText
        .replace(/```\w*\n/g, '')
        .replace(/\n```/g, '')
        .trim(); // remove markdown format

      const jsonObject = JSON.parse(jsonString);
      return reply.send({ data: jsonObject });
    } catch (error) {
      console.log(error);
    }
    reply.send({ ok: true });
  });

  app.post(
    '/create-nutrition',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
