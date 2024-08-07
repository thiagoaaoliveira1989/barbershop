import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export const Booking = () => {
  return (
    <div className="mt-6">
      <h3>Agendamentos</h3>
      <Card className="mt-3 rounded-xl bg-[#26272B]">
        <CardContent className="flex flex-row justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="flex itens-center justify-center px-[2px] py-[8px] max-w-[100px] bg-[#221C3D] font-[12px] text-[#8162FF] hover:bg-[#372d63]">
              Confirmado
            </Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-[24px] w-[24px]">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p>Barbearia FullStack</p>
            </div>
          </div>
          <div className="border p-5 flex flex-col justify-center items-center min-h-full rounded-r-xl">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
