import { motion } from "motion/react";
import { AlertCircle, Clock, CheckCircle2, Bell } from "lucide-react";
import { Task } from "../../lib/mockData";
import { deltaDays } from "../../lib/utils/dateHelpers";

interface DeadlineAlertsProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export function DeadlineAlerts({ tasks, onTaskClick }: DeadlineAlertsProps) {
  const urgentTasks = tasks.filter(t => t.status === "late");
  const upcomingTasks = tasks.filter(t => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const taskDate = new Date(t.date);
    taskDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil((taskDate.getTime() - now.getTime()) / 86400000);
    return diff >= 0 && diff <= 2 && t.status !== "late" && t.status !== "done";
  }).slice(0, 3);

  const withinDeadline = tasks.filter(t => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const taskDate = new Date(t.date);
    taskDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil((taskDate.getTime() - now.getTime()) / 86400000);
    return diff > 2 && diff <= 7 && t.status !== "late" && t.status !== "done";
  }).slice(0, 3);

  const groups = [
    {
      title: "🔴 Urgentes",
      items: urgentTasks,
      color: "#FF6B6B",
    },
    {
      title: "🟡 Próximos",
      items: upcomingTasks,
      color: "#FFC048",
    },
    {
      title: "⚪ Dentro do prazo",
      items: withinDeadline,
      color: "#9BA5B4",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] rounded-2xl p-6 overflow-hidden relative group hover:shadow-[0_0_40px_rgba(255,215,90,0.15)] transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD75A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 style={{ color: "#E0E0E0" }}>Alertas de Prazos</h3>
          <div className="relative">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${urgentTasks.length > 0 ? 'bg-[#FF6B6B] animate-pulse' : 'bg-[#333333]'}`}>
              <span className="text-xs" style={{ color: urgentTasks.length > 0 ? "#0F0F0F" : "#999999", fontWeight: 700 }}>
                {urgentTasks.length}
              </span>
            </div>
            {urgentTasks.length > 0 && (
              <div className="absolute inset-0 rounded-full bg-[#FF6B6B] animate-ping opacity-20" />
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {groups.map((group, groupIndex) => (
            group.items.length > 0 && (
              <div key={group.title}>
                <h4 className="text-xs mb-2" style={{ color: "#999999", fontWeight: 600 }}>
                  {group.title}
                </h4>
                <div className="space-y-2">
                  {group.items.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + groupIndex * 0.1 + index * 0.05 }}
                      className="p-3 rounded-lg bg-[#222222]/30 border border-[#333333]/50 hover:border-[#FFD75A]/30 transition-all cursor-pointer group/alert"
                      onClick={() => onTaskClick?.(task)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm mb-0.5 truncate group-hover/alert:translate-x-1 transition-transform" style={{ color: "#E0E0E0" }}>
                            {task.title}
                          </p>
                          <p className="text-xs truncate" style={{ color: "#999999" }}>
                            {task.client}
                          </p>
                        </div>
                        <div className="text-xs whitespace-nowrap" style={{ color: group.color, fontWeight: 600 }}>
                          {deltaDays(task.date)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </motion.div>
  );
}
