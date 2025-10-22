import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Product, ClientProduct, Client } from "../../lib/mockData";
import { toast } from "sonner@2.0.3";

interface LinkProductsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  products: Product[];
  clientProducts: ClientProduct[];
  onSave: (clientId: string, productLinks: ClientProduct[]) => void;
}

export function LinkProductsModal({
  open,
  onOpenChange,
  client,
  products,
  clientProducts,
  onSave,
}: LinkProductsModalProps) {
  const [productLinks, setProductLinks] = useState<ClientProduct[]>([]);

  // Initialize product links when modal opens or client changes
  useEffect(() => {
    if (client && open) {
      const links = products.map((product) => {
        const existingLink = clientProducts.find(
          (cp) => cp.clientId === client.id && cp.productId === product.id
        );
        return (
          existingLink || {
            clientId: client.id,
            productId: product.id,
            customPrice: product.defaultPrice,
            isActive: false,
          }
        );
      });
      setProductLinks(links);
    }
  }, [client, open, products, clientProducts]);

  const handlePriceChange = (productId: string, price: string) => {
    setProductLinks(
      productLinks.map((link) =>
        link.productId === productId ? { ...link, customPrice: parseFloat(price) || 0 } : link
      )
    );
  };

  const handleToggle = (productId: string, isActive: boolean) => {
    setProductLinks(
      productLinks.map((link) => (link.productId === productId ? { ...link, isActive } : link))
    );
  };

  const handleSave = () => {
    if (!client) return;
    onSave(client.id, productLinks);
    onOpenChange(false);
    toast.success(`Tabela personalizada salva para ${client.name} ✅`);
  };

  if (!client) return null;

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-4xl bg-[#1A1A1A] border-[#FFD75A]/20 p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-[#2C2C2C] bg-gradient-to-r from-[#FFD75A]/10 to-transparent">
                <DialogTitle style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>
                  Produtos e Serviços vinculados à {client.name}
                </DialogTitle>
                <p className="text-sm" style={{ color: "#BDBDBD" }}>
                  Configure preços personalizados para este {client.type.toLowerCase()}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="rounded-xl border border-[#2C2C2C] overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 bg-[#191919]">
                    <div className="col-span-1 flex items-center justify-center">
                      <p className="text-xs" style={{ color: "#BDBDBD" }}>
                        Ativo
                      </p>
                    </div>
                    <div className="col-span-5">
                      <p className="text-xs" style={{ color: "#BDBDBD" }}>
                        Produto
                      </p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-xs" style={{ color: "#BDBDBD" }}>
                        Preço Padrão
                      </p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-xs" style={{ color: "#BDBDBD" }}>
                        Preço para este Cliente
                      </p>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-[#2C2C2C]">
                    {products.map((product, index) => {
                      const link = productLinks.find((l) => l.productId === product.id);
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="grid grid-cols-12 gap-4 p-4 hover:bg-[#222222]/30 transition-colors"
                        >
                          <div className="col-span-1 flex items-center justify-center">
                            <Switch
                              checked={link?.isActive || false}
                              onCheckedChange={(checked) => handleToggle(product.id, checked)}
                              className="data-[state=checked]:bg-[#FFD75A]"
                            />
                          </div>
                          <div className="col-span-5 flex flex-col justify-center">
                            <p style={{ color: "#EAEAEA" }}>{product.name}</p>
                            <p className="text-xs" style={{ color: "#BDBDBD" }}>
                              {product.description}
                            </p>
                          </div>
                          <div className="col-span-3 flex items-center">
                            <div className="px-3 py-2 rounded-lg bg-[#222222]/50">
                              <p className="text-sm" style={{ color: "#999999" }}>
                                R$ {product.defaultPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-3 flex items-center">
                            <div className="relative w-full">
                              <span
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                                style={{ color: "#FFD75A" }}
                              >
                                R$
                              </span>
                              <Input
                                type="number"
                                step="0.01"
                                value={link?.customPrice || product.defaultPrice}
                                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                                disabled={!link?.isActive}
                                className="pl-10 bg-[#222222] border-[#FFD75A]/30 text-[#EAEAEA] focus:border-[#FFD75A] transition-colors"
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#2C2C2C] bg-[#191919]/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: "#BDBDBD" }}>
                    {productLinks.filter((l) => l.isActive).length} produto(s) vinculado(s)
                  </p>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
                    >
                      🟡 Salvar Preços Personalizados
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
