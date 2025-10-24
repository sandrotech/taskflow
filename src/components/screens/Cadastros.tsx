import { motion } from "motion/react";
import { useState } from "react";
import { Client, Product, ClientProduct } from "../../lib/mockData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Edit2, Trash2, Package as PackageIcon, Plus, Camera, Puzzle } from "lucide-react";
import { EditClientModal } from "../modals/EditClientModal";
import { LinkProductsModal } from "../modals/LinkProductsModal";
import { NewProductModal } from "../modals/NewProductModal";
import { toast } from "sonner@2.0.3";

interface CadastrosProps {
  clients: Client[];
  products: Product[];
  clientProducts: ClientProduct[];
  onClientCreate: (client: Omit<Client, "id">) => void;
  onClientUpdate: (id: string, updates: Partial<Client>) => void;
  onClientDelete: (id: string) => void;
  onProductCreate: (product: Omit<Product, "id">) => void;
  onClientProductsUpdate: (clientId: string, productLinks: ClientProduct[]) => void;
}

export function Cadastros({
  clients,
  products,
  clientProducts,
  onClientCreate,
  onClientUpdate,
  onClientDelete,
  onProductCreate,
  onClientProductsUpdate,
}: CadastrosProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    type: "",
    limit: "",
    status: "active",
    notes: "",
  });

  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [linkingClient, setLinkingClient] = useState<Client | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.limit) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const newClient: Omit<Client, "id"> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      type: formData.type as Client["type"],
      limit: parseFloat(formData.limit),
      balance: 0,
      status: formData.status as Client["status"],
      notes: formData.notes,
    };

    onClientCreate(newClient);

    // If it's an agency, open link products modal
    if (formData.type === "Agência") {
      const createdClient: Client = {
        ...newClient,
        id: `C-${Date.now().toString().slice(-3)}`,
      };
      setLinkingClient(createdClient);
      setIsLinkModalOpen(true);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      type: "",
      limit: "",
      status: "active",
      notes: "",
    });
    toast.success("Cliente cadastrado com sucesso!");
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsEditModalOpen(true);
  };

  const handleManageProducts = (client: Client) => {
    setLinkingClient(client);
    setIsLinkModalOpen(true);
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

  const getBalanceColor = (balance: number, limit: number) => {
    if (balance < 0) return "#FF6B6B";
    if (balance > limit * 0.8) return "#FFC048";
    return "#78E08F";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>Cadastros</h1>
            <p className="text-lg" style={{ color: "#BDBDBD" }}>
              Gerencie clientes, agências e catálogo de produtos.
            </p>
          </div>
          <Button
            onClick={() => setIsNewProductModalOpen(true)}
            className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
          >
            <Puzzle className="w-4 h-4 mr-2" />
            🧩 Cadastrar Produtos
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-10 gap-6">
        {/* Form Card - 30% */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-3 backdrop-blur-xl bg-[rgba(25,25,25,0.72)] border border-[#2C2C2C] rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(255,215,90,0.15)] transition-all"
        >
          <h3 className="mb-6" style={{ color: "#EAEAEA" }}>
            Novo Cliente/Agência
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo Upload */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD75A]/20 to-[#FFB84D]/20 border-2 border-[#FFD75A]/30 flex items-center justify-center overflow-hidden transition-all group-hover:scale-105">
                  <span className="text-3xl" style={{ color: "#FFD75A" }}>
                    {formData.name ? formData.name.charAt(0) : "?"}
                  </span>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer">
                    <Camera className="w-6 h-6" style={{ color: "#FFD75A" }} />
                  </div>
                </div>
              </div>
              <p className="text-xs" style={{ color: "#BDBDBD" }}>
                Clique para adicionar logo
              </p>
            </div>

            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Nome *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: TechStartup"
                className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>E-mail</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contato@exemplo.com"
                className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label style={{ color: "#EAEAEA" }}>Telefone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 1234-5678"
                  className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label style={{ color: "#EAEAEA" }}>WhatsApp</Label>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="(11) 91234-5678"
                  className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A] transition-colors"
                />
              </div>
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
                className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A] transition-colors"
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
                  <SelectItem value="warning">Atenção</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Observações</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Notas sobre o cliente..."
                className="bg-[#222222] border-[#333333] text-[#EAEAEA] min-h-[80px] focus:border-[#FFD75A] transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <Plus className="w-4 h-4 mr-2" />
              🟡 Cadastrar
            </Button>
          </form>
        </motion.div>

        {/* Table Card - 70% */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-7 backdrop-blur-xl bg-[rgba(25,25,25,0.72)] border border-[#2C2C2C] rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(255,215,90,0.15)] transition-all"
        >
          <h3 className="mb-6" style={{ color: "#EAEAEA" }}>
            Clientes Cadastrados ({clients.length})
          </h3>

          <div className="rounded-xl border border-[#2C2C2C] overflow-hidden">
            <div className="max-h-[700px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#191919] hover:bg-[#191919] border-[#2C2C2C]">
                    <TableHead className="w-16" style={{ color: "#BDBDBD" }}>
                      Foto
                    </TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Nome</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Tipo</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Limite R$</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Saldo R$</TableHead>
                    <TableHead style={{ color: "#BDBDBD" }}>Status</TableHead>
                    <TableHead className="text-right" style={{ color: "#BDBDBD" }}>
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client, index) => (
                    <TableRow
                      key={client.id}
                      className="border-[#2C2C2C] hover:bg-[#222222]/30 transition-colors"
                    >
                      <TableCell>
                        <div
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD75A]/20 to-[#FFB84D]/20 border border-[#FFD75A]/30 flex items-center justify-center overflow-hidden"
                          style={{
                            backgroundImage: client.photo ? `url(${client.photo})` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {!client.photo && (
                            <span style={{ color: "#FFD75A" }}>{client.name.charAt(0)}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p style={{ color: "#EAEAEA" }}>{client.name}</p>
                          {client.email && (
                            <p className="text-xs" style={{ color: "#666666" }}>
                              {client.email}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: "#FFD75A40",
                            color: "#FFD75A",
                            backgroundColor: "#FFD75A10",
                          }}
                        >
                          {client.type}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: "#EAEAEA" }}>
                        R$ {client.limit.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell
                        style={{
                          color: getBalanceColor(client.balance, client.limit),
                          fontWeight: 600,
                        }}
                      >
                        R$ {client.balance.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell>{getStatusBadge(client.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(client)}
                            className="h-8 w-8 text-[#BDBDBD] hover:text-[#FFD75A] hover:bg-[#FFD75A]/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          {client.type === "Agência" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleManageProducts(client)}
                              className="h-8 w-8 text-[#BDBDBD] hover:text-[#FFD75A] hover:bg-[#FFD75A]/10"
                            >
                              <PackageIcon className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <EditClientModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        client={editingClient}
        onClientUpdate={onClientUpdate}
        onClientDelete={onClientDelete}
        onManageProducts={handleManageProducts}
      />

      <LinkProductsModal
        open={isLinkModalOpen}
        onOpenChange={setIsLinkModalOpen}
        client={linkingClient}
        products={products}
        clientProducts={clientProducts}
        onSave={onClientProductsUpdate}
      />

      <NewProductModal
        open={isNewProductModalOpen}
        onOpenChange={setIsNewProductModalOpen}
        onProductCreate={onProductCreate}
      />
    </div>
  );
}
