

import Navbar from "@/components/navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Culturas() {
  return (
    <div>
      <header className="flex justify-between pt-6 pl-20 pr-32  items-center">
        <div className="">
          <Image
            src="/logoculturamundi.png"
            alt="Logo da CulturaMundi"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-row justify-center gap-6 items-center mb-9">
          <Navbar/>
        </div>
        <div className="flex items-center mb-9">
          <Search className="w-5 h-4 text-sm absolute ml-2 text-zinc-600 xs:ml-4" />
          <Input
            className=" placeholder:text-zinc-500  dark:border-none dark:bg-zinc-900 border-2 border-black rounded-xl max-w-80 text-sm pl-9"
            placeholder="Pesquisar..."
            autoComplete="off"
          />
        </div>
      </header>
    </div>
  );
}
