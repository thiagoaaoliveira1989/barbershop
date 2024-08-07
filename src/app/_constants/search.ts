import { StaticImageData } from "next/image";
import Barba from "../../assets/barba.png";
import Cabelo from "../../assets/tesoura.png";
import Acabamento from "../../assets/navalha.png";
import Sobrancelha from "../../assets/sobrancelha.png";
import Massagem from "../../assets/massagem.png";
import Hidratacao from "../../assets/hidratacao.png";

interface QuickSearchOption {
  imageUrl: StaticImageData;
  title: string;
}

export const quickSearchOption: QuickSearchOption[] = [
  {
    imageUrl: Barba,
    title: "Barba",
  },
  {
    imageUrl: Cabelo,
    title: "Cabelo",
  },
  {
    imageUrl: Acabamento,
    title: "Acabamento",
  },
  {
    imageUrl: Sobrancelha,
    title: "Sobrancelha",
  },
  {
    imageUrl: Massagem,
    title: "Massagem",
  },
  {
    imageUrl: Hidratacao,
    title: "Hidratação",
  },
];
