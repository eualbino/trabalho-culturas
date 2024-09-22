import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import z from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getCulture(app: FastifyInstance) {

  const createCultureSchema = z.object({
    name: z.string(),
    regiao: z.string(),
    tema: z.string(),
    idioma: z.string(),
    conteudo: z.string(),
  });

  app.withTypeProvider<TypeBoxTypeProvider>().get('/getCulture', {
    schema: {
      summary: 'Get all cultures',
      response: {
        200: z.array(createCultureSchema),
      }
    }
  }, async (request, reply) => {
    const cultures = await prisma.culture.findMany();
    return reply.send(cultures);
  })
}