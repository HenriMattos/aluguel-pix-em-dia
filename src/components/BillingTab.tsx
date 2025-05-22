import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, MessageCircle, QrCode, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const BillingTab = () => {
  const { toast } = useToast();
  
  const [billings, setBillings] = useState([]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pago":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pendente":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Atrasado":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const sendReminder = (id: number, tenant: string) => {
    setBillings(billings.map(billing => 
      billing.id === id ? { ...billing, pixSent: true } : billing
    ));
    
    toast({
      title: "Lembrete enviado!",
      description: `Cobrança enviada para ${tenant} via WhatsApp`,
    });
  };

  const generatePix = (id: number, tenant: string) => {
    toast({
      title: "PIX gerado!",
      description: `Código PIX criado para ${tenant}`,
    });
  };

  const filterByStatus = (status: string) => {
    if (status === "all") return billings;
    return billings.filter(billing => billing.status === status);
  };

  const pendingBillings = filterByStatus("Pendente");
  const overdueBillings = filterByStatus("Atrasado");
  const paidBillings = filterByStatus("Pago");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sistema de Cobranças</h2>
          <p className="text-gray-600">Gerencie cobranças automáticas via PIX e WhatsApp</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Enviar Todas as Cobranças
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pagos</p>
                <p className="text-2xl font-bold text-green-600">{paidBillings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingBillings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Atrasados</p>
                <p className="text-2xl font-bold text-red-600">{overdueBillings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Mês</p>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {billings.reduce((sum, b) => sum + b.amount, 0).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="Pendente">Pendentes</TabsTrigger>
          <TabsTrigger value="Atrasado">Atrasadas</TabsTrigger>
          <TabsTrigger value="Pago">Pagas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {billings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma cobrança cadastrada</h3>
              <p className="text-gray-500 mb-4">Adicione inquilinos e propriedades para começar a gerar cobranças.</p>
            </div>
          ) : (
            billings.map((billing) => (
              <Card key={billing.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(billing.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{billing.tenant}</h3>
                        <p className="text-sm text-gray-600">{billing.property}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">R$ {billing.amount.toLocaleString('pt-BR')}</p>
                        <p className="text-sm text-gray-500">Venc: {new Date(billing.dueDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <Badge className={getStatusColor(billing.status)}>
                        {billing.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        {billing.status !== "Pago" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => generatePix(billing.id, billing.tenant)}
                            >
                              <QrCode className="h-4 w-4 mr-1" />
                              PIX
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => sendReminder(billing.id, billing.tenant)}
                              className={billing.pixSent ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
                              disabled={billing.pixSent}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {billing.pixSent ? "Enviado" : "Cobrar"}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="Pendente" className="space-y-4">
          {pendingBillings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma cobrança pendente</h3>
              <p className="text-gray-500">As cobranças pendentes aparecerão aqui.</p>
            </div>
          ) : (
            pendingBillings.map((billing) => (
              <Card key={billing.id} className="hover:shadow-md transition-shadow border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(billing.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{billing.tenant}</h3>
                        <p className="text-sm text-gray-600">{billing.property}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">R$ {billing.amount.toLocaleString('pt-BR')}</p>
                        <p className="text-sm text-gray-500">Venc: {new Date(billing.dueDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <Badge className={getStatusColor(billing.status)}>
                        {billing.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generatePix(billing.id, billing.tenant)}
                        >
                          <QrCode className="h-4 w-4 mr-1" />
                          PIX
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => sendReminder(billing.id, billing.tenant)}
                          className={billing.pixSent ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
                          disabled={billing.pixSent}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {billing.pixSent ? "Enviado" : "Cobrar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="Atrasado" className="space-y-4">
          {overdueBillings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma cobrança atrasada</h3>
              <p className="text-gray-500">As cobranças atrasadas aparecerão aqui.</p>
            </div>
          ) : (
            overdueBillings.map((billing) => (
              <Card key={billing.id} className="hover:shadow-md transition-shadow border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(billing.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{billing.tenant}</h3>
                        <p className="text-sm text-gray-600">{billing.property}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">R$ {billing.amount.toLocaleString('pt-BR')}</p>
                        <p className="text-sm text-red-600">Venc: {new Date(billing.dueDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <Badge className={getStatusColor(billing.status)}>
                        {billing.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generatePix(billing.id, billing.tenant)}
                        >
                          <QrCode className="h-4 w-4 mr-1" />
                          PIX
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => sendReminder(billing.id, billing.tenant)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Cobrar Urgente
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="Pago" className="space-y-4">
          {paidBillings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma cobrança paga</h3>
              <p className="text-gray-500">As cobranças pagas aparecerão aqui.</p>
            </div>
          ) : (
            paidBillings.map((billing) => (
              <Card key={billing.id} className="hover:shadow-md transition-shadow border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(billing.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{billing.tenant}</h3>
                        <p className="text-sm text-gray-600">{billing.property}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-700">R$ {billing.amount.toLocaleString('pt-BR')}</p>
                        <p className="text-sm text-green-600">
                          Pago em: {billing.paymentDate ? new Date(billing.paymentDate).toLocaleDateString('pt-BR') : '-'}
                        </p>
                      </div>
                      
                      <Badge className={getStatusColor(billing.status)}>
                        {billing.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingTab;
