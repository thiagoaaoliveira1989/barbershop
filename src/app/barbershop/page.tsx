import { BarbershopItem } from "../_components/barbershop-items";
import { Header } from "../_components/header";
import HeaderDesktop from "../_components/header-desktop";
import Search from "../_components/search";
import db from "../_lib/prisma";

interface Props {
  searchParams?: {
    title?: string;
    service?: string;
  };
}

const BarbershopPage = async ({ searchParams }: Props) => {
  // Busca as barbearias baseadas no parâmetro de pesquisa
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <>
      <div className="block md:hidden">
        <Header />
        <div className="p-5 mt-6">
          <Search />
        </div>
      </div>

      <div className="max-md:hidden md:flex !important md:justify-between md:items-center md:flex-col gap-3">
        <HeaderDesktop />
      </div>

      <div className="p-5 md:px-10">
        <div className="mt-6">
          <h2 className="">
            Resultados para: &quot;
            {searchParams?.title || searchParams?.service}
            &quot;
          </h2>
          <div className="mt-4 flex flex-row overflow-y-auto max-w-screen [&::-webkit-scrollbar]:hidden md:grid-cols-6 gap-4">
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
    </>
  );
};

export default BarbershopPage;
