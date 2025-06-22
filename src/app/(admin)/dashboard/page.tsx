import { 
  StatsCard, 
  RevenueChart, 
  AppointmentsChart, 
  RecentAppointments, 
  TopServices,
  QuickActions,
  AdditionalStats
} from "@/components/dashboard";
import { 
  DollarSign, 
  Users, 
  Calendar,
  BarChart3
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
          <span className="text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleString('es-ES')}
          </span>
        </div>
      </div>
      
      {/* Stats Cards + Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ingresos del Mes"
          value="$12,450"
          description="+20.1% vs mes anterior"
          secondaryValue="$8,230"
          secondaryLabel="Promedio mensual"
          icon={DollarSign}
          trend={{ value: 20.1, isPositive: true }}
          color="green"
          action={{
            label: "Ver Reportes",
            href: "/reports",
            icon: BarChart3
          }}
          showViewButton={true}
        />
        <StatsCard
          title="Citas Totales"
          value="156"
          description="+12% vs mes anterior"
          secondaryValue="23"
          secondaryLabel="Esta semana"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
          color="blue"
          action={{
            label: "Ver Citas",
            href: "/appointments",
            icon: Calendar
          }}
          showViewButton={true}
        />
        <StatsCard
          title="Clientes Activos"
          value="89"
          description="+5.2% vs mes anterior"
          secondaryValue="12"
          secondaryLabel="Nuevos este mes"
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
          color="orange"
          action={{
            label: "Ver Clientes",
            href: "/clients",
            icon: Users
          }}
          showViewButton={true}
        />
        <QuickActions />
      </div>

      {/* Additional Stats */}
      {/* TODO: Consider if AdditionalStats component adds value to dashboard
          - Evaluate if it provides unique insights not covered by other components
          - Check if it improves user experience and decision-making
          - Consider removing if it's redundant with existing stats cards */}
      <AdditionalStats />

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