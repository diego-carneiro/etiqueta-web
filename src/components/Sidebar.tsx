import { Home, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Painel", icon: Home, path: "/app/dashboard" },
    // { label: "Pagamentos", icon: CreditCard, path: "/app/payments" },
    { label: "Funcionários", icon: Users, path: "/app/employees" },
    { label: "Histórico", icon: Settings, path: "/app/logs" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <aside className="w-64 h-screen bg-white p-4 flex flex-col">
      <h2 className="text-sm text-gray-500 font-semibold mb-4 mt-4">Menu</h2>

      <nav className="flex flex-col gap-2">
        {menuItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-400 hover:text-blue-600 hover:bg-gray-100"
              )}
            >
              <Icon
                size={18}
                className={cn(isActive ? "text-blue-600" : "text-gray-400")}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
      >
        <LogOut size={18} className="text-gray-600 group-hover:text-blue-600" />
        Sair
      </button>
    </aside>
  );
}
