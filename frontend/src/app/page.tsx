
import GetCultureDestaque from "@/components/getCultureDestaque/getCultureDestaque";
import Navbar from "@/components/navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
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
      <main className="mt-10 grid grid-cols-2 gap-x-8">
        <div className="flex justify-start flex-col max-w-[800px] items-center pl-12 gap-y-5">
          <div className="flex justify-center items-center gap-y-5 flex-col">
            <h1 className="text-2xl font-bold">CulturaMundi - Explorando o Mundo Através das Culturas</h1>
            <hr className="w-[90%] border-[1px] border-zinc-500"/>
          </div>
          <div className="gap-y-5">
            <p className="font-semibold">
              Bem-vindo ao CulturaMundi, um repositório online dedicado à
              descoberta e compreensão das diversas culturas ao redor do mundo.
              Nosso objetivo é oferecer uma plataforma abrangente onde os
              usuários podem explorar informações detalhadas sobre os costumes,
              crenças, línguas, artefatos e histórias de diferentes povos. Com
              uma interface intuitiva, promovemos a pesquisa e o aprendizado,
              facilitando a troca de conhecimentos entre os usuários.
            </p>
            <br/>
            <p className="font-semibold">
              Aqui, você poderá acessar desde descrições históricas profundas
              até a visualização geográfica das culturas através de nossos mapas
              culturais. Aproveite para mergulhar na riqueza cultural que o
              nosso planeta tem a oferecer, aprender mais sobre tradições únicas
              e compartilhar suas próprias descobertas com uma comunidade
              global.
            </p>
          </div>
        </div>
        <div className="flex justify-start flex-col max-w-[600px] items-center pl-12 gap-y-5">
          <GetCultureDestaque/>
        </div>
      </main>
    </>
  );
}
