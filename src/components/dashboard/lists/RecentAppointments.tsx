'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Scissors, MoreHorizontal } from "lucide-react";

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
      return "bg-green-100 text-green-800 border-green-200";
    case "pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelado":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function RecentAppointments() {
  return (
    <Card className="col-span-3 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Citas Recientes</CardTitle>
        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
          Ver todas
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src={appointment.avatar} alt={appointment.clientName} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {appointment.clientName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{appointment.clientName}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Scissors className="h-3 w-3" />
                  <span>{appointment.service}</span>
                  <span>•</span>
                  <span>{appointment.barber}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    {appointment.price}
                  </div>
                </div>
                <Badge className={`${getStatusColor(appointment.status)} border`}>
                  {appointment.status}
                </Badge>
                <button className="p-1 hover:bg-gray-100 rounded">
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