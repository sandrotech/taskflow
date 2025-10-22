import { motion } from "motion/react";

const clients = [
  { name: "TechStartup", value: 3000, emoji: "🥇" },
  { name: "Silva & Associados", value: 2500, emoji: "🥈" },
  { name: "Pedro Costa", value: 1200, emoji: "🥉" },
];

const maxValue = Math.max(...clients.map(c => c.value));

export function TopClients() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] rounded-2xl p-6 overflow-hidden relative group hover:shadow-[0_0_40px_rgba(255,215,90,0.15)] transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD75A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <h3 className="mb-6" style={{ color: "#E0E0E0" }}>Clientes Mais Rentáveis</h3>
        
        <div className="space-y-5">
          {clients.map((client, index) => {
            const percentage = (client.value / maxValue) * 100;
            
            return (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{client.emoji}</span>
                    <span className="text-sm" style={{ color: "#E0E0E0" }}>
                      {client.name}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: "#FFD75A", fontWeight: 600 }}>
                    R$ {client.value.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 bg-[#222222] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#FFD75A] to-[#FFD75A]/70 rounded-full"
                    style={{
                      boxShadow: "0 0 10px rgba(255, 215, 90, 0.5)"
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
