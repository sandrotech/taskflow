// Date and time helper functions
export const formatDate = (date: Date | string, format: string): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  if (format === "dd MMM yyyy") {
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (format === "dd MMMM") {
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    });
  }

  if (format === "LLLL yyyy") {
    return d.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  }

  if (format === "HH:mm:ss") {
    return d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
  }

  return d.toLocaleDateString("pt-BR");
};

export const secondsToHMS = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export const secondsToHM = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}min`;
};

export const deltaDays = (dateStr: string): string => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dt = new Date(dateStr);
  dt.setHours(0, 0, 0, 0);
  const diff = Math.ceil((dt.getTime() - now.getTime()) / 86400000);

  if (diff < 0) return `${Math.abs(diff)} dias atrasada`;
  if (diff === 0) return "vence hoje";
  if (diff === 1) return "vence amanhã";
  return `vence em ${diff} dias`;
};

export const dueLabel = (dateStr: string): string => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dt = new Date(dateStr);
  dt.setHours(0, 0, 0, 0);
  const diff = Math.ceil((dt.getTime() - now.getTime()) / 86400000);

  if (diff < 0) return `${Math.abs(diff)} dias atrasado`;
  if (diff === 0) return "hoje";
  if (diff === 1) return "amanhã";
  return `em ${diff} dias`;
};

export const getUpcoming = (
  tasks: any[],
  days: number,
  inside: boolean = false
): any[] => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const until = new Date(now.getTime() + days * 86400000);

  return tasks
    .filter((t) => {
      const dt = new Date(t.date);
      dt.setHours(0, 0, 0, 0);
      return inside
        ? dt > now && dt <= until && t.status !== "late"
        : dt > now && dt <= until && t.status !== "late" && t.status !== "done";
    })
    .slice(0, 5);
};
