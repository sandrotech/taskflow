import { motion } from "motion/react";
import { useState } from "react";
import { Client } from "../../lib/mockData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Edit2, Slash, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface CadastrosProps {
  clients: Client[];
  onClientCreate: (client: Omit<Client, "id">) => void;
}

export function Cadastros({ clients, onClientCreate }: CadastrosProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    limit: "",
    status: "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.limit) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    onClientCreate({
      name: formData.name,
      email: formData.email,
      type: formData.type as Client["type"],
      limit: parseFloat(formData.limit),
      balance: 0,
      status: formData.status as Client["status"],
    });

    setFormData({ name: "", email: "", type: "", limit: "", status: "active" });
    toast.success("Cliente cadastrado com sucesso!");
  };

  const getStatusBadge = (status: Client["status"]) => {
    const config = {
      active: { label: "Ativo", color: "#78E08F" },
      inactive: { label: "Inativo", color: "#666666" },
      warning: { label: "Atenção", color: "#FFC048" },
    };
    const { label, color } = config[status];
    return (
      <Badge variant="outline" style={{ borderColor: `${color}40`, color, backgroundColor: `${color}10` }}>
        {label}
      </Badge>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>Cadastros</h1>
        <p className="text-lg" style={{ color: "#BDBDBD" }}>
          Gerencie clientes, agências e limites.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#212121] rounded-2xl p-6"
        >
          <h3 className="mb-6" style={{ color: "#EAEAEA" }}>
            Novo Cliente/Agência
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Nome *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: TechStartup"
                className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
              />
            </div>

            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>E-mail</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contato@exemplo.com"
                className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
              />
            </div>

            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[#222222] border-[#333333]">
                  <SelectItem value="Agência">Agência</SelectItem>
                  <SelectItem value="Cliente Final">Cliente Final</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Limite Mensal (R$) *</Label>
              <Input
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                placeholder="1000"
                className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
              />
            </div>

            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#222222] border-[#333333]">
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar
            </Button>
          </form>
        </motion.div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#212121] rounded-2xl p-6"
        >
          <h3 className="mb-6" style={{ color: "#EAEAEA" }}>
            Clientes Cadastrados
          </h3>

          <div className="rounded-lg border border-[#333333] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#222222]/50 hover:bg-[#222222]/50">
                  <TableHead style={{ color: "#BDBDBD" }}>Nome</TableHead>
                  <TableHead style={{ color: "#BDBDBD" }}>Tipo</TableHead>
                  <TableHead style={{ color: "#BDBDBD" }}>Limite R$</TableHead>
                  <TableHead style={{ color: "#BDBDBD" }}>Saldo R$</TableHead>
                  <TableHead style={{ color: "#BDBDBD" }}>Status</TableHead>
                  <TableHead style={{ color: "#BDBDBD" }}>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="border-[#333333]">
                    <TableCell style={{ color: "#EAEAEA" }}>{client.name}</TableCell>
                    <TableCell style={{ color: "#BDBDBD" }}>{client.type}</TableCell>
                    <TableCell style={{ color: "#EAEAEA" }}>R$ {client.limit.toLocaleString("pt-BR")}</TableCell>
                    <TableCell
                      style={{ color: client.balance < 0 ? "#FF6B6B" : "#78E08F", fontWeight: 600 }}
                    >
                      R$ {client.balance.toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#BDBDBD] hover:text-[#FFD75A]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#BDBDBD] hover:text-[#FF6B6B]"
                        >
                          <Slash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
