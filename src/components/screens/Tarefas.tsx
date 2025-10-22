import { motion } from "motion/react";
import { useState } from "react";
import { Timer, AlertOctagon, BarChart3, Clock } from "lucide-react";
import { Task } from "../../lib/mockData";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TaskDetailModal } from "../modals/TaskDetailModal";
import { deltaDays } from "../../lib/utils/dateHelpers";

interface TarefasProps {
  tasks: Task[];
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
  onTaskBindToTimer: (taskId: string) => void;
}

export function Tarefas({ tasks, onTaskUpdate, onTaskBindToTimer }: TarefasProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const producingTasks = tasks.filter((t) => t.status === "producing");
  const adjustmentTasks = tasks.filter((t) => t.status === "late" || t.status === "awaiting");
  const completedTasks = tasks.filter((t) => t.status === "done");
  const lateTasks = tasks.filter((t) => t.status === "late");

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleMarkDone = (taskId: string) => {
    onTaskUpdate(taskId, { status: "done" });
  };

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

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "critical":
        return "#FF6B6B";
      case "high":
        return "#FFC048";
      case "normal":
        return "#A8B0BE";
    }
  };

  const renderTaskCard = (task: Task, index: number) => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => handleTaskClick(task)}
      className="p-5 rounded-xl bg-[rgba(34,34,34,0.5)] border border-[#212121] hover:border-[#FFD75A]/30 transition-all cursor-pointer group relative overflow-hidden"
    >
      {/* Status indicator dot */}
      <div
        className="absolute top-4 right-4 w-3 h-3 rounded-full"
        style={{
          backgroundColor: getStatusColor(task.status),
          boxShadow: `0 0 8px ${getStatusColor(task.status)}80`,
        }}
      />

      <div className="space-y-3">
        <div className="pr-6">
          <h4 className="mb-1 group-hover:text-[#FFD75A] transition-colors" style={{ color: "#EAEAEA" }}>
            {task.title}
          </h4>
          <p className="text-sm" style={{ color: "#BDBDBD" }}>
            {task.client} • {task.type}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: `${getPriorityColor(task.priority)}40`,
              color: getPriorityColor(task.priority),
              backgroundColor: `${getPriorityColor(task.priority)}10`,
            }}
          >
            {getPriorityLabel(task.priority)}
          </Badge>
          <div className="flex items-center gap-1 text-xs ml-auto" style={{ color: getStatusColor(task.status) }}>
            <Clock className="w-3 h-3" />
            {deltaDays(task.date)}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Calculate stats
  const totalCompleted = completedTasks.length;
  const totalLate = lateTasks.length;
  const avgTime = "2.3 dias"; // Mock - would be calculated from actual data

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

          <div className="flex items-center gap-4">
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

            <Button
              onClick={() => setIsStatsOpen(true)}
              className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Estatísticas
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="pendentes" className="w-full">
        <TabsList className="bg-[#222222] border-[#333333] mb-6">
          <TabsTrigger
            value="pendentes"
            className="data-[state=active]:bg-[#FFC048]/20 data-[state=active]:text-[#FFC048]"
          >
            🟡 Pendentes ({producingTasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="ajuste"
            className="data-[state=active]:bg-[#FF6B6B]/20 data-[state=active]:text-[#FF6B6B]"
          >
            🔴 Em Ajuste ({adjustmentTasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="concluidas"
            className="data-[state=active]:bg-[#78E08F]/20 data-[state=active]:text-[#78E08F]"
          >
            🟢 Concluídas ({completedTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {producingTasks.map((task, index) => renderTaskCard(task, index))}
            {producingTasks.length === 0 && (
              <div className="col-span-full text-center py-12" style={{ color: "#666666" }}>
                Nenhuma tarefa pendente
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ajuste">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adjustmentTasks.map((task, index) => renderTaskCard(task, index))}
            {adjustmentTasks.length === 0 && (
              <div className="col-span-full text-center py-12" style={{ color: "#666666" }}>
                Nenhuma tarefa em ajuste
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="concluidas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map((task, index) => renderTaskCard(task, index))}
            {completedTasks.length === 0 && (
              <div className="col-span-full text-center py-12" style={{ color: "#666666" }}>
                Nenhuma tarefa concluída
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onMarkDone={handleMarkDone}
        onBindToTimer={onTaskBindToTimer}
      />

      {/* Statistics Modal */}
      <Dialog open={isStatsOpen} onOpenChange={setIsStatsOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#212121] max-w-2xl">
          <DialogHeader>
            <DialogTitle style={{ color: "#EAEAEA" }}>Estatísticas de Tarefas</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#78E08F]/10 to-transparent border border-[#78E08F]/30 text-center">
                <div className="text-4xl mb-2" style={{ color: "#78E08F", fontWeight: 700 }}>
                  {totalCompleted}
                </div>
                <p className="text-sm" style={{ color: "#BDBDBD" }}>
                  Tarefas Finalizadas
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/30 text-center">
                <div className="text-4xl mb-2" style={{ color: "#FF6B6B", fontWeight: 700 }}>
                  {totalLate}
                </div>
                <p className="text-sm" style={{ color: "#BDBDBD" }}>
                  Tarefas Atrasadas
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-[#FFD75A]/10 to-transparent border border-[#FFD75A]/30 text-center">
                <div className="text-4xl mb-2" style={{ color: "#FFD75A", fontWeight: 700 }}>
                  {avgTime}
                </div>
                <p className="text-sm" style={{ color: "#BDBDBD" }}>
                  Tempo Médio
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#222222]/30 border border-[#333333]">
              <h4 className="mb-4" style={{ color: "#EAEAEA" }}>
                Resumo Geral
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: "#BDBDBD" }}>Total de Tarefas:</span>
                  <span style={{ color: "#EAEAEA", fontWeight: 600 }}>{tasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#BDBDBD" }}>Em Produção:</span>
                  <span style={{ color: "#FFC048", fontWeight: 600 }}>{producingTasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#BDBDBD" }}>Aguardando Aprovação:</span>
                  <span style={{ color: "#FFD75A", fontWeight: 600 }}>
                    {tasks.filter((t) => t.status === "awaiting").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#BDBDBD" }}>Taxa de Conclusão:</span>
                  <span style={{ color: "#78E08F", fontWeight: 600 }}>
                    {tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
