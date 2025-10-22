import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function MonthlyGoal() {
  const received = 3600;
  const goal = 5000;
  const percentage = (received / goal) * 100;
  const remaining = goal - received;
  
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] rounded-2xl p-8 overflow-hidden relative group hover:shadow-[0_0_40px_rgba(255,215,90,0.2)] transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD75A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <h3 className="mb-6" style={{ color: "#E0E0E0" }}>Meta Mensal</h3>
        
        <div className="flex flex-col items-center justify-center py-4">
          {/* Circular Progress */}
          <div className="relative w-48 h-48 mb-6">
            <svg className="transform -rotate-90 w-48 h-48">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="#222222"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="96"
                cy="96"
                r="70"
                stroke="#FFD75A"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 215, 90, 0.6))"
                }}
              />
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl mb-1" style={{ fontWeight: 700, color: "#FFD75A" }}>
                {Math.round(percentage)}%
              </div>
              <div className="text-sm" style={{ color: "#999999" }}>
                concluído
              </div>
            </div>
          </div>
          
          {/* Values */}
          <div className="text-center mb-2">
            <div className="text-xl mb-1" style={{ color: "#E0E0E0", fontWeight: 500 }}>
              R$ {received.toLocaleString('pt-BR')} de R$ {goal.toLocaleString('pt-BR')}
            </div>
          </div>
          
          {/* Message */}
          <div className="text-center px-4 py-3 rounded-lg bg-[#222222]/50 border border-[#FFD75A]/20">
            <p className="text-sm" style={{ color: "#E0E0E0" }}>
              Mantenha o ritmo — faltam <span style={{ color: "#FFD75A", fontWeight: 600 }}>R$ {remaining.toLocaleString('pt-BR')}</span> para bater a meta 🏁
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
