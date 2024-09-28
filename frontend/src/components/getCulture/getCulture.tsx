"use client"
import { getAllCulture } from "@/data/culture-data"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import EditCulture from "../buttonsCulture/editCulture"
import DeleteCulture from "../buttonsCulture/deleteCulture"

export default function GetCulture({q}: {q: string}){
  const cultureSchema = z.object({
    id: z.number(),
    uuid: z.union([z.string(), z.null()]),
    name: z.string(),
    escritor: z.string(),
    regiao: z.string(),
    tema: z.string(),
    idioma: z.string(),
    conteudo: z.string(),
  })

  type Culture = z.infer<typeof cultureSchema>

  const { data: getCultures = [] } = useQuery<Culture[]>({
    queryKey: ["cultureUpdate", q],
    queryFn: () => getAllCulture(q),
    refetchOnWindowFocus: false,
  })

  return(
    <div className="flex flex-col justify-center items-start gap-20">
      {getCultures.length === 0 ? (
        <div><h1>Nenhum conteúdo cadastrado</h1></div>
      ) : (
        getCultures.map((culturas: Culture) => (
          <div key={culturas.uuid} className="flex flex-col gap-4 max-w-[40rem] w-[40rem] xl:w-auto xl:pl-5 xl:pr-5">
            <h1 className="font-semibold text-[28px]">{culturas.tema}</h1>
            <div>
              <p className="text-[#5f5f5fcf]">por {culturas.escritor}</p>
              <p className="capitalize text-[#5f5f5fcf]">{culturas.regiao} - {culturas.name} - {culturas.idioma}</p>
            </div>
            <p className="max-w-[100%] text-ellipsis overflow-hidden">{culturas.conteudo}</p>
            <div className="mt-6 mb-6">
              <div className="flex justify-end gap-4 mb-2">
                <EditCulture id={culturas.id} />
                <DeleteCulture id={culturas.id} />
              </div>
              <hr className="border-3 border-black" />
            </div>
          </div>
        ))
      )}
    </div>
  )
}