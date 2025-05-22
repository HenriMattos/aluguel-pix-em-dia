
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Building, 
  Users, 
  Calendar, 
  LayoutDashboard, 
  Settings, 
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      path: "/properties", 
      label: "Imóveis", 
      icon: <Building size={20} /> 
    },
    { 
      path: "/tenants", 
      label: "Inquilinos", 
      icon: <Users size={20} /> 
    },
    { 
      path: "/billing", 
      label: "Cobranças", 
      icon: <Calendar size={20} /> 
    },
    { 
      path: "/messages", 
      label: "Mensagens", 
      icon: <MessageSquare size={20} /> 
    },
    { 
      path: "/settings", 
      label: "Configurações", 
      icon: <Settings size={20} /> 
    }
  ];

  return (
    <div className={cn(
      "h-screen bg-white border-r transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Building className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">EmDia</span>
          </div>
        )}
        {collapsed && (
          <div className="bg-blue-600 p-1.5 rounded-lg mx-auto">
            <Building className="h-5 w-5 text-white" />
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="flex flex-col flex-1 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600",
              isActive && "bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600",
              collapsed ? "justify-center" : "space-x-3"
            )}
          >
            <span>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className={cn(
          "bg-blue-50 rounded-lg p-3 text-sm text-blue-700",
          collapsed && "text-center"
        )}>
          {!collapsed && (
            <>
              <p className="font-medium">Versão 1.0</p>
              <p className="text-xs mt-1">Gerenciador de Aluguéis</p>
            </>
          )}
          {collapsed && <p className="font-medium">v1.0</p>}
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
