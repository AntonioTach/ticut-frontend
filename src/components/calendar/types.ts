// Tipos para el calendario de barbería

export type Role = 'owner' | 'barber';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Appointment {
  id: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  barberId: string;
  clientName: string;
  notes?: string;
} 