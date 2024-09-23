"use client"
import { getAllCulture } from "@/data/culture-data"
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

  const [response, setResponse] = useState<any>([])

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCulture()
      if(data !== undefined) setResponse(data)
    }
    fetchData()
  }, [])
  
  return (
    <div className="bg-zinc-600">
      {response.length === 0 ? (<div><h1>Nenhum conteúdo cadastrado</h1></div>) : response.slice(0, 2).map((item: Culture) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.regiao}</p>
            <p>{item.tema}</p>
            <p>{item.idioma}</p>
            <p>{item.conteudo}</p>
          </div>
        )
      })}
    </div>
  )
}