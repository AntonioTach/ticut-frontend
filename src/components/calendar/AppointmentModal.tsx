'use client';
import React, { useState, useEffect } from 'react';
import { Appointment, Barber } from './types';
import { ClientRegistrationModal } from '../dashboard/ClientRegistrationModal';
import { mockClients } from './mocks';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
  initialData?: Appointment | null;
  barbers: Barber[];
  currentUser: Barber;
  onDelete?: (appointment: Appointment) => void;
}

/**
 * Modal para crear o editar una cita (estilo original, simple)
 */
const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  barbers,
  currentUser,
  onDelete,
}) => {
  const [form, setForm] = useState<Appointment>(
    initialData || {
      id: '',
      title: '',
      start: '',
      end: '',
      barberId: currentUser.role === 'barber' ? currentUser.id : (barbers[0]?.id || ''),
      clientName: '',
      notes: '',
    }
  );

  const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);
  const [clientSearch, setClientSearch] = useState<string>('');
  const [isClientListOpen, setIsClientListOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredClients = clientSearch
    ? mockClients.filter((client) =>
        client.name.toLowerCase().includes(clientSearch.toLowerCase())
      )
    : mockClients.slice(0, 10);

  const handleClientInputFocus = () => {
    setIsClientListOpen(true);
    setClientSearch('');
  };

  const handleClientInputBlur = () => {
    setTimeout(() => setIsClientListOpen(false), 120);
  };

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({
      id: '',
      title: '',
      start: '',
      end: '',
      barberId: currentUser.role === 'barber' ? currentUser.id : (barbers[0]?.id || ''),
      clientName: '',
      notes: '',
    });
    setFormError('');
  }, [initialData, currentUser, barbers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentToSave = {
      ...form,
      barberId: currentUser.role === 'barber' ? currentUser.id : form.barberId,
      id: form.id || Math.random().toString(36).substr(2, 9),
    };
    if (!appointmentToSave.title || !appointmentToSave.start || !appointmentToSave.end || !appointmentToSave.barberId || !appointmentToSave.clientName) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setFormError('');
    onSave(appointmentToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Appointment Modal">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">{form.id ? 'Edit Appointment' : 'New Appointment'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {formError && (
            <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded px-3 py-2">
              {formError}
            </div>
          )}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded px-3 py-2"
            required
            aria-label="Title"
          />
          <div className="flex gap-2 items-start relative">
            <div className="w-full">
              <input
                type="text"
                name="clientName"
                value={clientSearch || form.clientName}
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  setForm({ ...form, clientName: '' });
                  setIsClientListOpen(true);
                }}
                placeholder="Search or select client"
                className="border rounded px-3 py-2 w-full"
                aria-label="Client Name"
                autoComplete="off"
                tabIndex={0}
                onFocus={handleClientInputFocus}
                onBlur={handleClientInputBlur}
              />
              {isClientListOpen && (
                <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <li
                        key={client.id}
                        tabIndex={0}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                        onClick={() => {
                          setForm({ ...form, clientName: client.name });
                          setClientSearch(client.name);
                          setIsClientListOpen(false);
                          setTimeout(() => setIsClientListOpen(false), 0);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setForm({ ...form, clientName: client.name });
                            setClientSearch(client.name);
                            setIsClientListOpen(false);
                            setTimeout(() => setIsClientListOpen(false), 0);
                          }
                        }}
                        aria-label={`Select ${client.name}`}
                      >
                        {client.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-400">No clients found</li>
                  )}
                </ul>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsClientModalOpen(true)}
              className="px-3 py-2 rounded group/btn flex items-center justify-between bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 relative overflow-hidden"
              aria-label="Register New Client"
              tabIndex={0}
            >
              +
            </button>
          </div>
          <input
            name="start"
            type="datetime-local"
            value={form.start}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
            aria-label="Start Date and Time"
          />
          <input
            name="end"
            type="datetime-local"
            value={form.end}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
            aria-label="End Date and Time"
          />
          {currentUser.role === 'owner' && (
            <select
              name="barberId"
              value={form.barberId}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
              aria-label="Barber"
            >
              <option value="">Select Barber</option>
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name}
                </option>
              ))}
            </select>
          )}
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (optional)"
            className="border rounded px-3 py-2"
            aria-label="Notes"
          />
          <div className="flex justify-end gap-2 mt-4">
            {initialData?.id && onDelete && (
              <button
                type="button"
                className="px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 font-semibold mr-auto"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Eliminar
              </button>
            )}
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" aria-label="Cancel">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" aria-label="Save Appointment">Save</button>
          </div>
        </form>
        <ClientRegistrationModal
          isOpen={isClientModalOpen}
          onClose={() => setIsClientModalOpen(false)}
        />
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800 mb-4 text-center">¿Estás seguro de que deseas eliminar esta cita?</p>
              <div className="flex gap-4 mt-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-medium"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onDelete && onDelete(form);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal; 