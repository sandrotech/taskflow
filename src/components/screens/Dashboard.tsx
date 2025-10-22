import { motion } from "motion/react";
import { KPICard } from "../dashboard/KPICard";
import { TaskCalendar } from "../dashboard/TaskCalendar";
import { ProductivityClock } from "../dashboard/ProductivityClock";
import { DeadlineAlerts } from "../dashboard/DeadlineAlerts";
import { DeliveryStatus } from "../dashboard/DeliveryStatus";
import { Folder, DollarSign, CheckCircle, Clock, Calendar, AlertCircle } from "lucide-react";
import { Task, FocusTimer, kpiData } from "../../lib/mockData";
import { formatDate } from "../../lib/utils/dateHelpers";

interface DashboardProps {
  tasks: Task[];
  focusTimer: FocusTimer;
  onTaskCreate: (task: Omit<Task, "id">) => void;
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
  onTaskBindToTimer: (taskId: string) => void;
  onTimerUpdate: (timer: FocusTimer) => void;
}

export function Dashboard({
  tasks,
  focusTimer,
  onTaskCreate,
  onTaskUpdate,
  onTaskBindToTimer,
  onTimerUpdate,
}: DashboardProps) {
  const today = new Date(2025, 9, 22);
  const pendingTasksCount = tasks.filter((t) => t.status !== "done").length;

  const kpiCards = [
    {
      icon: Folder,
      label: "Projetos Ativos",
      value: `${kpiData.projetosAtivos} projetos`,
      accentColor: "from-[#FFD75A] to-[#FFB84D]",
    },
    {
      icon: DollarSign,
      label: "Valor Total (Mês)",
      value: `R$ ${kpiData.valorMes.toLocaleString("pt-BR")}`,
      accentColor: "from-[#FFD75A] to-[#FFA500]",
    },
    {
      icon: CheckCircle,
      label: "Valor Recebido",
      value: `R$ ${kpiData.valorRecebido.toLocaleString("pt-BR")}`,
      accentColor: "from-[#78E08F] to-[#FFD75A]",
    },
    {
      icon: Clock,
      label: "A Receber",
      value: `R$ ${kpiData.aReceber.toLocaleString("pt-BR")}`,
      accentColor: "from-[#999999] to-[#FFD75A]",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>
              Dashboard — Visão Geral
            </h1>
            <p className="text-lg" style={{ color: "#BDBDBD" }}>
              Bem-vindo, Arthur 👋
            </p>
          </div>

          <div className="flex items-center gap-6 p-4 rounded-xl bg-[#222222]/30 border border-[#333333]/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: "#BDBDBD" }} />
              <div>
                <p className="text-xs" style={{ color: "#BDBDBD" }}>Hoje</p>
                <p className="text-sm" style={{ color: "#EAEAEA", fontWeight: 600 }}>
                  {formatDate(today, "dd MMM yyyy")}
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-[#333333]" />
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: "#FFD75A" }} />
              <div>
                <p className="text-xs" style={{ color: "#BDBDBD" }}>Pendências</p>
                <p className="text-sm" style={{ color: "#EAEAEA", fontWeight: 600 }}>
                  {pendingTasksCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi, index) => (
          <KPICard
            key={kpi.label}
            icon={kpi.icon}
            label={kpi.label}
            value={kpi.value}
            accentColor={kpi.accentColor}
            index={index}
          />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Task Calendar - spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <TaskCalendar
            tasks={tasks}
            onTaskCreate={onTaskCreate}
            onTaskUpdate={onTaskUpdate}
            onTaskBindToTimer={onTaskBindToTimer}
          />
        </div>

        {/* Right sidebar - vertical stack */}
        <div className="flex flex-col gap-6">
          <ProductivityClock focusTimer={focusTimer} onTimerUpdate={onTimerUpdate} />
          <DeadlineAlerts tasks={tasks} />
          <DeliveryStatus />
        </div>
      </div>
    </div>
  );
}
