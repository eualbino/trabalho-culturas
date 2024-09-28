"use client"
import { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editCulture, getUniqueCulture } from "@/data/culture-data";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function EditCulture({ id }: { id: number }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cultureSchema = z.object({
    id: z.number(),
    escritor: z.string(),
    tema: z.string(),
  });

  const formInsertCulturaSchema = z.object({
    name: z.string(),
    escritor: z.string(),
    regiao: z.string(),
    tema: z.string(),
    idioma: z.string(),
    conteudo: z.string()
  })

  type FormeInsertCulturaSchema = z.infer<typeof formInsertCulturaSchema>

  type Culture = z.infer<typeof cultureSchema>;

  const { data: getUniqueCultures } = useQuery<Culture>({
    queryKey: ["cultureUnique"],
    queryFn: () => getUniqueCulture(id),
    enabled: isDialogOpen,
    refetchOnWindowFocus: false,
  });

  const { handleSubmit, register } = useForm<FormeInsertCulturaSchema>({
    resolver: zodResolver(formInsertCulturaSchema)
  })

  const queryClient = useQueryClient();

  const { mutateAsync: editCultureData } = useMutation({
    mutationFn: (data: FormeInsertCulturaSchema) => editCulture(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cultureUpdate"] }),
      setIsDialogOpen(false);
    },
  });

  async function handleEditCultura(data: FormeInsertCulturaSchema) {
    await editCultureData(data)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-blue-400 p-2 rounded-md text-black font-semibold text-base h-[100%]"
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="xs2:w-[90%]">
      <form onSubmit={handleSubmit(handleEditCultura)}>
        <DialogHeader>
          <DialogTitle>Realmente deseja editar esta cultura?</DialogTitle>
          <DialogDescription>
            {getUniqueCultures && (
              <span>O tema: {getUniqueCultures.tema} escrito por {getUniqueCultures.escritor} será alterado!</span>
            )}
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
            <Button type="submit">Editar</Button>
          </DialogClose>
        </div>
      </form>
      </DialogContent>
    </Dialog>
  );
}