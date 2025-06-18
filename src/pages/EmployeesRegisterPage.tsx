import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployeeRegister() {
  return (
    <div className="min-h-screen bg-gray-100 px-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Nome</label>
          <Input
            placeholder="Digite um nome"
            className="bg-white border-none shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            placeholder="exemplo@exemplo.com"
            className="bg-white border-none shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Celular</label>
          <Input
            placeholder="149912125432"
            className="bg-white border-none shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Senha</label>
          <Input
            type="password"
            placeholder="Sua senha"
            className="bg-white border-none shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Confirmar Senha
          </label>
          <Input
            type="password"
            placeholder="Confirmar senha"
            className="bg-white border-none shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Loja</label>
          <Select>
            <SelectTrigger className="bg-white border-none shadow-sm">
              <SelectValue placeholder="Selecione uma loja" />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              <SelectItem value="loja-a">Loja A</SelectItem>
              <SelectItem value="loja-b">Loja B</SelectItem>
              <SelectItem value="loja-c">Loja C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6">
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
          Cadastrar
        </Button>
      </div>
    </div>
  );
}
