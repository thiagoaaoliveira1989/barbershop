import Image from "next/image";
import { Header } from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import { Fullscreen, SearchIcon } from "lucide-react";
import Banner from "../assets/Banner.png";

export default function Home() {
  return (
    <div>
      {/*header*/}
      <Header />
      <div className="p-5  text-white">
        <h2 className="text-xl font-bold ">Olá, Thiago</h2>
        <p>Segunda-Feira, 05 de Agosto</p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Input placeholder="Search" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative h-[150px] w-full mt-6 ">
          <Image
            src={Banner}
            alt="Agende nos melhore barbeiros da cidade"
            fill
            className="object-cover w-full"
          />
        </div>
      </div>
    </div>
  );
}
