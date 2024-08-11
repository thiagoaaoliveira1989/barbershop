import { BarbershopItem } from "../_components/barbershop-items";
import { Header } from "../_components/header";
import Search from "../_components/search";
import db from "../_lib/prisma";

interface Barbershop {
  id: string;
  name: string;
  // Adicione outros campos necessários aqui
}

interface Props {
  searchParams?: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: Props) => {
  // Busca as barbearias baseadas no parâmetro de pesquisa
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search || "",
        mode: "insensitive",
      },
    },
  });

  return (
    <div className="">
      <Header />

      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mt-4">
          Resultados para: &quot;{searchParams?.search || "Todas as barbearias"}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.length > 0 ? (
            barbershops.map((barber) => (
              <BarbershopItem key={barber.id} barber={barber} />
            ))
          ) : (
            <p className="mt-6">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
