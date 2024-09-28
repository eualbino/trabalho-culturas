import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getUniqueCulture(app: FastifyInstance){
  const cultureGetSchema = Type.Object({
    id: Type.Number(),
    escritor: Type.String(),
    tema: Type.String(),
  });

  app.withTypeProvider<TypeBoxTypeProvider>().get('/get-unique/:id', {
    schema: {
      response: {
        200: cultureGetSchema,
        404: Type.Object({
          error: Type.String()
        })
      },
      params: Type.Object({
        id: Type.Number(),
      }),
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: number }
    const culture = await prisma.culture.findUnique({
      where: { id: Number(id) }
    })

    if (!culture) {
      return reply.status(404).send({ error: "Erro ao encontrar cultura!" });
    }

    return reply.send(culture);
  })
}