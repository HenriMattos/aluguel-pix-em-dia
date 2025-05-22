
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Save, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Messages = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Lembrete de Aluguel",
      message: "Olá {nome}, lembro que o aluguel no valor de R$ {valor} vence no dia {vencimento}. Para sua comodidade, segue o link para pagamento via PIX: {link_pix}. Obrigado!"
    },
    {
      id: 2,
      name: "Confirmação de Pagamento",
      message: "Olá {nome}, confirmamos o recebimento do pagamento de aluguel no valor de R$ {valor} referente ao imóvel {imovel}. Obrigado pela pontualidade!"
    },
    {
      id: 3,
      name: "Aluguel Atrasado",
      message: "Olá {nome}, notamos que o aluguel no valor de R$ {valor} vencido no dia {vencimento} ainda não foi pago. Por favor, regularize sua situação ou entre em contato caso precise de algum prazo adicional."
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    message: ""
  });

  const [editingTemplate, setEditingTemplate] = useState<null | {
    id: number;
    name: string;
    message: string;
  }>(null);

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.message) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos do template",
        variant: "destructive"
      });
      return;
    }

    setTemplates([
      ...templates,
      {
        id: templates.length + 1,
        name: newTemplate.name,
        message: newTemplate.message
      }
    ]);

    setNewTemplate({ name: "", message: "" });

    toast({
      title: "Template Salvo",
      description: "Seu template de mensagem foi salvo com sucesso",
    });
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;

    setTemplates(templates.map(template => 
      template.id === editingTemplate.id ? editingTemplate : template
    ));

    setEditingTemplate(null);

    toast({
      title: "Template Atualizado",
      description: "Seu template de mensagem foi atualizado com sucesso",
    });
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(template => template.id !== id));
    
    toast({
      title: "Template Removido",
      description: "O template de mensagem foi removido com sucesso",
    });
  };

  const variableList = [
    { name: "{nome}", description: "Nome do inquilino" },
    { name: "{valor}", description: "Valor do aluguel" },
    { name: "{vencimento}", description: "Data de vencimento" },
    { name: "{imovel}", description: "Endereço do imóvel" },
    { name: "{link_pix}", description: "Link para pagamento PIX" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mensagens Automáticas</h2>
        <p className="text-gray-600">Configure as mensagens enviadas aos inquilinos</p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="new">Novo Template</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>Template de mensagem</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingTemplate(template)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm whitespace-pre-line">{template.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {templates.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-600">Nenhum template cadastrado</h3>
              <p className="text-gray-500 mt-1">Adicione templates para mensagens automáticas</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Novo Template de Mensagem</CardTitle>
              <CardDescription>
                Crie um novo modelo para mensagens automáticas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Template</Label>
                <Input 
                  id="name" 
                  placeholder="Ex: Lembrete de Aluguel"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message" 
                  placeholder="Digite a mensagem aqui..."
                  rows={5}
                  value={newTemplate.message}
                  onChange={(e) => setNewTemplate({...newTemplate, message: e.target.value})}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use as variáveis abaixo para personalizar a mensagem.
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-700 mb-2">Variáveis disponíveis:</p>
                <div className="grid grid-cols-2 gap-2">
                  {variableList.map((variable, index) => (
                    <div key={index} className="text-xs bg-blue-100 text-blue-800 rounded p-2">
                      <span className="font-mono font-bold">{variable.name}</span>
                      <span className="block mt-1">{variable.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveTemplate} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Template Dialog */}
      {editingTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Editar Template</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome do Template</Label>
                <Input 
                  id="edit-name" 
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-message">Mensagem</Label>
                <Textarea 
                  id="edit-message" 
                  rows={5}
                  value={editingTemplate.message}
                  onChange={(e) => setEditingTemplate({...editingTemplate, message: e.target.value})}
                />
              </div>
              
              <div className="flex space-x-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setEditingTemplate(null)}>
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={handleUpdateTemplate}>
                  Atualizar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
