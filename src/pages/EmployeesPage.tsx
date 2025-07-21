import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEmployees } from "@/api/hooks/useEmployee";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useEmployees();

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 gap-4 w-fit">
        <Card className="bg-white border-none">
          <CardContent className="flex items-center gap-3 p-4">
            <span className="text-2xl">🟢</span>
            <div>
              <p className="text-lg font-bold">{data?.data.length ?? 0}</p>
              <p className="text-sm text-gray-500">Funcionários</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 rounded-lg flex flex-wrap gap-4">
        <Input
          placeholder="Ex: 12345"
          className="max-w-[200px] bg-white border-none"
        />
        <Input
          placeholder="Digite seu nome"
          className="max-w-[200px] bg-white border-none"
        />
        <Select>
          <SelectTrigger className="w-[200px] bg-white border-none">
            <SelectValue placeholder="Selecione uma loja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="loja-a">Loja A</SelectItem>
            <SelectItem value="loja-b">Loja B</SelectItem>
            <SelectItem value="loja-c">Loja C</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={() => navigate("/app/employee-register")}
        >
          Cadastrar
        </Button>
      </div>

      <div className="bg-white rounded-lg p-4">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Loja</TableHead>
              <TableHead>Editar</TableHead>
              <TableHead>Remover</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Carregando funcionários...
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.serviceCenterId}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end pt-4 text-sm text-gray-500 space-x-2">
        <span className="cursor-pointer hover:underline">1</span>
        <span className="cursor-pointer hover:underline">2</span>
        <span className="cursor-pointer hover:underline">3</span>
        <span className="cursor-pointer hover:underline">4</span>
        <span className="cursor-pointer hover:underline">5</span>
        <span>Próx</span>
      </div>
    </div>
  );
}
