"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOption } from "../_constants/search";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HelpCircleIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  SettingsIcon,
  ShoppingBag,
  Heart,
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
import Link from "next/link";

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
      <div className="block md:hidden">
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
                          alt="fazer login com o Google"
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
              <Link href="/" className="flex gap-2">
                <SheetClose asChild>
                  <Button
                    className="justify-start gap-2 hover:bg-primary w-full"
                    variant="ghost"
                  >
                    <HomeIcon size={18} />
                    Início
                  </Button>
                </SheetClose>
              </Link>
              <Link href="/bookings">
                <Button
                  className="justify-start gap-2 hover:bg-primary"
                  variant="ghost"
                >
                  <CalendarIcon size={18} />
                  Agendamentos
                </Button>
              </Link>
            </div>

            <div className="p-5 flex flex-col gap-4 border-b border-solid">
              {quickSearchOption.map((option) => (
                <SheetClose
                  key={option.title}
                  className="flex flex-row gap-2 w-full"
                  asChild
                >
                  <Link href={`/barbershop?service=${option.title}`}>
                    <Button
                      className="justify-start gap-2 hover:bg-primary w-full"
                      variant="ghost"
                    >
                      <Image src={option.imageUrl} alt={option.title} />
                      <p>{option.title}</p>
                    </Button>
                  </Link>
                </SheetClose>
              ))}
            </div>

            {data?.user.id ? (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="p-5 flex flex-col gap-4">
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 hover:bg-primary"
                    >
                      <LogOutIcon size={18} />
                      Sair da Conta
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader className="flex gap-4">
                    <DialogTitle>Sair</DialogTitle>
                    <DialogDescription>
                      Deseja Mesmo sair da plataforma?
                    </DialogDescription>
                    <div className="flex justify-between gap-5 items-center w-full">
                      <SheetClose asChild>
                        <Button variant="secondary" className="w-full">
                          Cancelar
                        </Button>
                      </SheetClose>
                      <Button
                        onClick={handleLogoutClick}
                        variant="destructive"
                        className="w-full"
                      >
                        Sair
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ) : null}
          </SheetContent>
        </Sheet>
      </div>

      <div className="max-md:hidden md:flex !important md:justify-between md:items-center gap-3">
        <Link href="/bookings">
          <Button
            variant="ghost"
            className="flex justify-center items-center gap-3 hover:bg-primary"
          >
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </Link>

        {data?.user ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex justify-center items-center gap-3 hover:bg-primary"
              >
                <Avatar>
                  <AvatarImage
                    src={
                      data.user.image ??
                      "https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-estudante-icone-de-perfil-de-usuario-avatar-de-jovem_118339-4402.jpg"
                    }
                  />
                </Avatar>
                {data.user.name}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">Perfil</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                {/* Informações do Usuário */}
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        data.user.image ??
                        "https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-estudante-icone-de-perfil-de-usuario-avatar-de-jovem_118339-4402.jpg"
                      }
                    />
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">{data.user.name}</p>
                    <p className="text-sm text-gray-600">{data.user.email}</p>
                  </div>
                </div>

                {/* Opções do Perfil */}
                <div className="flex flex-col gap-2 mb-4">
                  <Link href="/profile/settings">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-primary"
                    >
                      <SettingsIcon size={18} />
                      Configurações
                    </Button>
                  </Link>
                  <Link href="/profile/orders">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-primary"
                    >
                      <ShoppingBag size={18} />
                      Meus Pedidos
                    </Button>
                  </Link>
                  <Link href="/profile/wishlist">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-primary"
                    >
                      <Heart size={18} />
                      Lista de Desejos
                    </Button>
                  </Link>
                  <Link href="/profile/help">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-primary"
                    >
                      <HelpCircleIcon size={18} />
                      Ajuda
                    </Button>
                  </Link>
                </div>

                {/* Ações de Logout */}
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full flex items-center gap-2 hover:bg-red-500"
                      >
                        <LogOutIcon size={18} />
                        Sair
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%]">
                      <DialogHeader className="flex flex-col gap-4">
                        <DialogTitle>Sair</DialogTitle>
                        <DialogDescription>
                          Deseja realmente sair da sua conta?
                        </DialogDescription>
                        <div className="flex justify-between gap-5 items-center w-full">
                          <SheetClose asChild>
                            <Button variant="secondary" className="w-full">
                              Cancelar
                            </Button>
                          </SheetClose>
                          <Button
                            onClick={handleLogoutClick}
                            variant="destructive"
                            className="w-full"
                          >
                            Sair
                          </Button>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="justify-start gap-2 hover:bg-primary"
                  variant="ghost"
                >
                  <UserIcon size={18} />
                  Login
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
                    alt="fazer login com o Google"
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
    </>
  );
};

export default SiderbarButton;
