import { motion } from "motion/react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Save } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function Configuracoes() {
  const [settings, setSettings] = useState({
    name: "Arthur",
    bio: "",
    sla: "2",
    windows: "Quarta e Sexta",
    revisions: "1",
    goal: "5000",
    method: "50/50",
    theme: "gold",
    emailAlerts: true,
    weeklyReport: true,
    criticalPopups: true,
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 style={{ color: "#EAEAEA", marginBottom: "0.5rem" }}>Configurações</h1>
        <p className="text-lg" style={{ color: "#BDBDBD" }}>
          Preferências, metas e aparência.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-xl bg-[rgba(34,34,34,0.5)] border border-[#212121] rounded-2xl p-6"
      >
        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="bg-[#222222] border-[#333333]">
            <TabsTrigger value="perfil" className="data-[state=active]:bg-[#FFD75A]/20 data-[state=active]:text-[#FFD75A]">
              Perfil
            </TabsTrigger>
            <TabsTrigger value="sistema" className="data-[state=active]:bg-[#FFD75A]/20 data-[state=active]:text-[#FFD75A]">
              Sistema
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="data-[state=active]:bg-[#FFD75A]/20 data-[state=active]:text-[#FFD75A]">
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="tema" className="data-[state=active]:bg-[#FFD75A]/20 data-[state=active]:text-[#FFD75A]">
              Tema
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="data-[state=active]:bg-[#FFD75A]/20 data-[state=active]:text-[#FFD75A]">
              Notificações
            </TabsTrigger>
          </TabsList>

          {/* Perfil */}
          <TabsContent value="perfil" className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Seu nome</Label>
              <Input
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
              />
            </div>
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Foto</Label>
              <Input type="file" className="bg-[#222222] border-[#333333] text-[#EAEAEA]" />
            </div>
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Assinatura</Label>
              <Textarea
                value={settings.bio}
                onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                placeholder="Texto que aparece em entregas..."
                className="bg-[#222222] border-[#333333] text-[#EAEAEA] min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </TabsContent>

          {/* Sistema */}
          <TabsContent value="sistema" className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>SLA Carrossel (dias úteis)</Label>
              <Input
                type="number"
                value={settings.sla}
                onChange={(e) => setSettings({ ...settings, sla: e.target.value })}
                className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
              />
            </div>
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Janelas de Entrega</Label>
              <Select
                value={settings.windows}
                onValueChange={(value) => setSettings({ ...settings, windows: value })}
              >
                <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#222222] border-[#333333]">
                  <SelectItem value="Quarta e Sexta">Quarta e Sexta</SelectItem>
                  <SelectItem value="Terça e Quinta">Terça e Quinta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Revisões inclusas</Label>
              <Input
                type="number"
                value={settings.revisions}
                onChange={(e) => setSettings({ ...settings, revisions: e.target.value })}
                className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
              />
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </TabsContent>

          {/* Financeiro */}
          <TabsContent value="financeiro" className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Meta mensal (R$)</Label>
              <Input
                type="number"
                value={settings.goal}
                onChange={(e) => setSettings({ ...settings, goal: e.target.value })}
                className="bg-[#222222] border-[#333333] text-[#EAEAEA]"
              />
            </div>
            <div className="space-y-2">
              <Label style={{ color: "#EAEAEA" }}>Forma de cobrança</Label>
              <Select
                value={settings.method}
                onValueChange={(value) => setSettings({ ...settings, method: value })}
              >
                <SelectTrigger className="bg-[#222222] border-[#333333] text-[#EAEAEA]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#222222] border-[#333333]">
                  <SelectItem value="50/50">50/50</SelectItem>
                  <SelectItem value="100% antecipado (5% off)">100% antecipado (5% off)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </TabsContent>

          {/* Tema */}
          <TabsContent value="tema" className="mt-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {["gold", "blue", "purple"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSettings({ ...settings, theme })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    settings.theme === theme
                      ? "border-[#FFD75A] bg-[#FFD75A]/10"
                      : "border-[#333333] bg-[#222222]/30 hover:border-[#FFD75A]/50"
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div
                      className="w-12 h-12 rounded-full mx-auto"
                      style={{
                        backgroundColor:
                          theme === "gold" ? "#FFD75A" : theme === "blue" ? "#4A9EFF" : "#9D4EDD",
                      }}
                    />
                    <p style={{ color: "#EAEAEA" }}>
                      Dark {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notificacoes" className="mt-6 space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#222222]/30">
              <div>
                <Label style={{ color: "#EAEAEA" }}>Alertas por e-mail</Label>
                <p className="text-sm mt-1" style={{ color: "#BDBDBD" }}>
                  Receba notificações importantes por e-mail
                </p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, emailAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#222222]/30">
              <div>
                <Label style={{ color: "#EAEAEA" }}>Resumo semanal</Label>
                <p className="text-sm mt-1" style={{ color: "#BDBDBD" }}>
                  Resumo de atividades toda segunda-feira
                </p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => setSettings({ ...settings, weeklyReport: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#222222]/30">
              <div>
                <Label style={{ color: "#EAEAEA" }}>Pop-ups críticos</Label>
                <p className="text-sm mt-1" style={{ color: "#BDBDBD" }}>
                  Avisos de tarefas atrasadas
                </p>
              </div>
              <Switch
                checked={settings.criticalPopups}
                onCheckedChange={(checked) => setSettings({ ...settings, criticalPopups: checked })}
              />
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#FFD75A] to-[#FFB84D] hover:from-[#FFE17A] hover:to-[#FFC86D] text-[#0F0F0F]"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
