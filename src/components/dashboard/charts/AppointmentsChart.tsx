'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";

const data = [
  { name: "Lun", citas: 12, promedio: 15 },
  { name: "Mar", citas: 19, promedio: 15 },
  { name: "Mié", citas: 15, promedio: 15 },
  { name: "Jue", citas: 22, promedio: 15 },
  { name: "Vie", citas: 28, promedio: 15 },
  { name: "Sáb", citas: 35, promedio: 15 },
  { name: "Dom", citas: 8, promedio: 15 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600">Citas: {payload[0].value}</p>
        <p className="text-gray-500">Promedio: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

export function AppointmentsChart() {
  const totalCitas = data.reduce((sum, item) => sum + item.citas, 0);

  return (
    <Card className="col-span-3 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Citas por Día de la Semana</CardTitle>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-muted-foreground">
            {totalCitas} citas esta semana
          </span>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="citas" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
            <Bar 
              dataKey="promedio" 
              fill="#e0e0e0" 
              radius={[2, 2, 0, 0]}
              opacity={0.3}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Citas reales</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span>Promedio semanal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 