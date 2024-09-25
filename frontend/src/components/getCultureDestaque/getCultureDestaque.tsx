"use client"
import { getAllCulture } from "@/data/culture-data"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { z } from "zod"

export default function GetCultureDestaque() {

  const cultureSchema = z.object({
    id: z.number(),
    name: z.string(),
    regiao: z.string(),
    tema: z.string(),
    idioma: z.string(),
    conteudo: z.string(),
  })

  type Culture = z.infer<typeof cultureSchema>

  const { data: getCulture = [] } = useQuery<Culture[]>({
    queryKey: ["culture"],
    queryFn: () => getAllCulture(),
    refetchOnWindowFocus: false,
  })
  
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">DESTAQUES</h1>
      <div className="flex flex-col justify-center gap-8">
      {getCulture.length === 0 ? (<div><h1>Nenhum conteúdo cadastrado</h1></div>) : getCulture.slice(0, 2).map((item: Culture) => {
        return (
          <div key={item.id} className=" flex flex-col items-center">
            <h1 className="text-4xl font-semibold">{item.name}</h1>
            <div className="bg-zinc-100 p-4 flex flex-col items-center rounded-2xl">
            <p className="font-semibold text-xl">{item.regiao}</p>
            <p>{item.tema}</p>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}