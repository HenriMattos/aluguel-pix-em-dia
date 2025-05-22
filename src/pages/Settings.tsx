
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings as SettingsIcon, Save, MessageCircle, Bell, Smartphone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "EmDia Gestão de Aluguéis",
    ownerName: "Seu Nome",
    email: "seu.email@exemplo.com",
    phone: "(11) 99999-9999"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    daysBeforeDue: [3], // dias antes do vencimento para enviar lembrete
    sendReminders: true,
    sendReceipts: true,
    sendLateNotices: true,
    lateNoticeDays: [3, 7, 15] // dias após vencimento para enviar notificações de atraso
  });

  const [paymentSettings, setPaymentSettings] = useState({
    pixKey: "exemplo@chavepix.com.br",
    pixKeyType: "email",
    bankName: "Banco XYZ",
    accountName: "Seu Nome",
    accountNumber: "12345-6",
    branch: "0001"
  });

  const [whatsappSettings, setWhatsappSettings] = useState({
    useWhatsapp: true,
    phoneNumber: "(11) 99999-9999",
    connectWhatsappWeb: false
  });

  const handleSaveGeneral = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações gerais foram atualizadas com sucesso.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de notificações foram atualizadas com sucesso.",
    });
  };

  const handleSavePayment = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de pagamento foram atualizadas com sucesso.",
    });
  };

  const handleSaveWhatsapp = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações do WhatsApp foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
        <p className="text-gray-600">Personalize seu sistema de gerenciamento de aluguéis</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="payment">Pagamento</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                <span>Configurações Gerais</span>
              </CardTitle>
              <CardDescription>
                Configure as informações básicas do seu sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nome da Empresa/Negócio</Label>
                <Input 
                  id="companyName" 
                  value={generalSettings.companyName}
                  onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="ownerName">Seu Nome</Label>
                <Input 
                  id="ownerName" 
                  value={generalSettings.ownerName}
                  onChange={(e) => setGeneralSettings({...generalSettings, ownerName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={generalSettings.email}
                  onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  value={generalSettings.phone}
                  onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                />
              </div>
              <Button onClick={handleSaveGeneral}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>Configurações de Notificações</span>
              </CardTitle>
              <CardDescription>
                Configure como e quando enviar notificações aos inquilinos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="daysBeforeDue">Dias antes do vencimento para enviar lembrete</Label>
                  <span className="text-sm font-medium">{notificationSettings.daysBeforeDue[0]} dias</span>
                </div>
                <Slider 
                  id="daysBeforeDue"
                  min={1}
                  max={10}
                  step={1}
                  value={notificationSettings.daysBeforeDue}
                  onValueChange={(value) => setNotificationSettings({...notificationSettings, daysBeforeDue: value})}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sendReminders" className="cursor-pointer">Enviar lembretes de vencimento</Label>
                  <Switch 
                    id="sendReminders" 
                    checked={notificationSettings.sendReminders}
                    onCheckedChange={(value) => setNotificationSettings({...notificationSettings, sendReminders: value})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sendReceipts" className="cursor-pointer">Enviar recibos após pagamento</Label>
                  <Switch 
                    id="sendReceipts" 
                    checked={notificationSettings.sendReceipts}
                    onCheckedChange={(value) => setNotificationSettings({...notificationSettings, sendReceipts: value})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sendLateNotices" className="cursor-pointer">Enviar notificações de atraso</Label>
                  <Switch 
                    id="sendLateNotices" 
                    checked={notificationSettings.sendLateNotices}
                    onCheckedChange={(value) => setNotificationSettings({...notificationSettings, sendLateNotices: value})}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Configurações de Pagamento</span>
              </CardTitle>
              <CardDescription>
                Configure suas informações bancárias e chave Pix
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pixKey">Chave Pix</Label>
                <Input 
                  id="pixKey" 
                  value={paymentSettings.pixKey}
                  onChange={(e) => setPaymentSettings({...paymentSettings, pixKey: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="pixKeyType">Tipo de Chave</Label>
                <select 
                  id="pixKeyType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={paymentSettings.pixKeyType}
                  onChange={(e) => setPaymentSettings({...paymentSettings, pixKeyType: e.target.value})}
                >
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                  <option value="email">Email</option>
                  <option value="phone">Telefone</option>
                  <option value="random">Chave Aleatória</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bankName">Banco</Label>
                <Input 
                  id="bankName" 
                  value={paymentSettings.bankName}
                  onChange={(e) => setPaymentSettings({...paymentSettings, bankName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="branch">Agência</Label>
                  <Input 
                    id="branch" 
                    value={paymentSettings.branch}
                    onChange={(e) => setPaymentSettings({...paymentSettings, branch: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Conta</Label>
                  <Input 
                    id="accountNumber" 
                    value={paymentSettings.accountNumber}
                    onChange={(e) => setPaymentSettings({...paymentSettings, accountNumber: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={handleSavePayment}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>Configurações do WhatsApp</span>
              </CardTitle>
              <CardDescription>
                Configure a integração com o WhatsApp para envio de mensagens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="useWhatsapp" className="cursor-pointer">Usar WhatsApp para cobranças</Label>
                <Switch 
                  id="useWhatsapp" 
                  checked={whatsappSettings.useWhatsapp}
                  onCheckedChange={(value) => setWhatsappSettings({...whatsappSettings, useWhatsapp: value})}
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Número do WhatsApp (com DDD)</Label>
                <Input 
                  id="phoneNumber" 
                  value={whatsappSettings.phoneNumber}
                  onChange={(e) => setWhatsappSettings({...whatsappSettings, phoneNumber: e.target.value})}
                  disabled={!whatsappSettings.useWhatsapp}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Este número será usado para enviar as mensagens aos inquilinos
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="connectWhatsappWeb" className="cursor-pointer">Conectar com WhatsApp Web</Label>
                  <p className="text-sm text-gray-500">
                    Conecte ao WhatsApp Web para envio automatizado de mensagens
                  </p>
                </div>
                <Switch 
                  id="connectWhatsappWeb" 
                  checked={whatsappSettings.connectWhatsappWeb}
                  onCheckedChange={(value) => setWhatsappSettings({...whatsappSettings, connectWhatsappWeb: value})}
                  disabled={!whatsappSettings.useWhatsapp}
                />
              </div>

              {whatsappSettings.connectWhatsappWeb && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>WhatsApp conectado!</strong> Seu WhatsApp está conectado e pronto para enviar mensagens automaticamente.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setWhatsappSettings({...whatsappSettings, connectWhatsappWeb: false})}
                  >
                    Desconectar
                  </Button>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-700">Dicas para WhatsApp:</h4>
                <ul className="text-sm text-blue-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Use um número exclusivo para o sistema</li>
                  <li>Evite enviar muitas mensagens em sequência</li>
                  <li>Mantenha o celular conectado à internet para funcionamento</li>
                </ul>
              </div>

              <Button onClick={handleSaveWhatsapp}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
