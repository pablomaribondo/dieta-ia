import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

import { CreateNutritionController } from './controllers/CreateNutritionController';
import { mockNutritionResponse } from '../tests/mock';

export async function routes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  app.get('/health-check', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ok: true });
  });

  app.post('/test', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send(mockNutritionResponse);
  });

  app.post(
    '/create-nutrition',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
