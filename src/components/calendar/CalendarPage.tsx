'use client';
import React, { useState } from 'react';
import { users, appointments as mockAppointments } from './mocks';
import { User, Appointment } from './types';
import AdminCalendar from './AdminCalendar';
import BarberCalendar from './BarberCalendar';

/**
 * Componente principal de la página de calendario
 * Simula autenticación y permite cambiar de usuario para demo
 */
const CalendarPage: React.FC = () => {
  // Simular usuario autenticado (puedes cambiar el índice para probar)
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 gap-8 bg-neutral-50">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
            {currentUser.name.charAt(0)}
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{currentUser.name}</span>
            <span className="text-xs text-gray-500 capitalize">{currentUser.role}</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <label htmlFor="user-select" className="mr-2 text-sm text-gray-600">Switch user:</label>
          <select
            id="user-select"
            value={currentUser.id}
            onChange={e => setCurrentUser(users.find(u => u.id === e.target.value) || users[0])}
            className="border border-gray-300 rounded px-2 py-1 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Select user"
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Appointments Calendar</h1>
      <div className="w-full">
        {currentUser.role === 'owner' ? (
          <AdminCalendar
            appointments={appointments}
            barbers={users.filter(u => u.role === 'barber')}
            currentUser={currentUser}
            onChange={setAppointments}
          />
        ) : (
          <BarberCalendar
            appointments={appointments}
            currentUser={currentUser}
            onChange={setAppointments}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage; 