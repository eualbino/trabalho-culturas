"use client"
import { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCulture } from "@/data/culture-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formInsertCulturaSchema = z.object({
  name: z.string().min(1, { 
    message: "Insira o nome do país!"
  }),
  escritor: z.string().min(1, { 
    message: "Insira o nome do escritor!"
  }),
  regiao: z.string().min(1, { 
    message: "Insira o nome da região do país!"
  }),
  idioma: z.string().min(1, { 
    message: "Insira o idioma falado nessa região!"
  }),
  tema: z.string().min(1, { 
    message: "Insira o nome o tema que será falado!"
  }),
  conteudo: z.string().min(1, { 
    message: "Insira o conteúdo que será falado!"
  })
})

type FormInsertCulturaSchema = z.infer<typeof formInsertCulturaSchema>

export default function DialogInsert(){
  const {handleSubmit, register} = useForm<FormInsertCulturaSchema>({
    resolver: zodResolver(formInsertCulturaSchema),
  })

  const queryClient = useQueryClient()

  const { mutateAsync: postCulture } = useMutation({
    mutationFn: createCulture,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["culture"] })
    }
  })

  async function handleInsertData(data: FormInsertCulturaSchema){
    await postCulture(data);
  }

  return(
  <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black text-white"
        >
          Inserir Cultura
        </Button>
      </DialogTrigger>
      <DialogContent className="xs2:w-[90%]">
        <form onSubmit={handleSubmit(handleInsertData)}>
          <DialogHeader>
            <DialogTitle>Inserir Cultura</DialogTitle>
            <DialogDescription>
              Insira o nome da cultura que deseja adicionar!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome do País
              </Label>
              <Input
                id="name"
                className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800"
                autoComplete="off"
                {...register('name')}
              />
              <Label htmlFor="escritor" className="text-right">
                Escritor
              </Label>
              <Input
                id="escritor"
                className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800"
                autoComplete="off"
                {...register('escritor')}
              />
              <Label htmlFor="regiao" className="text-right">
                Região do País
              </Label>
              <Input
                id="regiao"
                className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800"
                autoComplete="off"
                {...register('regiao')}
              />
              <Label htmlFor="idioma" className="text-right">
                Idioma
              </Label>
              <Input
                id="idioma"
                className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800"
                autoComplete="off"
                {...register('idioma')}
              />
              <Label htmlFor="tema" className="text-right">
                Tema
              </Label>
              <Input
                id="tema"
                className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800"
                autoComplete="off"
                {...register('tema')}
              />
              <Label htmlFor="conteudo" className="text-right">
                Conteúdo
              </Label>
              <Input
                id="conteudo"
                className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800"
                autoComplete="off"
                {...register('conteudo')}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Inserir</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    )
}