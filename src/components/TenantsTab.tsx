
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, User, Phone, Mail, MapPin, Calendar, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const TenantsTab = () => {
  const { toast } = useToast();
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      property: "Rua das Flores, 123 - Centro",
      rent: 850,
      dueDate: 5,
      status: "Ativo"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      property: "Av. Principal, 456 - Jardins",
      rent: 1200,
      dueDate: 10,
      status: "Ativo"
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 77777-7777",
      property: "Rua Nova, 789 - Vila Nova",
      rent: 750,
      dueDate: 15,
      status: "Atrasado"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    rent: "",
    dueDate: ""
  });

  const availableProperties = [
    "Rua das Flores, 123 - Centro",
    "Av. Principal, 456 - Jardins", 
    "Rua Nova, 789 - Vila Nova"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTenant = {
      id: tenants.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      property: formData.property,
      rent: parseFloat(formData.rent),
      dueDate: parseInt(formData.dueDate),
      status: "Ativo"
    };

    setTenants([...tenants, newTenant]);
    setFormData({ name: "", email: "", phone: "", property: "", rent: "", dueDate: "" });
    
    toast({
      title: "Inquilino cadastrado!",
      description: "O inquilino foi adicionado com sucesso.",
    });
  };

  const sendWhatsApp = (phone: string, name: string) => {
    toast({
      title: "WhatsApp",
      description: `Enviando mensagem para ${name}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Inquilinos</h2>
          <p className="text-gray-600">Cadastre e gerencie seus inquilinos</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Inquilino
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Inquilino</DialogTitle>
              <DialogDescription>
                Preencha as informações do inquilino
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="João Silva"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="joao@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">WhatsApp</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div>
                <Label htmlFor="property">Imóvel</Label>
                <Select value={formData.property} onValueChange={(value) => setFormData({...formData, property: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProperties.map((property, index) => (
                      <SelectItem key={index} value={property}>
                        {property}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rent">Valor do Aluguel</Label>
                  <Input
                    id="rent"
                    type="number"
                    step="0.01"
                    value={formData.rent}
                    onChange={(e) => setFormData({...formData, rent: e.target.value})}
                    placeholder="850.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Dia Vencimento</Label>
                  <Input
                    id="dueDate"
                    type="number"
                    min="1"
                    max="31"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    placeholder="5"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Cadastrar Inquilino
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{tenant.name}</CardTitle>
                </div>
                <Badge variant={tenant.status === "Ativo" ? "default" : "destructive"}>
                  {tenant.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{tenant.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{tenant.phone}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <span className="text-sm text-gray-600">{tenant.property}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Valor do Aluguel</span>
                  <span className="font-bold text-green-600">
                    R$ {tenant.rent.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vencimento</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Todo dia {tenant.dueDate}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => sendWhatsApp(tenant.phone, tenant.name)}
                className="w-full bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Enviar Cobrança
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TenantsTab;
