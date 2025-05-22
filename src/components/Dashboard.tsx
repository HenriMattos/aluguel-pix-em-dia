
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, Users, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Receita Mensal",
      value: "R$ 12.450,00",
      description: "+8% em relação ao mês anterior",
      icon: DollarSign,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Imóveis Cadastrados",
      value: "24",
      description: "3 novos este mês",
      icon: Home,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Inquilinos Ativos",
      value: "22",
      description: "92% de ocupação",
      icon: Users,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Vencimentos Hoje",
      value: "5",
      description: "R$ 3.200,00 a receber",
      icon: Calendar,
      color: "text-orange-600 bg-orange-100"
    }
  ];

  const recentPayments = [
    { tenant: "João Silva", property: "Apt 101 - Centro", amount: "R$ 850,00", status: "Pago", date: "05/03" },
    { tenant: "Maria Santos", property: "Casa - Jardins", amount: "R$ 1.200,00", status: "Pendente", date: "05/03" },
    { tenant: "Pedro Costa", property: "Apt 205 - Vila Nova", amount: "R$ 750,00", status: "Atrasado", date: "02/03" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Últimos Pagamentos</span>
            </CardTitle>
            <CardDescription>Atividade recente dos aluguéis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{payment.tenant}</p>
                    <p className="text-sm text-gray-500">{payment.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{payment.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      payment.status === 'Pago' ? 'bg-green-100 text-green-800' :
                      payment.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Occupation Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-blue-600" />
              <span>Taxa de Ocupação</span>
            </CardTitle>
            <CardDescription>Resumo dos imóveis por status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Ocupados</span>
                <span>22/24 (92%)</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">22</div>
                <div className="text-sm text-green-700">Ocupados</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">2</div>
                <div className="text-sm text-gray-700">Vagos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Alertas Importantes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-orange-700">• 3 aluguéis com vencimento em atraso</p>
            <p className="text-orange-700">• 5 cobranças automáticas serão enviadas hoje</p>
            <p className="text-orange-700">• 2 contratos vencem este mês</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
