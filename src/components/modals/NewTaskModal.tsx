import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { ChevronLeft, ChevronRight, Plus, X, Upload, Check } from "lucide-react";
import { Task } from "../../lib/mockData";
import { toast } from "sonner@2.0.3";

interface Card {
  id: string;
  text: string;
  imageUrl?: string;
  notes: string;
}

interface NewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreate: (task: Omit<Task, "id">) => void;
}

export function NewTaskModal({ open, onOpenChange, onTaskCreate }: NewTaskModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    type: "",
    priority: "",
    date: "",
    notes: "",
  });
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleAddCard = () => {
    const newCard: Card = {
      id: `card-${Date.now()}`,
      text: "",
      notes: "",
    };
    setCards([...cards, newCard]);
    setCurrentCardIndex(cards.length);
  };

  const handleUpdateCard = (id: string, updates: Partial<Card>) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, ...updates } : card)));
  };

  const handleRemoveCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
    if (currentCardIndex >= cards.length - 1) {
      setCurrentCardIndex(Math.max(0, cards.length - 2));
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.title || !formData.client || !formData.type || !formData.priority || !formData.date) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleConfirm = () => {
    onTaskCreate({
      title: formData.title,
      client: formData.client,
      type: formData.type as Task["type"],
      date: formData.date,
      status: "producing",
      priority: formData.priority as Task["priority"],
      notes: formData.notes,
    });

    // Reset form
    setFormData({ title: "", client: "", type: "", priority: "", date: "", notes: "" });
    setCards([]);
    setStep(1);
    onOpenChange(false);
    toast.success("✅ Tarefa criada com sucesso!");
  };

  const currentCard = cards[currentCardIndex];

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-4xl bg-[#1A1A1A] border-[#212121] p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Progress Header */}
              <div className="p-6 border-b border-[#212121] bg-gradient-to-r from-[#FFD75A]/10 to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <h2 style={{ color: "#EAEAEA" }}>Nova Tarefa</h2>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`w-8 h-1 rounded-full transition-all ${
                          s <= step ? "bg-[#FFD75A]" : "bg-[#333333]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#BDBDBD" }}>
                  {step === 1 && "Etapa 1: Informações Gerais"}
                  {step === 2 && "Etapa 2: Cards do Projeto"}
                  {step === 3 && "Etapa 3: Resumo Geral"}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {/* Step 1: General Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label style={{ color: "#EAEAEA" }}>Título da Tarefa *</Label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ex: Carrossel Lançamento - v2"
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Cliente *</Label>
                          <Select
                            value={formData.client}
                            onValueChange={(value) => setFormData({ ...formData, client: value })}
                          >
                            <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                              <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#222222] border-[#333333]">
                              <SelectItem value="TechStartup">TechStartup</SelectItem>
                              <SelectItem value="Silva & Associados">Silva & Associados</SelectItem>
                              <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                              <SelectItem value="AS Eventos">AS Eventos</SelectItem>
                            </SelectContent>
                          </Select>
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
                              <SelectItem value="Adaptação">Adaptação</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Prioridade *</Label>
                          <Select
                            value={formData.priority}
                            onValueChange={(value) => setFormData({ ...formData, priority: value })}
                          >
                            <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                              <SelectValue placeholder="Selecione a prioridade" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#222222] border-[#333333]">
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                              <SelectItem value="critical">Crítica</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: "#EAEAEA" }}>Data de Entrega *</Label>
                          <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            min="2025-10-22"
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
                          />
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label style={{ color: "#EAEAEA" }}>Observações</Label>
                          <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Adicione notas sobre a tarefa..."
                            className="bg-[#222222] border-[#333333] text-[#EAEAEA] min-h-[100px]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Cards */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {cards.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="mb-4" style={{ color: "#BDBDBD" }}>
                            Nenhum card adicionado ainda
                          </p>
                          <Button
                            onClick={handleAddCard}
                            className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Primeiro Card
                          </Button>
                        </div>
                      ) : (
                        <>
                          {/* Card Navigation */}
                          <div className="flex items-center justify-between">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                              disabled={currentCardIndex === 0}
                              className="bg-transparent border-[#333333] text-[#EAEAEA]"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>

                            <div className="text-center">
                              <p style={{ color: "#FFD75A" }}>
                                Card {currentCardIndex + 1} de {cards.length}
                              </p>
                            </div>

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                setCurrentCardIndex(Math.min(cards.length - 1, currentCardIndex + 1))
                              }
                              disabled={currentCardIndex === cards.length - 1}
                              className="bg-transparent border-[#333333] text-[#EAEAEA]"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Current Card */}
                          {currentCard && (
                            <div className="p-6 rounded-xl bg-[#222222]/30 border border-[#333333] space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 style={{ color: "#EAEAEA" }}>Editar Card</h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveCard(currentCard.id)}
                                  className="text-[#FF6B6B] hover:bg-[#FF6B6B]/20"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label style={{ color: "#EAEAEA" }}>Texto do Card</Label>
                                  <Textarea
                                    value={currentCard.text}
                                    onChange={(e) =>
                                      handleUpdateCard(currentCard.id, { text: e.target.value })
                                    }
                                    placeholder="Digite o texto que vai aparecer no card..."
                                    className="bg-[#1A1A1A] border-[#333333] text-[#EAEAEA] min-h-[100px]"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label style={{ color: "#EAEAEA" }}>Imagem de Referência</Label>
                                  <div className="flex items-center gap-3">
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      className="bg-[#1A1A1A] border-[#333333] text-[#EAEAEA]"
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="bg-transparent border-[#333333] text-[#EAEAEA]"
                                    >
                                      <Upload className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label style={{ color: "#EAEAEA" }}>Instruções</Label>
                                  <Textarea
                                    value={currentCard.notes}
                                    onChange={(e) =>
                                      handleUpdateCard(currentCard.id, { notes: e.target.value })
                                    }
                                    placeholder='Ex: "usar fundo claro", "seguir guia de marca X"'
                                    className="bg-[#1A1A1A] border-[#333333] text-[#EAEAEA] min-h-[80px]"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          <Button
                            onClick={handleAddCard}
                            variant="outline"
                            className="w-full bg-transparent border-[#333333] border-dashed text-[#FFD75A] hover:bg-[#FFD75A]/10"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Novo Card
                          </Button>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Summary */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="p-6 rounded-xl bg-gradient-to-br from-[#FFD75A]/10 to-transparent border border-[#FFD75A]/30">
                        <h3 className="mb-4" style={{ color: "#EAEAEA" }}>
                          Resumo da Tarefa
                        </h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-[#333333]">
                            <span style={{ color: "#BDBDBD" }}>Título:</span>
                            <span style={{ color: "#EAEAEA" }}>{formData.title}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-[#333333]">
                            <span style={{ color: "#BDBDBD" }}>Cliente:</span>
                            <span style={{ color: "#EAEAEA" }}>{formData.client}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-[#333333]">
                            <span style={{ color: "#BDBDBD" }}>Tipo:</span>
                            <span style={{ color: "#EAEAEA" }}>{formData.type}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-[#333333]">
                            <span style={{ color: "#BDBDBD" }}>Prioridade:</span>
                            <span style={{ color: "#EAEAEA" }}>{formData.priority}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-[#333333]">
                            <span style={{ color: "#BDBDBD" }}>Data de Entrega:</span>
                            <span style={{ color: "#EAEAEA" }}>{formData.date}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-[#333333]">
                            <span style={{ color: "#BDBDBD" }}>Quantidade de Cards:</span>
                            <span style={{ color: "#FFD75A" }}>{cards.length}</span>
                          </div>
                          {formData.notes && (
                            <div className="py-2">
                              <p style={{ color: "#BDBDBD" }}>Observações:</p>
                              <p className="text-sm mt-1" style={{ color: "#EAEAEA" }}>
                                {formData.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#212121] bg-[#222222]/20">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={step === 1 ? () => onOpenChange(false) : handlePrevious}
                    className="bg-transparent border-[#333333] text-[#EAEAEA] hover:bg-[#222222]"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {step === 1 ? "Cancelar" : "Voltar"}
                  </Button>

                  {step < 3 ? (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
                    >
                      Próximo
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleConfirm}
                      className="bg-gradient-to-r from-[#78E08F] to-[#5FD67F] hover:from-[#88F09F] hover:to-[#6FE68F] text-[#0F0F0F]"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirmar Criação da Tarefa
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
