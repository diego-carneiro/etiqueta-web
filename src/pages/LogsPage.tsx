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
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const logs = [
  {
    funcionario: "Murilo Barbosa de Almeida",
    id: "231",
    campo: "Data da última troca",
    dataHora: "26/05/2023 16:43",
  },
  {
    funcionario: "Murilo Barbosa de Almeida",
    id: "231",
    campo: "Data da última troca",
    dataHora: "26/05/2023 16:43",
  },
  {
    funcionario: "Murilo Barbosa de Almeida",
    id: "231",
    campo: "Data da última troca",
    dataHora: "26/05/2023 16:43",
  },
  {
    funcionario: "Murilo Barbosa de Almeida",
    id: "231",
    campo: "Data da última troca",
    dataHora: "26/05/2023 16:43",
  },
  {
    funcionario: "Murilo Barbosa de Almeida",
    id: "231",
    campo: "Data da última troca",
    dataHora: "26/05/2023 16:43",
  },
];

export default function LogsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <div className="p-4 rounded-lg flex flex-wrap gap-4">
        <Input
          placeholder="Nome do Funcionário"
          className="max-w-[200px] bg-white border-none"
        />
        <Input
          placeholder="ID"
          className="max-w-[100px] bg-white border-none"
        />
        <Select>
          <SelectTrigger className="w-[200px] bg-white border-none">
            <SelectValue placeholder="Selecione um campo" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="campo1">Data da última troca</SelectItem>
            <SelectItem value="campo2">Email</SelectItem>
            <SelectItem value="campo3">Telefone</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
          Filtrar
        </Button>
      </div>

      <div className="bg-white rounded-lg p-4">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow>
              <TableHead>Funcionário</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Campo</TableHead>
              <TableHead>Data e Hora</TableHead>
              <TableHead>Auditar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.funcionario}</TableCell>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.campo}</TableCell>
                <TableCell>{log.dataHora}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      navigate("/app/audit-log", { state: { log } })
                    }
                  >
                    <Eye className="h-5 w-5 text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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
