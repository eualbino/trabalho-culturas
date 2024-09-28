"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DialogInsert from '@/components/dialogInsert/dialogInsert';
import GetCulture from '@/components/getCulture/getCulture';
import { z } from 'zod';

const searchTemaCulture = z.object({
  query: z.string(),
});

type SearchTemaCulture = z.infer<typeof searchTemaCulture>;

export default function Culturas() {
  const { register, watch } = useForm<SearchTemaCulture>({
    resolver: zodResolver(searchTemaCulture),
    defaultValues: {
      query: undefined,
    },
  });

  const query = watch("query");
  const [q] = useDebounce(query, 1000);
  
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
          <DialogInsert />
        </div>
        <GetCulture q={q} />
      </main>
    </div>
  );
}