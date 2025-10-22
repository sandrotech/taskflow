import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Play, Pause, Square, Target } from "lucide-react";
import { secondsToHMS, secondsToHM } from "../../lib/utils/dateHelpers";
import { FocusTimer } from "../../lib/mockData";
import { toast } from "sonner@2.0.3";

interface ProductivityClockProps {
  focusTimer: FocusTimer;
  onTimerUpdate: (timer: FocusTimer) => void;
}

export function ProductivityClock({ focusTimer, onTimerUpdate }: ProductivityClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update focus time when running
  useEffect(() => {
    if (focusTimer.state === "running") {
      const timer = setInterval(() => {
        onTimerUpdate({
          ...focusTimer,
          todaySeconds: focusTimer.todaySeconds + 1,
          sessionSeconds: focusTimer.sessionSeconds + 1,
          weekSeconds: focusTimer.weekSeconds + 1,
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [focusTimer.state, focusTimer.todaySeconds]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
  };

  const handleStart = () => {
    onTimerUpdate({
      ...focusTimer,
      state: "running",
    });
  };

  const handlePause = () => {
    onTimerUpdate({
      ...focusTimer,
      state: "paused",
    });
  };

  const handleStop = () => {
    onTimerUpdate({
      ...focusTimer,
      state: "stopped",
      sessionSeconds: 0,
    });
    toast.success("Tempo registrado. Bom trabalho! 💪");
  };

  const targetSeconds = 14400; // 4 hours
  const progressPercent = Math.min((focusTimer.todaySeconds / targetSeconds) * 100, 100);

  const statusConfig = {
    running: { color: "#FFD75A", label: "Ativo", gradient: "from-[#FFD75A]/20 to-[#FFD75A]/5" },
    paused: { color: "#FFC048", label: "Pausado", gradient: "from-[#FFC048]/20 to-[#FFC048]/5" },
    stopped: { color: "#9BA5B4", label: "Encerrado", gradient: "from-[#9BA5B4]/20 to-[#9BA5B4]/5" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] rounded-2xl p-6 overflow-hidden relative group hover:shadow-[0_0_40px_rgba(255,215,90,0.15)] transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD75A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <h3 className="mb-6" style={{ color: "#E0E0E0" }}>Relógio de Produtividade</h3>
        
        <div className="space-y-6">
          {/* Current Time */}
          <div className="text-center p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
            <p className="text-xs mb-2" style={{ color: "#999999" }}>Hora de Brasília</p>
            <div className="text-3xl tabular-nums" style={{ color: "#FFD75A", fontWeight: 700, letterSpacing: "0.05em" }}>
              {formatTime(currentTime)}
            </div>
          </div>

          {/* Focus Time Gauge */}
          <div className="text-center p-5 rounded-xl bg-gradient-to-br from-[#222222]/50 to-[#222222]/30 border border-[#333333]/50">
            <p className="text-xs mb-3" style={{ color: "#999999" }}>Tempo em Foco</p>
            
            {/* Circular progress */}
            <div className="relative w-32 h-32 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#222222"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#FFD75A"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercent / 100)}`}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.3s ease",
                    filter: "drop-shadow(0 0 6px rgba(255, 215, 90, 0.5))",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl tabular-nums" style={{ color: "#E0E0E0", fontWeight: 700 }}>
                    {secondsToHMS(focusTimer.sessionSeconds)}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#999999" }}>
                    sessão
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1" style={{ color: "#999999" }}>
              <div>{secondsToHM(focusTimer.todaySeconds)} hoje</div>
              <div>{secondsToHM(focusTimer.weekSeconds)} na semana</div>
            </div>
          </div>

          {/* Task in Focus */}
          <div className="text-center p-3 rounded-lg bg-[#222222]/20 border border-[#333333]/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-3 h-3" style={{ color: "#999999" }} />
              <p className="text-xs" style={{ color: "#999999" }}>Tarefa em Foco</p>
            </div>
            <p className="text-sm" style={{ color: focusTimer.taskInFocus ? "#FFD75A" : "#666666" }}>
              {focusTimer.taskInFocus || "Nenhuma tarefa vinculada"}
            </p>
          </div>

          {/* Work Status & Controls */}
          <div className={`p-4 rounded-xl bg-gradient-to-br ${statusConfig[focusTimer.state].gradient} border border-[#333333]/50`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className={`w-3 h-3 rounded-full ${focusTimer.state === "running" ? "animate-pulse" : ""}`}
                style={{
                  backgroundColor: statusConfig[focusTimer.state].color,
                  boxShadow: `0 0 10px ${statusConfig[focusTimer.state].color}80`,
                }}
              />
              <span className="text-sm" style={{ color: statusConfig[focusTimer.state].color, fontWeight: 600 }}>
                {statusConfig[focusTimer.state].label}
              </span>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-center gap-2">
              {focusTimer.state !== "running" && (
                <button
                  onClick={handleStart}
                  className="p-2 rounded-lg transition-all bg-[#FFD75A]/20 text-[#FFD75A] hover:bg-[#FFD75A]/30 hover:shadow-[0_0_15px_rgba(255,215,90,0.3)]"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
              {focusTimer.state === "running" && (
                <button
                  onClick={handlePause}
                  className="p-2 rounded-lg transition-all bg-[#FFC048]/20 text-[#FFC048] hover:bg-[#FFC048]/30 hover:shadow-[0_0_15px_rgba(255,192,72,0.3)]"
                >
                  <Pause className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleStop}
                disabled={focusTimer.state === "stopped" && focusTimer.sessionSeconds === 0}
                className={`p-2 rounded-lg transition-all ${
                  focusTimer.state === "stopped" && focusTimer.sessionSeconds === 0
                    ? "bg-[#222222]/50 text-[#666666] cursor-not-allowed"
                    : "bg-[#9BA5B4]/20 text-[#9BA5B4] hover:bg-[#9BA5B4]/30 hover:shadow-[0_0_15px_rgba(155,165,180,0.3)]"
                }`}
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
