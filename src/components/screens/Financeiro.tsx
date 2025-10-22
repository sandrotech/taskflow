import { motion } from "motion/react";
import { FinanceEntry, revenueByClient } from "../../lib/mockData";
import { KPICard } from "../dashboard/KPICard";
import { TopClients } from "../dashboard/TopClients";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DollarSign, Hourglass, Target, Download, FileText } from "lucide-react";

interface FinanceiroProps {
  financeHistory: FinanceEntry[];
}

export function Financeiro({ financeHistory }: FinanceiroProps) {
  const totalReceived = financeHistory
    .filter((entry) => entry.status === "Pago")
    .reduce((sum, entry) => sum + entry.value, 0);

  const totalPending = financeHistory
    .filter((entry) => entry.status === "A Receber")
    .reduce((sum, entry) => sum + entry.value, 0);

  const monthlyGoal = 5000;
  const goalProgress = Math.round((totalReceived / monthlyGoal) * 100);

  const kpiCards = [
    {
      icon: DollarSign,
      label: "Total Recebido",
      value: `R$ ${totalReceived.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      accentColor: "from-[#78E08F] to-[#FFD75A]",
    },
    {
      icon: Hourglass,
      label: "A Receber",
      value: `R$ ${totalPending.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      accentColor: "from-[#FFC048] to-[#FFD75A]",
    },
    {
      icon: Target,
      label: "Meta Mensal",
      value: `R$ ${monthlyGoal.toLocaleString("pt-BR")} • ${goalProgress}%`,
      accentColor: "from-[#FFD75A] to-[#FFB84D]",
    },
  ];

  const getStatusBadge = (status: FinanceEntry["status"]) => {
    const config = {
      Pago: { color: "#78E08F" },
      "A Receber": { color: "#FFC048" },
    };
    const { color } = config[status];
    return (
      <Badge variant="outline" style={{ borderColor: `${color}40`, color, backgroundColor: `${color}10` }}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>Financeiro</h1>
        <p className="text-lg" style={{ color: "#BDBDBD" }}>
          Clareza e previsibilidade do faturamento.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Client */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <TopClients />
        </motion.div>

        {/* Finance History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#212121] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 style={{ color: "#EAEAEA" }}>Histórico de Entradas</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-transparent border-[#333333] text-[#BDBDBD] hover:bg-[#222222]">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-[#333333] text-[#BDBDBD] hover:bg-[#222222]">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-[#333333] overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#222222]/50 hover:bg-[#222222]/50">
                    <TableHead style={{ color: "#BDBDBD" }}>Data</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Cliente</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Tipo</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Descrição</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Valor</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financeHistory.map((entry, index) => (
                    <TableRow key={index} className="border-[#333333]">
                      <TableCell style={{ color: "#BDBDBD" }}>{entry.date}</TableCell>
                      <TableCell style={{ color: "#EAEAEA" }}>{entry.client}</TableCell>
                      <TableCell style={{ color: "#BDBDBD" }}>{entry.type}</TableCell>
                      <TableCell style={{ color: "#BDBDBD" }}>{entry.desc}</TableCell>
                      <TableCell style={{ color: "#EAEAEA", fontWeight: 600 }}>
                        R$ {entry.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
