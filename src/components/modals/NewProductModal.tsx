import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Package } from "lucide-react";
import { Product } from "../../lib/mockData";
import { toast } from "sonner@2.0.3";

interface NewProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreate: (product: Omit<Product, "id">) => void;
}

export function NewProductModal({ open, onOpenChange, onProductCreate }: NewProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    defaultPrice: "",
    deliveryTime: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.defaultPrice || !formData.deliveryTime) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    onProductCreate({
      name: formData.name,
      type: formData.type as Product["type"],
      description: formData.description,
      defaultPrice: parseFloat(formData.defaultPrice),
      deliveryTime: parseInt(formData.deliveryTime),
      notes: formData.notes || undefined,
    });

    setFormData({
      name: "",
      type: "",
      description: "",
      defaultPrice: "",
      deliveryTime: "",
      notes: "",
    });
    onOpenChange(false);
    toast.success("Produto adicionado com sucesso 🎨");
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl bg-[#1A1A1A] border-[#FFD75A]/20 p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-[#2C2C2C] bg-gradient-to-r from-[#FFD75A]/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#FFD75A]/20">
                    <Package className="w-6 h-6" style={{ color: "#FFD75A" }} />
                  </div>
                  <div>
                    <DialogTitle style={{ color: "#EAEAEA", marginBottom: "0.25rem" }}>
                      Cadastrar Novo Produto
                    </DialogTitle>
                    <p className="text-sm" style={{ color: "#BDBDBD" }}>
                      Adicione um novo serviço ao catálogo da AK Design
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label style={{ color: "#EAEAEA" }}>Nome do Produto *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Carrossel Premium"
                      className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ color: "#EAEAEA" }}>Tipo *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#222222] border-[#333333]">
                        <SelectItem value="Feed">Feed</SelectItem>
                        <SelectItem value="Carrossel">Carrossel</SelectItem>
                        <SelectItem value="Stories">Stories</SelectItem>
                        <SelectItem value="Identidade">Identidade</SelectItem>
                        <SelectItem value="Adaptação">Adaptação</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label style={{ color: "#EAEAEA" }}>Valor Padrão (R$) *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.defaultPrice}
                      onChange={(e) => setFormData({ ...formData, defaultPrice: e.target.value })}
                      placeholder="0.00"
                      className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label style={{ color: "#EAEAEA" }}>Descrição Breve</Label>
                    <Input
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Ex: Post carrossel com até 10 slides"
                      className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label style={{ color: "#EAEAEA" }}>Prazo Médio de Entrega (dias) *</Label>
                    <Input
                      type="number"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                      placeholder="2"
                      className="bg-[#222222] border-[#333333] text-[#EAEAEA] focus:border-[#FFD75A]"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label style={{ color: "#EAEAEA" }}>Observações Internas</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Notas internas sobre o produto..."
                      className="bg-[#222222] border-[#333333] text-[#EAEAEA] min-h-[100px] focus:border-[#FFD75A]"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#2C2C2C] bg-[#191919]/50">
                <div className="flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
                  >
                    🟡 Cadastrar Produto
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
