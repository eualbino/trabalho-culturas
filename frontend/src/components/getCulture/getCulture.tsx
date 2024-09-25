"use client"
import { getAllCulture } from "@/data/culture-data"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export default function GetCulture(){
  const cultureSchema = z.object({
    id: z.number(),
    name: z.string(),
    escritor: z.string(),
    regiao: z.string(),
    tema: z.string(),
    idioma: z.string(),
    conteudo: z.string(),
  })
  type Culture = z.infer<typeof cultureSchema>

  const { data: getCulture = [] } = useQuery<Culture[]>({
    queryKey: ["culture"],
    queryFn: getAllCulture,
    refetchOnWindowFocus: false,
  })

  return(
    <div className="flex flex-col justify-center items-start gap-20">
      {getCulture.length === 0 ? (<div><h1>Nenhum conteúdo cadastrado</h1></div>) : getCulture.map((item: Culture) => (
        <div key={item.id} className="flex flex-col gap-4 max-w-[40rem] w-[40rem]">
          <h1 className="font-semibold text-[28px]">{item.tema}</h1>
          <div>
          <p className="text-[#5f5f5fcf]">por{" "}{item.escritor}</p>
          <p className="capitalize text-[#5f5f5fcf]">{item.regiao}{" - "}{item.name}{" - "}{item.idioma}</p>
          </div>
          <p className="max-w-[100%] text-ellipsis overflow-hidden">{item.conteudo}</p>
          <div className="mt-6 mb-6">
          <div className="flex justify-end gap-4 mb-2"><button className="bg-blue-400 p-2 rounded-md font-semibold">Editar</button><button className="bg-red-400 p-2 rounded-md font-semibold">Remover</button></div>
          <hr className=" border-3 border-black"/>
          </div>
        </div>
      ))}
    </div>
  )
}