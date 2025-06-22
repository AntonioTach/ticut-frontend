'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Scissors, MoreHorizontal, Calendar } from "lucide-react";

const recentAppointments = [
  {
    id: 1,
    clientName: "Juan Pérez",
    service: "Corte de cabello",
    time: "14:30",
    status: "confirmado",
    barber: "Carlos",
    avatar: "/avatars/juan.jpg",
    price: "$25"
  },
  {
    id: 2,
    clientName: "María García",
    service: "Barba + Corte",
    time: "15:00",
    status: "pendiente",
    barber: "Luis",
    avatar: "/avatars/maria.jpg",
    price: "$35"
  },
  {
    id: 3,
    clientName: "Roberto Silva",
    service: "Corte clásico",
    time: "15:30",
    status: "confirmado",
    barber: "Miguel",
    avatar: "/avatars/roberto.jpg",
    price: "$20"
  },
  {
    id: 4,
    clientName: "Ana López",
    service: "Tinte + Corte",
    time: "16:00",
    status: "cancelado",
    barber: "Sofia",
    avatar: "/avatars/ana.jpg",
    price: "$45"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmado":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
    case "pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
    case "cancelado":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800";
  }
};

export function RecentAppointments() {
  return (
    <Card className="col-span-3 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="relative">
            <div className="p-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-xl shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
          </div>
          Citas Recientes
        </CardTitle>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium">
          Ver todas
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group">
              <Avatar className="h-10 w-10 ring-2 ring-gray-100 dark:ring-gray-800">
                <AvatarImage src={appointment.avatar} alt={appointment.clientName} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
                  {appointment.clientName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">{appointment.clientName}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="p-1 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <Scissors className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>{appointment.service}</span>
                  <span>•</span>
                  <span>{appointment.barber}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <div className="p-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <Clock className="h-2.5 w-2.5" />
                    </div>
                    <span>{appointment.time}</span>
                  </div>
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {appointment.price}
                  </div>
                </div>
                <Badge className={`${getStatusColor(appointment.status)} border font-medium`}>
                  {appointment.status}
                </Badge>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group-hover:scale-110">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 