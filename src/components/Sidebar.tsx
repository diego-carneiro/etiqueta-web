import { Home, CreditCard, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // Shadcn utility
import { useLocation, Link } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: Home, path: "/app/dashboard" },
    { label: "Pagamentos", icon: CreditCard, path: "/app/payments" },
    { label: "Funcionários", icon: Users, path: "/app/employees" },
    { label: "Logs", icon: Settings, path: "/app/logs" },
  ];

  return (
    <aside className="w-64 h-screen bg-white p-4 flex flex-col">
      <h2 className="text-sm text-gray-500 font-semibold mb-4 mt-20">Menu</h2>

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
    </aside>
  );
}
