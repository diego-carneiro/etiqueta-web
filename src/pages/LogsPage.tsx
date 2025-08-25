import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLabelsHistory } from "@/api/hooks/useLabels";

export default function LogsPage() {
  const [employeeIdInput, setEmployeeIdInput] = useState("");
  const [employeeIdFilter, setEmployeeIdFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: historyData = [],
    isLoading,
    isError,
    error,
  } = useLabelsHistory();

  const filteredData = useMemo(() => {
    if (!employeeIdFilter.trim()) return historyData;
    return historyData.filter(
      (log) =>
        log.employeeId &&
        log.employeeId.toLowerCase().includes(employeeIdFilter.toLowerCase())
    );
  }, [historyData, employeeIdFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleFilter = () => {
    setEmployeeIdFilter(employeeIdInput.trim());
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          className={`cursor-pointer hover:underline ${
            i === currentPage ? "font-bold text-blue-600" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return (
      <div className="flex justify-end pt-4 text-sm text-gray-500 space-x-2">
        {pages}
        {currentPage < totalPages && (
          <span
            className="cursor-pointer hover:underline"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Próx
          </span>
        )}
      </div>
    );
  };

  if (isError) {
    return (
      <div className="p-20 bg-gray-100 min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Erro ao carregar histórico: {error?.message || "Erro desconhecido"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-20 space-y-8 bg-gray-100 min-h-screen">
      <div className="rounded-lg flex flex-wrap gap-4">
        <Input
          placeholder="ID do Funcionário"
          className="max-w-[200px] bg-white border-none"
          value={employeeIdInput}
          onChange={(e) => setEmployeeIdInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFilter();
          }}
        />
        <Button
          className="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={handleFilter}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            "Filtrar"
          )}
        </Button>
      </div>

      <div className="bg-white rounded-lg p-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Carregando histórico...</span>
          </div>
        ) : (
          <Table className="border-separate border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Quilometragem</TableHead>
                <TableHead>Itens Aplicados</TableHead>
                <TableHead>Data e Hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-500"
                  >
                    {employeeIdFilter.trim()
                      ? "Nenhum registro encontrado para este funcionário"
                      : "Nenhum registro encontrado"}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((log, index) => (
                  <TableRow key={`${log.employeeId}-${log.vehicleId}-${index}`}>
                    <TableCell>{log.mileage} km</TableCell>
                    <TableCell>
                      {log.itemsApplied.length} item(s)
                      {log.itemsApplied.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {log.itemsApplied[0].brand}{" "}
                          {log.itemsApplied[0].specification}
                          {log.itemsApplied.length > 1 &&
                            ` +${log.itemsApplied.length - 1} mais`}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{formatDateTime(log.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {paginatedData.length > 0 && renderPagination()}

      {filteredData.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Mostrando {paginatedData.length} de {filteredData.length} registros
          {employeeIdFilter.trim() &&
            ` (filtrados de ${historyData.length} total)`}
        </div>
      )}
    </div>
  );
}
