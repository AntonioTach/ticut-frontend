'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Clock, 
  Star, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowRight 
} from "lucide-react";

const additionalStats = [
  {
    title: "Tiempo Promedio",
    value: "45 min",
    description: "Por cita",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    trend: "+5%",
    isPositive: true
  },
  {
    title: "Satisfacción",
    value: "4.8",
    description: "de 5 estrellas",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    trend: "+0.2",
    isPositive: true
  },
  {
    title: "Meta Mensual",
    value: "85%",
    description: "Completada",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    trend: "+12%",
    isPositive: true
  },
  {
    title: "Eficiencia",
    value: "92%",
    description: "Tasa de ocupación",
    icon: Zap,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    trend: "+3%",
    isPositive: true
  }
];

export function AdditionalStats() {
  return (
    <Card className="col-span-4 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="relative">
            <div className="p-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-xl shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
          Métricas de Rendimiento
        </CardTitle>
        <Link href="/analytics">
          <Button
            variant="ghost"
            size="sm"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Ver Detalles
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalStats.map((stat, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.title}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                  <div className={`text-xs font-semibold ${stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.trend}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Insights */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-sm font-medium">12 clientes nuevos</div>
                <div className="text-xs text-muted-foreground">Esta semana</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
              <div>
                <div className="text-sm font-medium">8 citas pendientes</div>
                <div className="text-xs text-muted-foreground">Para hoy</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <Star className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <div>
                <div className="text-sm font-medium">15 reseñas</div>
                <div className="text-xs text-muted-foreground">Sin responder</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 