import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Camera, Package, Trash2 } from "lucide-react";
import { Client } from "../../lib/mockData";
import { toast } from "sonner@2.0.3";

interface EditClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onClientUpdate: (id: string, updates: Partial<Client>) => void;
  onClientDelete: (id: string) => void;
  onManageProducts: (client: Client) => void;
}

export function EditClientModal({
  open,
  onOpenChange,
  client,
  onClientUpdate,
  onClientDelete,
  onManageProducts,
}: EditClientModalProps) {
  const [formData, setFormData] = useState<Partial<Client>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Initialize form when client changes
  useEffect(() => {
    if (client && open) {
      setFormData(client);
    }
  }, [client, open]);

  const handleSave = () => {
    if (!client) return;
    onClientUpdate(client.id, formData);
    onOpenChange(false);
    toast.success("Cliente atualizado com sucesso ✅");
  };

  const handleDelete = () => {
    if (!client) return;
    onClientDelete(client.id);
    setDeleteDialogOpen(false);
    onOpenChange(false);
    toast.success("Cliente excluído com sucesso");
  };

  if (!client) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl bg-[#1A1A1A] border-[#FFD75A]/20 p-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="p-6 border-b border-[#2C2C2C] bg-gradient-to-r from-[#FFD75A]/10 to-transparent">
                  <DialogTitle style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>
                    Editar {client.type}
                  </DialogTitle>
                  <p className="text-sm" style={{ color: "#BDBDBD" }}>
                    Atualize as informações de {client.name}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Left: Photo */}
                    <div className="col-span-1 flex flex-col items-center gap-3">
                      <div className="relative group">
                        <div
                          className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFD75A]/20 to-[#FFB84D]/20 border-2 border-[#FFD75A]/30 flex items-center justify-center overflow-hidden transition-all group-hover:scale-105"
                          style={{
                            backgroundImage: formData.photo ? `url(${formData.photo})` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {!formData.photo && (
                            <span className="text-4xl" style={{ color: "#FFD75A" }}>
                              {client.name.charAt(0)}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <Camera className="w-8 h-8" style={{ color: "#FFD75A" }} />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-[#FFD75A]/30 text-[#FFD75A] hover:bg-[#FFD75A]/10"
                      >
                        Alterar Logo
                      </Button>
                    </div>

                    {/* Right: Form */}
                    <div className="col-span-2 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label style={{ color: "#EAEAEA" }}>Nome *</Label>
                          <Input
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>E-mail</Label>
                          <Input
                            type="email"
                            value={formData.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Telefone</Label>
                          <Input
                            value={formData.phone || ""}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(11) 1234-5678"
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>WhatsApp</Label>
                          <Input
                            value={formData.whatsapp || ""}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            placeholder="(11) 91234-5678"
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Tipo *</Label>
                          <Select
                            value={formData.type}
                            onValueChange={(value) =>
                              setFormData({ ...formData, type: value as Client["type"] })
                            }
                          >
                            <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#222222] border-[#333333]">
                              <SelectItem value="Agência">Agência</SelectItem>
                              <SelectItem value="Cliente Final">Cliente Final</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Limite Mensal (R$)</Label>
                          <Input
                            type="number"
                            value={formData.limit || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, limit: parseFloat(e.target.value) })
                            }
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Saldo Atual (R$)</Label>
                          <Input
                            type="number"
                            value={formData.balance || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, balance: parseFloat(e.target.value) })
                            }
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Status *</Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value) =>
                              setFormData({ ...formData, status: value as Client["status"] })
                            }
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

                        <div className="space-y-2 col-span-2">
                          <Label style={{ color: "#EAEAEA" }}>Observações</Label>
                          <Textarea
                            value={formData.notes || ""}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Notas sobre o cliente..."
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] min-h-[80px] focus:border-[#FFD75A]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#2C2C2C] bg-[#191919]/50">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(true)}
                      className="bg-transparent border-[#FF6B6B]/30 text-[#FF6B6B] hover:bg-[#FF6B6B]/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir Cliente
                    </Button>
                    <div className="flex items-center gap-3">
                      {client.type === "Agência" && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            onManageProducts(client);
                            onOpenChange(false);
                          }}
                          className="bg-transparent border-[#FFD75A]/30 text-[#FFD75A] hover:bg-[#FFD75A]/10"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Gerenciar Produtos Vinculados
                        </Button>
                      )}
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
                      >
                        💾 Salvar Alterações
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#FF6B6B]/30">
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "#EAEAEA" }}>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription style={{ color: "#BDBDBD" }}>
              Tem certeza que deseja excluir {client?.name}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-[#FF6B6B] text-white hover:bg-[#FF5555]"
            >
              Confirmar Exclusão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
