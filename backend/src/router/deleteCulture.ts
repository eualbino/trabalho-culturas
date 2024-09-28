import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function deleteCulture(app: FastifyInstance) {
  app.withTypeProvider<TypeBoxTypeProvider>().delete('/delete-culture/:id', async (request, reply) => {
    const { id } = request.params as { id: number }
    const cultureList = prisma.culture.findUnique({
      where: { id: Number(id)}
    });

    if (!cultureList) {
      return reply.status(404).send({ error: "Erro ao encontrar cultura!" });
    }

    await prisma.culture.delete({
      where: { id: Number(id)}
    })

    return reply.status(200).send({ message: "Deletada com sucesso!" });
  })
}