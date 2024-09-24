import { TypeBoxTypeProvider, Type } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getCulture(app: FastifyInstance) {
  const cultureGetSchema = Type.Object({
    id: Type.Number(),
    name: Type.String(),
    escritor: Type.String(),
    regiao: Type.String(),
    tema: Type.String(),
    idioma: Type.String(),
    conteudo: Type.String(),
  });

  app.withTypeProvider<TypeBoxTypeProvider>().get('/get-culture', {
    schema: {
      response: {
        200: Type.Array(cultureGetSchema),
      }
    }
  }, async (request, reply) => {
    const cultures = await prisma.culture.findMany();
    return reply.send(cultures);
  });
}