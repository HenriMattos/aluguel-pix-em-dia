
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Home, MapPin, DollarSign, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const PropertiesTab = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    address: "",
    type: "",
    rooms: "",
    rent: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty = {
      id: Date.now(), // Using timestamp as ID for uniqueness
      address: formData.address,
      type: formData.type,
      rooms: parseInt(formData.rooms),
      rent: parseFloat(formData.rent),
      status: "Vago",
      tenant: null
    };

    setProperties([...properties, newProperty]);
    setFormData({ address: "", type: "", rooms: "", rent: "" });
    
    toast({
      title: "Imóvel cadastrado!",
      description: "O imóvel foi adicionado com sucesso.",
    });
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Imóvel removido",
      description: "O imóvel foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Imóveis</h2>
          <p className="text-gray-600">Cadastre e gerencie seus imóveis</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Imóvel</DialogTitle>
              <DialogDescription>
                Preencha as informações do imóvel
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Rua, número, bairro"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo do Imóvel</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  placeholder="Apartamento, Casa, Kitnet..."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rooms">Quartos</Label>
                  <Input
                    id="rooms"
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                    placeholder="2"
                    required
                  />
                </div>
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
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Cadastrar Imóvel
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Home className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum imóvel cadastrado</h3>
          <p className="text-gray-500 mb-4">Adicione seu primeiro imóvel utilizando o botão acima.</p>
          {/* FIX: Wrap the button in a Dialog component */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Imóvel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Imóvel</DialogTitle>
                <DialogDescription>
                  Preencha as informações do imóvel
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="address2">Endereço Completo</Label>
                  <Input
                    id="address2"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Rua, número, bairro"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type2">Tipo do Imóvel</Label>
                  <Input
                    id="type2"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    placeholder="Apartamento, Casa, Kitnet..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rooms2">Quartos</Label>
                    <Input
                      id="rooms2"
                      type="number"
                      value={formData.rooms}
                      onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                      placeholder="2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rent2">Valor do Aluguel</Label>
                    <Input
                      id="rent2"
                      type="number"
                      step="0.01"
                      value={formData.rent}
                      onChange={(e) => setFormData({...formData, rent: e.target.value})}
                      placeholder="850.00"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Cadastrar Imóvel
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{property.type}</CardTitle>
                  </div>
                  <Badge variant={property.status === "Ocupado" ? "default" : "secondary"}>
                    {property.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <p className="text-sm text-gray-600">{property.address}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{property.rooms} quartos</span>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">
                      R$ {property.rent.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {property.tenant && (
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-sm text-blue-700">
                      <strong>Inquilino:</strong> {property.tenant}
                    </p>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => deleteProperty(property.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesTab;
