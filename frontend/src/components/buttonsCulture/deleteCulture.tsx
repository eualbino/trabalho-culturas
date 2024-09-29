"use client"
import { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCulture, getUniqueCulture } from "@/data/culture-data";
import { useState } from "react";

export default function DeleteCulture({ id, q }: { id: number, q: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cultureSchema = z.object({
    id: z.number(),
    escritor: z.string(),
    tema: z.string(),
  });

  type Culture = z.infer<typeof cultureSchema>;

  const { data: culture } = useQuery<Culture>({
    queryKey: ["cultureUnique", q],
    queryFn: () => getUniqueCulture(id),
    enabled: isDialogOpen,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteCultureData } = useMutation({
    mutationFn: deleteCulture,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cultureUpdate"] })
    },
  });

  async function handleDeleteCulture() {
    await deleteCultureData(id)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-red-400 p-2 rounded-md text-black font-semibold text-base h-[100%]"
        >
          Deletar
        </Button>
      </DialogTrigger>
      <DialogContent className="xs2:w-[90%]">
        <DialogHeader>
          <DialogTitle>Realmente deseja deletar esta cultura?</DialogTitle>
          <DialogDescription>
            {culture && (
              <span>O tema: {culture.tema} escrito por {culture.escritor} será deletado!</span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button onClick={handleDeleteCulture}>Deletar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}