import { motion, AnimatePresence } from "motion/react";
import { Task } from "../../lib/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { formatDate, deltaDays } from "../../lib/utils/dateHelpers";
import { CheckCircle, Target, Edit3, Clock, User, Calendar, Flag, AlertCircle } from "lucide-react";

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkDone: (taskId: string) => void;
  onBindToTimer: (taskId: string) => void;
  onEdit?: (task: Task) => void;
}

const statusConfig = {
  done: { color: "#78E08F", label: "Concluída", icon: CheckCircle },
  producing: { color: "#FFC048", label: "Em produção", icon: Clock },
  awaiting: { color: "#FFD75A", label: "Aguardando aprovação", icon: AlertCircle },
  late: { color: "#FF6B6B", label: "Atrasada", icon: AlertCircle },
};

export function TaskDetailModal({
  task,
  open,
  onOpenChange,
  onMarkDone,
  onBindToTimer,
  onEdit,
}: TaskDetailModalProps) {
  if (!task) return null;

  const status = statusConfig[task.status];
  const StatusIcon = status.icon;

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

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl bg-[#1A1A1A] border-[#212121] p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header with Status */}
              <div
                className="p-6 border-b border-[#212121]"
                style={{
                  background: `linear-gradient(135deg, ${status.color}15 0%, transparent 100%)`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="mb-2" style={{ color: "#EAEAEA" }}>
                      {task.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <StatusIcon className="w-4 h-4" style={{ color: status.color }} />
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: `${status.color}40`,
                          color: status.color,
                          backgroundColor: `${status.color}10`,
                        }}
                      >
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs mb-1" style={{ color: "#BDBDBD" }}>
                      ID
                    </p>
                    <p className="text-sm" style={{ color: "#FFD75A", fontWeight: 600 }}>
                      {task.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="bg-[#222222] border-[#333333] mb-6">
                    <TabsTrigger
                      value="details"
                      className="data-[state=active]:bg-[#FFD75A]/20 data-[state=active]:text-[#FFD75A]"
                    >
                      Detalhes
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-[#FFD75A]/20 data-[state=active]:text-[#FFD75A]"
                    >
                      Histórico de Versões
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-4 h-4" style={{ color: "#FFD75A" }} />
                          <p className="text-xs" style={{ color: "#BDBDBD" }}>
                            Cliente
                          </p>
                        </div>
                        <p style={{ color: "#EAEAEA" }}>{task.client}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
                        <div className="flex items-center gap-3 mb-2">
                          <Flag className="w-4 h-4" style={{ color: "#FFD75A" }} />
                          <p className="text-xs" style={{ color: "#BDBDBD" }}>
                            Tipo
                          </p>
                        </div>
                        <p style={{ color: "#EAEAEA" }}>{task.type}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-4 h-4" style={{ color: "#FFD75A" }} />
                          <p className="text-xs" style={{ color: "#BDBDBD" }}>
                            Data de Entrega
                          </p>
                        </div>
                        <p style={{ color: "#EAEAEA" }}>{formatDate(task.date, "dd MMM yyyy")}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-4 h-4" style={{ color: "#FFD75A" }} />
                          <p className="text-xs" style={{ color: "#BDBDBD" }}>
                            Prazo
                          </p>
                        </div>
                        <p style={{ color: task.status === "late" ? "#FF6B6B" : "#EAEAEA" }}>
                          {deltaDays(task.date)}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50 col-span-2">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertCircle className="w-4 h-4" style={{ color: "#FFD75A" }} />
                          <p className="text-xs" style={{ color: "#BDBDBD" }}>
                            Prioridade
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: `${getPriorityColor(task.priority)}40`,
                            color: getPriorityColor(task.priority),
                            backgroundColor: `${getPriorityColor(task.priority)}10`,
                          }}
                        >
                          {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                    </div>

                    {/* Notes */}
                    {task.notes && (
                      <div className="p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
                        <p className="text-xs mb-2" style={{ color: "#BDBDBD" }}>
                          Observações
                        </p>
                        <p className="text-sm" style={{ color: "#EAEAEA" }}>
                          {task.notes}
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="history">
                    <div className="text-center py-12">
                      <p style={{ color: "#BDBDBD" }}>Nenhuma versão enviada ainda</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-[#212121] bg-[#222222]/20">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => {
                      onMarkDone(task.id);
                      onOpenChange(false);
                    }}
                    disabled={task.status === "done"}
                    className="flex-1 bg-[#78E08F]/20 text-[#78E08F] border border-[#78E08F]/30 hover:bg-[#78E08F]/30"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como concluída
                  </Button>
                  <Button
                    onClick={() => {
                      onBindToTimer(task.id);
                      onOpenChange(false);
                    }}
                    className="flex-1 bg-[#FFD75A]/20 text-[#FFD75A] border border-[#FFD75A]/30 hover:bg-[#FFD75A]/30"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Vincular ao Relógio (foco)
                  </Button>
                  {onEdit && (
                    <Button
                      onClick={() => {
                        onEdit(task);
                        onOpenChange(false);
                      }}
                      variant="outline"
                      className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
