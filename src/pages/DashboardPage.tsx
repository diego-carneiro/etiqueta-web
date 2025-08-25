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
  const [searchPlate, setSearchPlate] = useState("");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    data: vehicleData,
    isLoading,
    isError,
    refetch,
  } = useVehicleByPlate(searchPlate);

  const { data: customerData } = useCustomerById(customerId ?? "");

  useEffect(() => {
    if (vehicleData && "customerId" in vehicleData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCustomerId((vehicleData as any).customerId);
    }
  }, [vehicleData]);

  const handleSearch = async () => {
    if (!licensePlate.trim()) return;
    setShowError(false);
    setShowModal(true);

    setSearchPlate(licensePlate);
    const result = await refetch();

    if (result.error || isError) {
      setShowError(true);
    }
    setShowModal(false);
  };

  const handleMoreDetails = () => {
    if (vehicleData) {
      navigate("/user-infos", {
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
        <div className="flex items-center bg-white rounded-xl px-3 py-2 mb-4 shadow">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Busca por placa"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="flex-1 ml-2 bg-transparent text-base text-gray-800 outline-none"
            autoCapitalize="characters"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-yellow-400 px-6 py-3 rounded-lg mt-2 text-white font-semibold"
        >
          Pesquisar
        </button>

        {vehicleData && customerData && !isLoading && !showError && (
          <div className="bg-white rounded-xl p-4 mt-6 shadow space-y-1 text-gray-800">
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
              <span className="font-bold">Ano:</span> {vehicleData.year || "-"}
            </p>
            <p>
              <span className="font-bold">KM:</span>{" "}
              {vehicleData.currentMileage || "-"}
            </p>
            <button
              onClick={handleMoreDetails}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Mais detalhes
            </button>
          </div>
        )}
      </div>

      <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-md bg-white border-none shadow-lg rounded-xl z-50">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>

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

      <Dialog open={showError} onOpenChange={(open) => setShowError(open)}>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-md bg-white border-none shadow-lg rounded-xl z-50">
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
            Erro ao buscar veículo pela placa.
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
    </div>
  );
}
