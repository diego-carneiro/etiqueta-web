import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useVehicleByPlate } from "@/api/hooks/useCars";
import { useCustomerById } from "@/api/hooks/useCustomer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [licensePlate, setLicensePlate] = useState("");
  const [customerId, setCustomerId] = useState<string | null>(null);

  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  const { data: vehicleData, refetch } = useVehicleByPlate(licensePlate);
  const { data: customerData } = useCustomerById(customerId ?? "");

  useEffect(() => {
    if (vehicleData && "customerId" in vehicleData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCustomerId((vehicleData as any).customerId);
    }
  }, [vehicleData]);

  const validatePlate = (plate: string): boolean => {
    const regexOld = /^[A-Z]{3}[0-9]{4}$/; // ABC1234
    const regexMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/; // ABC1D23
    return regexOld.test(plate) || regexMercosul.test(plate);
  };

  const handleSearch = async () => {
    if (!licensePlate.trim()) return;

    if (!validatePlate(licensePlate)) {
      setValidationError(
        "Formato de placa inválido. Use ABC1234 ou ABC1D23 (Mercosul)."
      );
      return;
    }

    setValidationError("");
    setShowError(false);
    setShowSuccess(false);
    setShowLoading(true);

    try {
      const result = await refetch();
      setShowLoading(false);

      if (result.error || !result.data) {
        setShowError(true);
      } else {
        setShowSuccess(true);
      }
    } catch {
      setShowLoading(false);
      setShowError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleMoreDetails = () => {
    if (vehicleData) {
      navigate("/app/user-infos", {
        state: {
          vehicle: vehicleData,
          owner: customerData?.name ?? "-",
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="w-full max-w-md">
        <div className="flex items-center bg-white rounded-xl px-3 py-2 mb-2 shadow">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Busca por placa"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            className="flex-1 ml-2 bg-transparent text-base text-gray-800 outline-none"
          />
        </div>

        {validationError && (
          <p className="text-red-500 text-sm mb-2">{validationError}</p>
        )}

        <button
          onClick={handleSearch}
          className="w-full bg-yellow-400 px-6 py-3 rounded-lg mt-2 text-white font-semibold"
        >
          Pesquisar
        </button>
      </div>

      <Dialog open={showLoading} onOpenChange={setShowLoading}>
        <DialogContent className="sm:max-w-md bg-white border-none shadow-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Buscando veículo...
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-gray-600 text-sm flex items-center justify-center">
            <span className="animate-pulse">Carregando...</span>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-md bg-white border-none shadow-lg rounded-xl">
          <button
            onClick={() => setShowError(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600">
              Erro ao buscar veículo
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-gray-600 text-sm text-center">
            Erro ao buscar veículo pela placa. Verifique se a placa está
            correta.
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowError(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md bg-white border-none shadow-lg rounded-xl">
          <button
            onClick={() => setShowSuccess(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-green-600 text-center mb-6">
              Veículo encontrado
            </DialogTitle>
          </DialogHeader>
          {vehicleData && customerData && (
            <div className="mt-4 text-gray-800 space-y-2">
              <p>
                <span className="font-bold">Proprietário:</span>{" "}
                {customerData.name || "-"}
              </p>
              <p>
                <span className="font-bold">Placa:</span>{" "}
                {vehicleData.licensePlate || "-"}
              </p>
              <p>
                <span className="font-bold">Modelo:</span> {vehicleData.brand}{" "}
                {vehicleData.model}
              </p>
              <p>
                <span className="font-bold">Ano:</span>{" "}
                {vehicleData.year || "-"}
              </p>
              <p>
                <span className="font-bold">Km da última troca:</span>{" "}
                {vehicleData.currentMileage || "-"}Km
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleMoreDetails}
                  className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Mais detalhes
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
