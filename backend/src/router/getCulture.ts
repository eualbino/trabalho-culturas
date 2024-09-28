import { TypeBoxTypeProvider, Type } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getCulture(app: FastifyInstance) {
  const cultureGetSchema = Type.Object({
    id: Type.Number(),
    uuid: Type.Union([Type.String(), Type.Null()]),
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
    const { q } = request.query as { q?: string };
    const cultures = q
      ? await prisma.culture.findMany({
        where: {
          OR: [
            { tema: { contains: q } },
            { regiao: { contains: q } },
            { idioma: { contains: q } },
            { name: { contains: q } }
          ]
        },
      })
      : await prisma.culture.findMany();
    return reply.send(cultures);
  });
}