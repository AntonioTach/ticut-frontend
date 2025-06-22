import { 
  StatsCard, 
  RevenueChart, 
  AppointmentsChart, 
  RecentAppointments, 
  TopServices 
} from "@/components/dashboard";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  Scissors,
  Clock
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Resumen completo de tu barbería
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleString('es-ES')}
          </span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ingresos del Mes"
          value="$12,450"
          description="+20.1% vs mes anterior"
          icon={DollarSign}
          trend={{ value: 20.1, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Citas Totales"
          value="156"
          description="+12% vs mes anterior"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Clientes Activos"
          value="89"
          description="+5.2% vs mes anterior"
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
          color="orange"
        />
        <StatsCard
          title="Servicios Realizados"
          value="234"
          description="+8.1% vs mes anterior"
          icon={Scissors}
          trend={{ value: 8.1, isPositive: true }}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <AppointmentsChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <TopServices />
        <RecentAppointments />
      </div>
    </div>
  );
}