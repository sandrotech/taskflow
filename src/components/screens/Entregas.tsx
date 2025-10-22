import { motion } from "motion/react";
import { Delivery } from "../../lib/mockData";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link, Check, Edit3, Upload } from "lucide-react";
import { formatDate } from "../../lib/utils/dateHelpers";

interface EntregasProps {
  deliveries: Delivery[];
}

export function Entregas({ deliveries }: EntregasProps) {
  const getStatusBadge = (status: Delivery["status"]) => {
    const config = {
      Enviado: { color: "#FFD75A" },
      Aguardando: { color: "#FFC048" },
      Aprovado: { color: "#78E08F" },
      "Em Ajuste": { color: "#FF6B6B" },
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
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>Entregas</h1>
            <p className="text-lg" style={{ color: "#BDBDBD" }}>
              Envio, aprovação e histórico de versões.
            </p>
          </div>

          <Button className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]">
            <Upload className="w-4 h-4 mr-2" />
            Upload de Arquivo
          </Button>
        </div>
      </motion.div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {deliveries.map((delivery, index) => (
          <motion.div
            key={delivery.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#212121] rounded-2xl p-6 hover:border-[#FFD75A]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ color: "#EAEAEA" }}>
                    {delivery.client} — {delivery.title}
                  </h3>
                  {getStatusBadge(delivery.status)}
                </div>
                <p className="text-sm" style={{ color: "#BDBDBD" }}>
                  Enviado em {formatDate(delivery.date, "dd MMM yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {delivery.files.map((file) => (
                <Badge key={file} variant="outline" className="text-xs" style={{ borderColor: "#333333", color: "#BDBDBD" }}>
                  {file}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#333333]">
              <Button variant="outline" size="sm" className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]">
                <Link className="w-4 h-4 mr-2" />
                Copiar link
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]">
                <Check className="w-4 h-4 mr-2" />
                Marcar aprovado
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]">
                <Edit3 className="w-4 h-4 mr-2" />
                Solicitar ajuste
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
