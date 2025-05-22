
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, MessageSquare, Save, Copy, Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Messages = () => {
  const { toast } = useToast();
  const [activeTemplate, setActiveTemplate] = useState("reminder");
  const [templates, setTemplates] = useState({
    reminder: "Olá {inquilino}, este é um lembrete amigável de que seu aluguel no valor de R$ {valor} vence em {dias} dias. Para sua comodidade, o código PIX é: {pix}. Obrigado!",
    late: "Olá {inquilino}, notamos que o pagamento do aluguel no valor de R$ {valor} está atrasado há {dias} dias. Por favor, realize o pagamento o mais breve possível através do PIX: {pix}. Se já pagou, por favor desconsidere esta mensagem.",
    receipt: "Olá {inquilino}, recebemos seu pagamento de aluguel no valor de R$ {valor}. Obrigado pela pontualidade! Seu recibo já está disponível.",
    welcome: "Olá {inquilino}, seja bem-vindo ao seu novo lar! Estamos felizes em tê-lo como inquilino. Seu primeiro aluguel no valor de R$ {valor} vence em {data}. Para qualquer dúvida, estamos à disposição."
  });

  const [currentTemplate, setCurrentTemplate] = useState("");

  const handleEditTemplate = (template) => {
    setCurrentTemplate(templates[template]);
    setActiveTemplate(template);
  };

  const saveTemplate = () => {
    setTemplates({
      ...templates,
      [activeTemplate]: currentTemplate
    });
    
    toast({
      title: "Modelo salvo",
      description: "Seu modelo de mensagem foi salvo com sucesso.",
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
    });
  };

  const previewMessage = (template) => {
    // Simula a substituição de variáveis
    let message = templates[template]
      .replace("{inquilino}", "João Silva")
      .replace("{valor}", "850,00")
      .replace("{dias}", "3")
      .replace("{data}", "05/06/2024")
      .replace("{pix}", "exemplo@email.com");
    
    return message;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Modelos de Mensagem</h2>
        <p className="text-gray-600">Personalize as mensagens enviadas aos seus inquilinos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Modelos Disponíveis</span>
              </CardTitle>
              <CardDescription>
                Selecione um modelo para editar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant={activeTemplate === "reminder" ? "default" : "outline"} 
                onClick={() => handleEditTemplate("reminder")}
                className="w-full justify-start"
              >
                Lembrete de Vencimento
              </Button>
              <Button 
                variant={activeTemplate === "late" ? "default" : "outline"} 
                onClick={() => handleEditTemplate("late")}
                className="w-full justify-start"
              >
                Cobrança de Atraso
              </Button>
              <Button 
                variant={activeTemplate === "receipt" ? "default" : "outline"} 
                onClick={() => handleEditTemplate("receipt")}
                className="w-full justify-start"
              >
                Confirmação de Pagamento
              </Button>
              <Button 
                variant={activeTemplate === "welcome" ? "default" : "outline"} 
                onClick={() => handleEditTemplate("welcome")}
                className="w-full justify-start"
              >
                Boas-vindas ao Inquilino
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variáveis Disponíveis</CardTitle>
              <CardDescription>
                Insira estas variáveis em seus modelos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <code className="bg-gray-100 px-2 py-1 rounded">{"{inquilino}"}</code>
                  <span className="text-gray-600">Nome do inquilino</span>
                </li>
                <li className="flex justify-between">
                  <code className="bg-gray-100 px-2 py-1 rounded">{"{valor}"}</code>
                  <span className="text-gray-600">Valor do aluguel</span>
                </li>
                <li className="flex justify-between">
                  <code className="bg-gray-100 px-2 py-1 rounded">{"{dias}"}</code>
                  <span className="text-gray-600">Dias até vencimento ou atraso</span>
                </li>
                <li className="flex justify-between">
                  <code className="bg-gray-100 px-2 py-1 rounded">{"{data}"}</code>
                  <span className="text-gray-600">Data de vencimento</span>
                </li>
                <li className="flex justify-between">
                  <code className="bg-gray-100 px-2 py-1 rounded">{"{pix}"}</code>
                  <span className="text-gray-600">Chave PIX</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="edit" className="space-y-4">
            <TabsList>
              <TabsTrigger value="edit">Editar</TabsTrigger>
              <TabsTrigger value="preview">Pré-visualizar</TabsTrigger>
            </TabsList>

            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    <span>Editar Modelo</span>
                  </CardTitle>
                  <CardDescription>
                    {activeTemplate === "reminder" && "Mensagem enviada antes do vencimento"}
                    {activeTemplate === "late" && "Mensagem enviada quando o pagamento está atrasado"}
                    {activeTemplate === "receipt" && "Confirmação após o pagamento recebido"}
                    {activeTemplate === "welcome" && "Boas-vindas para novos inquilinos"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={currentTemplate || templates[activeTemplate]} 
                    onChange={(e) => setCurrentTemplate(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={saveTemplate} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Modelo
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentTemplate(templates[activeTemplate])}>
                      Restaurar Original
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Pré-visualização</CardTitle>
                  <CardDescription>
                    Veja como a mensagem será exibida para o inquilino
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-2">
                        <p className="font-bold">Mensagem WhatsApp</p>
                        <p className="text-sm text-gray-600">Para: João Silva</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border">
                      <p className="whitespace-pre-line">{previewMessage(activeTemplate)}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" onClick={() => copyToClipboard(previewMessage(activeTemplate))}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Mensagem
                  </Button>
                  
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Testar Envio
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Messages;
