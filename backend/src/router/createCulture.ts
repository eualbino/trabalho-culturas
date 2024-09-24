import { TypeBoxTypeProvider, Type } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function createCulture(app: FastifyInstance) {
  const createCultureSchema = Type.Object({
    name: Type.String(),
    escritor: Type.String(),
    regiao: Type.String(),
    tema: Type.String(),
    idioma: Type.String(),
    conteudo: Type.String(),
  });

  const createCultureResponseSchema = Type.Object({
    message: Type.String(),
  });

  app.withTypeProvider<TypeBoxTypeProvider>().post('/create-culture', {
    schema: {
      body: createCultureSchema,
      response: {
        201: createCultureResponseSchema,
      }
    }
  }, async (request, reply) => {
    const data = request.body;

    const culture = await prisma.culture.create({
      data,
    });

    return reply.status(201).send({ message: 'Culture created successfully' });
  });
}