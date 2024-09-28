import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function editCulture(app: FastifyInstance) {
  const editCultureSchema = Type.Object({
    name: Type.String(),
    escritor: Type.String(),
    regiao: Type.String(),
    tema: Type.String(),
    idioma: Type.String(),
    conteudo: Type.String(),
  })

  const editCultureResponseSchema = Type.Object({
    message: Type.String()
  })

  type EditCultureSchema = Static<typeof editCultureSchema>;

  app.withTypeProvider<TypeBoxTypeProvider>().put(`/edit-culture/:id`, {
    schema: {
      body: editCultureSchema,
      response: {
        200: editCultureResponseSchema,
      },
      params: Type.Object({
        id: Type.Number(),
      }),
    }
  }, async (request, reply) => {
    const dataBody = request.body as EditCultureSchema
    const { id } = request.params as { id: number }
    await prisma.culture.update({
      where: { id: Number(id) },
      data: {
        name: dataBody.name,
        escritor: dataBody.escritor,
        regiao: dataBody.regiao,
        tema: dataBody.tema,
        idioma: dataBody.idioma,
        conteudo: dataBody.conteudo,
      }
    })

    return reply.status(200).send({ message: "Alteração realizada com sucesso!" });
  })
}