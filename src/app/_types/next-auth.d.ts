import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Adiciona a propriedade id ao usuário
    } & DefaultSession["user"]; // Mantém as propriedades padrão do usuário
  }
}
