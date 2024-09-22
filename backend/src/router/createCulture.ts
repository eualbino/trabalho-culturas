import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import {z} from 'zod';
import { prisma } from "../lib/prisma";

export async function createCulture(app: FastifyInstance) {
  const createCultureSchema = z.object({
    name: z.string(),
    regiao: z.string(),
    tema: z.string(),
    idioma: z.string(),
    conteudo: z.string(),
  });

  app.withTypeProvider<TypeBoxTypeProvider>().post('createCulture', {
    schema: {
      body: {
        summary: 'Create a new culture',
        body: createCultureSchema,
        response: {
          201: z.object({
            message: z.literal('Culture created successfully')
          }),
        }
      }
    }
  }, async (request, reply) => {
    const data = request.body;

    const parsedData = createCultureSchema.safeParse(data);
    if (!parsedData.success) {
      reply.status(400).send({ error: 'Invalid request body' });
      return;
    }

    const cultureData = parsedData.data;

    const culture = prisma.culture.create({
      data: cultureData,
    })

    return reply.status(201).send({ message: 'Culture created successfully' });
  })
}