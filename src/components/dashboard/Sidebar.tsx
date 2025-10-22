import { motion } from "motion/react";
import { LayoutDashboard, CheckSquare, FileText, Package, DollarSign, Settings } from "lucide-react";
import { useRouter } from "../../lib/router";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CheckSquare, label: "Tarefas", path: "/tarefas" },
  { icon: FileText, label: "Cadastros", path: "/cadastros" },
  { icon: Package, label: "Entregas", path: "/entregas" },
  { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
  { icon: Settings, label: "Configurações", path: "/config" },
];

export function Sidebar() {
  const { currentRoute, navigate } = useRouter();

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-[#0C0C0C] border-r border-[#1A1A1A] flex flex-col items-center justify-center gap-6 z-50">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentRoute === item.path;
        
        return (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate(item.path)}
            className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isActive
                ? "bg-gradient-to-br from-[#FFD75A]/20 to-[#FFD75A]/10 border border-[#FFD75A]/50 shadow-[0_0_20px_rgba(255,215,90,0.3)]"
                : "bg-[#222222]/30 hover:bg-[#FFD75A]/10 hover:border hover:border-[#FFD75A]/30 hover:shadow-[0_0_15px_rgba(255,215,90,0.2)]"
            }`}
            title={item.label}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-[#FFD75A]" : "text-[#E0E0E0]"}`} />
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#FFD75A] rounded-r"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
