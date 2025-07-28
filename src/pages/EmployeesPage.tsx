import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useEmployees, useDeleteEmployee } from "@/api/hooks/useEmployee";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useEmployees();
  const deleteEmployee = useDeleteEmployee();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      deleteEmployee.mutate(selectedEmployee.id);
      setDialogOpen(false);
    }
  };

  return (
    <div className="p-20 space-y-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
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
        <div>
          <Button
            className="bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={() => navigate("/app/employee-register")}
          >
            Cadastrar
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-center">Editar</TableHead>
              <TableHead className="text-center">Remover</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-gray-400"
                >
                  Carregando funcionários...
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((employee) => (
                <TableRow key={employee.id} className="text-gray-600">
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4 text-blue-500" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedEmployee({
                          id: employee.id,
                          name: employee.name,
                        });
                        setDialogOpen(true);
                      }}
                    >
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-none shadow-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Remover Funcionário
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Deseja remover o funcionário:{" "}
              <strong>{selectedEmployee?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-gray-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={!selectedEmployee}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Sim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
