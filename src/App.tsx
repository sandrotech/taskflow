import { useState } from "react";
import { Sidebar } from "./components/dashboard/Sidebar";
import { Toaster } from "./components/ui/sonner";
import { RouterProvider, Route } from "./lib/router";
import { Dashboard } from "./components/screens/Dashboard";
import { Tarefas } from "./components/screens/Tarefas";
import { Cadastros } from "./components/screens/Cadastros";
import { Entregas } from "./components/screens/Entregas";
import { Financeiro } from "./components/screens/Financeiro";
import { Configuracoes } from "./components/screens/Configuracoes";
import {
  Task,
  FocusTimer,
  Client,
  initialTasks,
  initialFocusTimer,
  clients as initialClients,
  deliveries,
  financeHistory,
} from "./lib/mockData";
import { toast } from "sonner@2.0.3";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [focusTimer, setFocusTimer] = useState<FocusTimer>(initialFocusTimer);
  const [clients, setClients] = useState<Client[]>(initialClients);

  const handleTaskCreate = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: `T-${Date.now().toString().slice(-3)}`,
    };
    setTasks([...tasks, task]);
  };

  const handleTaskUpdate = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const handleTaskBindToTimer = (taskId: string) => {
    setFocusTimer({
      ...focusTimer,
      taskInFocus: taskId,
    });
    toast.info("Tarefa vinculada ao relógio de foco.");
  };

  const handleTimerUpdate = (timer: FocusTimer) => {
    setFocusTimer(timer);
  };

  const handleClientCreate = (newClient: Omit<Client, "id">) => {
    const client: Client = {
      ...newClient,
      id: `C-${Date.now().toString().slice(-3)}`,
    };
    setClients([...clients, client]);
  };

  return (
    <RouterProvider initialRoute="/dashboard">
      <div className="min-h-screen" style={{ backgroundColor: "#0F0F0F" }}>
        <Sidebar />

        {/* Main content */}
        <div className="ml-20 min-h-screen">
          <Route path="/dashboard">
            <Dashboard
              tasks={tasks}
              focusTimer={focusTimer}
              onTaskCreate={handleTaskCreate}
              onTaskUpdate={handleTaskUpdate}
              onTaskBindToTimer={handleTaskBindToTimer}
              onTimerUpdate={handleTimerUpdate}
            />
          </Route>

          <Route path="/tarefas">
            <Tarefas tasks={tasks} onTaskUpdate={handleTaskUpdate} onTaskBindToTimer={handleTaskBindToTimer} />
          </Route>

          <Route path="/cadastros">
            <Cadastros clients={clients} onClientCreate={handleClientCreate} />
          </Route>

          <Route path="/entregas">
            <Entregas deliveries={deliveries} />
          </Route>

          <Route path="/financeiro">
            <Financeiro financeHistory={financeHistory} />
          </Route>

          <Route path="/config">
            <Configuracoes />
          </Route>
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              border: "1px solid #333333",
              color: "#E0E0E0",
            },
          }}
        />
      </div>
    </RouterProvider>
  );
}
