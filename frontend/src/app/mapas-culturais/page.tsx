"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import GetCulture from '@/components/getCulture/getCulture';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { getAllCulture } from '@/data/culture-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const searchTemaCulture = z.object({
  query: z.string(),
});

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

type SearchTemaCulture = z.infer<typeof searchTemaCulture>;

export default function MapasCulturais() {
  const [nameCulture, setNameCulture] = useState<string | undefined>("")
  const { register, watch } = useForm<SearchTemaCulture>({
    resolver: zodResolver(searchTemaCulture),
    defaultValues: {
      query: undefined,
    },
  });

  const query = watch("query");
  const [q] = useDebounce(query, 1000);

  const { data: getCultures = [] } = useQuery<Culture[]>({
    queryKey: ["cultureUpdate", q],
    queryFn: () => getAllCulture(q),
    refetchOnWindowFocus: false,
  })

  const uniqueCountries = new Set<string>();
  const filteredCultures = getCultures.filter(cultura => {
    if (!uniqueCountries.has(cultura.name)) {
      uniqueCountries.add(cultura.name);
      return true;
    }
    return false;
  });

  const handleSelectChange = (value: string) => {
    setNameCulture(value);
  };
  
  return (
    <div>
      <header className="flex justify-between pt-6 pl-20 pr-32 items-center xs:pl-5 xs:pr-10 ls:flex-col ls:pl-0 ls:pr-0">
        <div>
          <Image
            src="/logoculturamundi.png"
            alt="Logo da CulturaMundi"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-row justify-center gap-6 items-center mb-9">
          <Navbar />
        </div>
        <div className="flex items-center mb-9">
          <Search className="w-5 h-4 text-sm absolute ml-2 text-zinc-600 xs:ml-4" />
          <Input
            className="placeholder:text-zinc-500 dark:border-none dark:bg-zinc-900 border-2 border-black rounded-xl max-w-80 text-sm pl-9"
            placeholder="Pesquisar..."
            autoComplete="off"
            {...register("query")}
          />
        </div>
      </header>
      <main className="flex flex-col justify-center items-center gap-10">
        <div>
        <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
            {filteredCultures.map((item: Culture) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <GetCulture q={q} namecultures={nameCulture} />
      </main>
    </div>
  );
}