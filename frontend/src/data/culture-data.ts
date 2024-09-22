import { api } from "@/lib/api";

interface PostCultureSchema{
  name: string;
  regiao: string;
  tema: string;
  idioma: string;
  conteudo: string;
}

export async function createCulture(data: PostCultureSchema) {
  try {
    await api.post("/createCulture", data)
  } catch (error) {
    console.log(error)
  }
}

export async function getAllCulture(){
  try {
    const response = await api.get("/getCulture")
    return response
  } catch (error) {
    console.log(error)
  }
}