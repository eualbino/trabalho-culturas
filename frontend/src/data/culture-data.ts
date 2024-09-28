import { api } from "@/lib/api";

interface PostCultureSchema{
  name: string;
  escritor: string;
  regiao: string;
  tema: string;
  idioma: string;
  conteudo: string;
}

export async function createCulture(data: PostCultureSchema) {
  try {
    await api.post("/create-culture", data)
  } catch (error) {
    console.log(error)
  }
}

export async function getAllCulture(q?: string) {
  try {
    const response = await api.get("/get-culture", {
      params: { q }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUniqueCulture(id: number) {
  try{
    const response = await api.get(`/get-unique/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteCulture(id: number){
  try {
    await api.delete(`/delete-culture/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export async function editCulture(id: number, data: PostCultureSchema) {
  try {
    const response = await api.put(`/edit-culture/${id}`, data)
    return response.data;
  } catch (error) {
    console.log(error)
  }
}