'use client';

import { useState } from "react";
import { Search, User, Phone, X } from "lucide-react";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface ClientSearchProps {
  onClientSelect: (client: Client) => void;
  onClose: () => void;
}

// Datos de ejemplo - en una aplicación real vendrían de una API
const mockClients: Client[] = [
  { id: 1, name: "Juan Pérez", phone: "+34 600 123 456", email: "juan.perez@email.com" },
  { id: 2, name: "María García", phone: "+34 600 234 567", email: "maria.garcia@email.com" },
  { id: 3, name: "Roberto Silva", phone: "+34 600 345 678", email: "roberto.silva@email.com" },
  { id: 4, name: "Ana López", phone: "+34 600 456 789", email: "ana.lopez@email.com" },
  { id: 5, name: "Carlos Ruiz", phone: "+34 600 567 890", email: "carlos.ruiz@email.com" },
];

export function ClientSearch({ onClientSelect, onClose }: ClientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockClients);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredClients(mockClients);
    } else {
      const filtered = mockClients.filter(client =>
        client.name.toLowerCase().includes(term.toLowerCase()) ||
        client.phone.includes(term) ||
        client.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  };

  const handleClientSelect = (client: Client) => {
    onClientSelect(client);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md dark:bg-gray-900/95 rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden border-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Buscar Cliente
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar por nombre, teléfono o email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredClients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No se encontraron clientes</p>
              </div>
            ) : (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={onClose}
              className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 