import { motion } from "motion/react";

const deliveryStages = [
  { label: "Em produção", count: 4, color: "#FFC048" },
  { label: "Enviados", count: 5, color: "#FFD75A" },
  { label: "Aguardando aprovação", count: 1, color: "#FFC93A" },
  { label: "Aprovados", count: 12, color: "#78E08F" },
  { label: "Em ajuste", count: 2, color: "#FF6B6B" },
];

export function DeliveryStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] rounded-2xl p-6 overflow-hidden relative group hover:shadow-[0_0_40px_rgba(255,215,90,0.15)] transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD75A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <h3 className="mb-6" style={{ color: "#E0E0E0" }}>Status de Entregas</h3>
        
        <div className="space-y-4">
          {deliveryStages.map((stage, index) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="relative"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs" style={{ color: "#999999" }}>
                    {stage.label}
                  </div>
                  <div className="text-xs" style={{ color: stage.color, fontWeight: 600 }}>
                    {stage.count} tarefa{stage.count !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-3 bg-[#222222] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full relative"
                    style={{ 
                      backgroundColor: stage.color,
                      boxShadow: `0 0 8px ${stage.color}60`
                    }}
                  >
                    {/* Count overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center text-[10px]"
                      style={{ 
                        color: "#0F0F0F", 
                        fontWeight: 700,
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                      }}
                    >
                      {stage.count}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
