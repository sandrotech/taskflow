import { motion } from "motion/react";
import { useState } from "react";
import { Timer, AlertOctagon, Clock } from "lucide-react";
import { Task } from "../../lib/mockData";
import { Badge } from "../ui/badge";
import { deltaDays } from "../../lib/utils/dateHelpers";

interface TarefasProps {
  tasks: Task[];
}

export function Tarefas({ tasks }: TarefasProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const producingTasks = tasks.filter((t) => t.status === "producing");
  const adjustmentTasks = tasks.filter((t) => t.status === "late" || t.status === "awaiting");
  const lateTasks = tasks.filter((t) => t.status === "late");

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return "#78E08F";
      case "producing":
        return "#FFC048";
      case "awaiting":
        return "#FFD75A";
      case "late":
        return "#FF6B6B";
    }
  };

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "critical":
        return "Crítica";
      case "high":
        return "Alta";
      case "normal":
        return "Normal";
    }
  };

  const renderKanbanColumn = (title: string, items: Task[], color: string) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-[#333333]">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}80` }} />
        <h3 style={{ color: "#EAEAEA" }}>{title}</h3>
        <Badge
          variant="outline"
          className="ml-auto"
          style={{ borderColor: `${color}40`, color, backgroundColor: `${color}10` }}
        >
          {items.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {items.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] hover:border-[#FFD75A]/30 transition-all cursor-pointer group"
          >
            <div className="space-y-3">
              <div>
                <h4 className="mb-1 group-hover:text-[#FFD75A] transition-colors" style={{ color: "#EAEAEA" }}>
                  {task.title}
                </h4>
                <p className="text-sm" style={{ color: "#BDBDBD" }}>
                  {task.client} • {task.type}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs" style={{ borderColor: "#FFD75A40", color: "#FFD75A" }}>
                  {getPriorityLabel(task.priority)}
                </Badge>
                <div className="flex items-center gap-1 text-xs ml-auto" style={{ color: getStatusColor(task.status) }}>
                  <Clock className="w-3 h-3" />
                  {deltaDays(task.date)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-sm" style={{ color: "#666666" }}>
            Nenhuma tarefa
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>Tarefas</h1>
            <p className="text-lg" style={{ color: "#BDBDBD" }}>
              Organize produção e ajustes em um só lugar.
            </p>
          </div>

          <div className="flex items-center gap-6 p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" style={{ color: "#FFC048" }} />
              <div>
                <p className="text-xs" style={{ color: "#BDBDBD" }}>Em produção</p>
                <p className="text-sm" style={{ color: "#EAEAEA", fontWeight: 600 }}>
                  {producingTasks.length}
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-[#333333]" />
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" style={{ color: "#FF6B6B" }} />
              <div>
                <p className="text-xs" style={{ color: "#BDBDBD" }}>Em atraso</p>
                <p className="text-sm" style={{ color: "#EAEAEA", fontWeight: 600 }}>
                  {lateTasks.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderKanbanColumn("Pendentes", producingTasks, "#FFC048")}
        {renderKanbanColumn("Em Ajuste", adjustmentTasks, "#FF6B6B")}
      </div>
    </div>
  );
}
