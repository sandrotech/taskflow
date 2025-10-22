import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accentColor: string;
  index: number;
}

export function KPICard({ icon: Icon, label, value, accentColor, index }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${accentColor}40` }}
      className="relative backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] rounded-2xl p-6 overflow-hidden group"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${accentColor}`}>
              <Icon className="w-5 h-5 text-[#0F0F0F]" />
            </div>
          </div>
          <div className="text-3xl mb-2" style={{ fontWeight: 600, color: "#E0E0E0" }}>
            {value}
          </div>
          <div className="text-sm" style={{ color: "#999999", fontWeight: 400 }}>
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
