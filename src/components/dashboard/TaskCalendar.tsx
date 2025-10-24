import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Task } from "../../lib/mockData";
import { formatDate, deltaDays } from "../../lib/utils/dateHelpers";
import { TaskDetailModal } from "../modals/TaskDetailModal";
import { NewTaskModal } from "../modals/NewTaskModal";
import { toast } from "sonner@2.0.3";

interface TaskCalendarProps {
  tasks: Task[];
  onTaskCreate: (task: Omit<Task, "id">) => void;
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
  onTaskBindToTimer: (taskId: string) => void;
}

const statusConfig = {
  done: { color: "#78E08F", label: "Concluído", emoji: "🟢" },
  producing: { color: "#FFC048", label: "Em produção", emoji: "🟡" },
  awaiting: { color: "#FFD75A", label: "Aguardando aprovação", emoji: "🟠" },
  late: { color: "#FF6B6B", label: "Atrasado", emoji: "🔴" },
};

type ViewMode = "month" | "week";

export function TaskCalendar({ tasks, onTaskCreate, onTaskUpdate, onTaskBindToTimer }: TaskCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); // October 2025

  const monthName = formatDate(currentMonth, "LLLL yyyy");
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const today = new Date(2025, 9, 22);

  const weekDays = viewMode === "month" 
    ? ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    : ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const handleDayClick = (dateKey: string) => {
    setSelectedDate(dateKey);
    setIsSheetOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const getTasksForDay = (dateKey: string) => {
    return tasks.filter(task => task.date === dateKey);
  };

  const selectedDayTasks = selectedDate ? getTasksForDay(selectedDate) : [];

  const getTaskSummary = (dateKey: string) => {
    const dayTasks = getTasksForDay(dateKey);
    if (dayTasks.length === 0) return null;

    const types: { [key: string]: number } = {};
    dayTasks.forEach(task => {
      types[task.type] = (types[task.type] || 0) + 1;
    });

    const summary = Object.entries(types).map(([type, count]) => 
      `${count} ${type.toLowerCase()}${count > 1 ? 's' : ''}`
    ).join(", ");

    return `${dayTasks.length} demanda${dayTasks.length > 1 ? 's' : ''} — ${summary}`;
  };

  const getMondayOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleMarkDone = (taskId: string) => {
    onTaskUpdate(taskId, { status: "done" });
    toast.success("✅ Tarefa concluída");
  };

  // Generate calendar days
  const calendarDays: Array<{ day: number; dateKey: string } | null> = [];
  
  if (viewMode === "week") {
    const monday = getMondayOfWeek(today);
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(monday);
      weekDay.setDate(monday.getDate() + i);
      calendarDays.push({
        day: weekDay.getDate(),
        dateKey: formatDateKey(weekDay.getFullYear(), weekDay.getMonth(), weekDay.getDate()),
      });
    }
  } else {
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        day,
        dateKey: formatDateKey(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      });
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#222222] rounded-2xl p-6 overflow-hidden relative group hover:shadow-[0_0_40px_rgba(255,215,90,0.2)] transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD75A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="mb-1" style={{ color: "#E0E0E0" }}>Agenda de Produção</h3>
              <p className="text-sm" style={{ color: "#999999" }}>
                Organize suas tarefas e prazos em um só lugar.
              </p>
            </div>
            <Button 
              onClick={() => setIsNewTaskOpen(true)}
              className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F] shadow-[0_0_20px_rgba(255,215,90,0.3)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Tarefa
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#E0E0E0] hover:bg-[#222222]"
                onClick={handlePrevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm capitalize" style={{ color: "#E0E0E0", fontWeight: 500, minWidth: "140px", textAlign: "center" }}>
                {monthName}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#E0E0E0] hover:bg-[#222222]"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                <Input
                  placeholder="Filtrar por cliente ou tipo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-[#222222] border-[#333333] text-[#E0E0E0] placeholder:text-[#666666]"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[#222222] rounded-lg p-1">
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    viewMode === "month"
                      ? "bg-[#FFD75A] text-[#0F0F0F]"
                      : "text-[#999999] hover:text-[#E0E0E0]"
                  }`}
                >
                  Mês
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    viewMode === "week"
                      ? "bg-[#FFD75A] text-[#0F0F0F]"
                      : "text-[#999999] hover:text-[#E0E0E0]"
                  }`}
                >
                  Semana
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mb-6">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs py-2"
                  style={{ color: "#999999", fontWeight: 600 }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayData, index) => {
                if (dayData === null) {
                  return <div key={`empty-${index}`} />;
                }

                const { day, dateKey } = dayData;
                const dayTasks = getTasksForDay(dateKey);
                const isToday = dateKey === "2025-10-22";

                return (
                  <motion.button
                    key={dateKey}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDayClick(dateKey)}
                    className={`relative aspect-square rounded-lg p-2 transition-all group/day ${
                      isToday
                        ? "bg-[#FFD75A]/20 border-2 border-[#FFD75A]/50 ring-2 ring-[#FFD75A]/20"
                        : "bg-[#222222]/30 hover:bg-[#222222]/60"
                    }`}
                    title={getTaskSummary(dateKey) || undefined}
                  >
                    <span
                      className="text-sm block mb-1"
                      style={{ color: isToday ? "#FFD75A" : "#E0E0E0" }}
                    >
                      {day}
                    </span>

                    {/* Task indicators */}
                    {dayTasks.length > 0 && (
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        {Array.from(new Set(dayTasks.map(t => t.status))).map((status) => (
                          <div
                            key={status}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: statusConfig[status].color,
                              boxShadow: `0 0 4px ${statusConfig[status].color}80`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Hover tooltip simulation */}
                    {getTaskSummary(dateKey) && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg opacity-0 group-hover/day:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap shadow-lg">
                        <p className="text-xs" style={{ color: "#E0E0E0" }}>
                          {getTaskSummary(dateKey)}
                        </p>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#222222]">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: config.color,
                    boxShadow: `0 0 6px ${config.color}60`,
                  }}
                />
                <span className="text-xs" style={{ color: "#999999" }}>
                  {config.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Day Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="bg-[#1A1A1A] border-l border-[#222222] w-[420px]">
          <SheetHeader>
            <SheetTitle style={{ color: "#E0E0E0" }}>
              {selectedDate && `Tarefas — ${formatDate(selectedDate, "dd MMM yyyy")}`}
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {selectedDayTasks.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: "#999999" }}>
                Nenhuma tarefa para este dia
              </p>
            ) : (
              selectedDayTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-lg bg-[#222222]/50 border border-[#333333] space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="mb-1" style={{ color: "#E0E0E0" }}>
                        {task.title}
                      </h4>
                      <p className="text-sm mb-1" style={{ color: "#999999" }}>
                        {task.client}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-[#FFD75A]/30 text-[#FFD75A]">
                          {task.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-[#999999]/30 text-[#999999]">
                          {task.priority === "critical" ? "Crítica" : task.priority === "high" ? "Alta" : "Normal"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs">
                        {statusConfig[task.status].emoji}
                      </span>
                      <span className="text-xs text-right" style={{ color: statusConfig[task.status].color }}>
                        {statusConfig[task.status].label}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent border-[#333333] text-[#E0E0E0] hover:bg-[#2A2A2A]"
                      onClick={() => handleTaskClick(task)}
                    >
                      Ver detalhes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent border-[#333333] text-[#E0E0E0] hover:bg-[#2A2A2A]"
                      onClick={() => handleMarkDone(task.id)}
                      disabled={task.status === "done"}
                    >
                      Concluir
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onMarkDone={handleMarkDone}
        onBindToTimer={onTaskBindToTimer}
      />

      {/* New Task Modal */}
      <NewTaskModal
        open={isNewTaskOpen}
        onOpenChange={setIsNewTaskOpen}
        onTaskCreate={onTaskCreate}
      />
    </>
  );
}
