'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Scissors, DollarSign, TrendingUp } from "lucide-react";

const topServices = [
  {
    name: "Corte de cabello",
    count: 156,
    percentage: 35,
    revenue: 2340,
    trend: "+12%"
  },
  {
    name: "Barba + Corte",
    count: 98,
    percentage: 22,
    revenue: 1960,
    trend: "+8%"
  },
  {
    name: "Tinte",
    count: 67,
    percentage: 15,
    revenue: 1340,
    trend: "+15%"
  },
  {
    name: "Corte clásico",
    count: 45,
    percentage: 10,
    revenue: 900,
    trend: "+5%"
  },
  {
    name: "Tratamiento capilar",
    count: 32,
    percentage: 7,
    revenue: 640,
    trend: "+20%"
  }
];

export function TopServices() {
  const totalRevenue = topServices.reduce((sum, service) => sum + service.revenue, 0);
  
  return (
    <Card className="col-span-4 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="relative">
            <div className="p-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Scissors className="h-5 w-5 text-white" />
            </div>
          </div>
          Servicios Más Populares
        </CardTitle>
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-sm text-muted-foreground">
            Total: ${totalRevenue.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topServices.map((service, index) => (
            <div key={index} className="space-y-3 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <div className="p-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-sm">
                      <Scissors className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">{service.name}</span>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{service.count} citas</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <div className="p-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <TrendingUp className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-green-600 dark:text-green-400 font-medium">{service.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    ${service.revenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {service.percentage}% del total
                  </div>
                </div>
              </div>
              <Progress 
                value={service.percentage} 
                className="h-2"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)'
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 