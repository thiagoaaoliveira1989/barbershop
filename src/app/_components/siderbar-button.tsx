"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOption } from "../_constants/search";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import Image from "next/image";
import { Dialog, DialogHeader } from "./ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Google from "../../assets/Google.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const SiderbarButton = ({}) => {
  const { data } = useSession();

  const handleLoginWithGoogleClick = async () => {
    await signIn("google");
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="ml-4 text-white border-none hover:text-slate-400  hover:bg-primary"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          <div className="p-5 flex flex-row justify-between items-center gap-4 border-b border-solid">
            {data?.user ? (
              <>
                <Avatar>
                  <AvatarImage
                    src={
                      data.user.image ??
                      "https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-estudante-icone-de-perfil-de-usuario-avatar-de-jovem_118339-4402.jpg"
                    }
                  />
                </Avatar>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{data.user.name}</p>
                  <p className="text-sm">{data.user.email}</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-bold">Olá, faça seu login!</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon">
                      <LogInIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>Faça Login na plataforma</DialogTitle>
                      <DialogDescription>
                        Conecte-se usando sua conta do Google
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={handleLoginWithGoogleClick}
                      className="flex gap-1 font-bold hover:bg-primary"
                      variant="outline"
                    >
                      <Image
                        src={Google}
                        alt="fazer login com o Goole"
                        width={18}
                        height={18}
                      />
                      Google
                    </Button>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

          <div className="p-5 flex flex-col gap-4 border-b border-solid">
            <Button
              className="justify-start gap-2 hover:bg-primary"
              variant="ghost"
            >
              <HomeIcon size={18} />
              Início
            </Button>
            <Button
              className="justify-start gap-2  hover:bg-primary"
              variant="ghost"
            >
              <CalendarIcon size={18} />
              Início
            </Button>
          </div>

          <div className="p-5 flex flex-col gap-4 border-b border-solid">
            {quickSearchOption.map((option) => (
              <Button
                key={option.title}
                className="justify-start gap-2  hover:bg-primary"
                variant="ghost"
              >
                <Image src={option.imageUrl} alt={option.title} />
                <p>{option.title}</p>
              </Button>
            ))}
          </div>

          <div className="p-5 flex flex-col gap-4">
            <Button
              onClick={handleLogoutClick}
              variant="ghost"
              className="justify-start gap-2  hover:bg-primary"
            >
              <LogOutIcon size={18} />
              Sair da Conta
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SiderbarButton;
