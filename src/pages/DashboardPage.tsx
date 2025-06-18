import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { MoreHorizontal } from "lucide-react";

const dashboardStats = [
  {
    label: "Clientes Verificados",
    value: 53,
    color: "text-green-600",
    icon: "🟢",
  },
  {
    label: "Clientes Pendentes",
    value: 12,
    color: "text-orange-600",
    icon: "🟠",
  },
  { label: "Slots Adicionais", value: 28, color: "text-blue-600", icon: "➕" },
];

const clients = [
  {
    id: "46512354",
    name: "Murilo Barbosa de Almeida",
    car: "Lorem 2023",
    plate: "ABC 1234",
    status: "Pendente",
  },
  {
    id: "46512354",
    name: "Murilo Barbosa de Almeida",
    car: "Lorem 2023",
    plate: "ABC 1234",
    status: "Verificado",
  },
  // Repita para mais linhas...
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.label} className="bg-white border-none">
            <CardContent className="flex items-center gap-3 p-4">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-lg flex flex-wrap gap-4">
        <Input
          placeholder="Placa"
          className="max-w-[200px] bg-white border-none"
        />
        <Input
          placeholder="ID"
          className="max-w-[200px] bg-white border-none"
        />
        <Select>
          <SelectTrigger className="w-[200px] bg-white border-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="verificado">Verificado</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>
        <Button>Filtrar</Button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg p-4">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow>
              <TableHead>Identificação</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Carro Principal</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Revisar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.car}</TableCell>
                <TableCell>{client.plate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      client.status === "Verificado"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
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
