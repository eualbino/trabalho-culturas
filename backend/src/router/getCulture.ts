import { TypeBoxTypeProvider, Type } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getCulture(app: FastifyInstance) {
  const cultureSchema = Type.Object({
    name: Type.String(),
    regiao: Type.String(),
    tema: Type.String(),
    idioma: Type.String(),
    conteudo: Type.String(),
  });

  app.withTypeProvider<TypeBoxTypeProvider>().get('/get-culture', {
    schema: {
      response: {
        200: Type.Array(cultureSchema),
      }
    }
  }, async (request, reply) => {
    const cultures = await prisma.culture.findMany();
    return reply.send(cultures);
  });
}