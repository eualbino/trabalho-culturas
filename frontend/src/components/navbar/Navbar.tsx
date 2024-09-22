"use client"

import { SquareMenu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-row justify-center gap-6 items-center">
      {windowWidth < 950 ? (
        <div className="menu-icon" onClick={toggleMenu}>
          <SquareMenu size={28} color="#000000" />
        </div>
      ) : (
        <>
          <Link href="/" className="text-zinc-800 text-base font-semibold hover:text-zinc-600">
            Home
          </Link>
          <Link
            href="/culturas/"
            className="text-zinc-800 text-base font-semibold hover:text-zinc-600"
          >
            Culturas
          </Link>
          <Link
            href="#"
            className="text-zinc-800 text-base font-semibold hover:text-zinc-600"
          >
            Mapa Culturais
          </Link>
        </>
      )}
      {isOpen && windowWidth < 950 && (
        <div className="flex flex-col absolute w-[220px] bg-slate-200 top-32 justify-center items-center rounded-lg gap-3 p-6">
          <Link
            href="/"
            className="text-zinc-800 text-base font-semibold hover:text-zinc-600"
          >
            Home
          </Link>
          <Link
            href="/culturas"
            className="text-zinc-800 text-base font-semibold hover:text-zinc-600"
          >
            Culturas
          </Link>
          <Link
            href="#"
            className="text-zinc-800 text-base font-semibold hover:text-zinc-600"
          >
            Mapa Culturais
          </Link>
        </div>
      )}
    </div>
  );
}
