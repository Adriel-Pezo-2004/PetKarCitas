"use client";

import React, { useState } from 'react';
import * as Toast from '@radix-ui/react-toast';

const AppointmentsPage = () => {
  const [dni, setDni] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`/api/appointments?dni=${dni}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al buscar citas.');
        setAppointments([]);
        setToastMessage('No se encontraron citas');
        setOpenToast(true);
      }
    } catch (err) {
      console.error('Error al buscar citas:', err);
      setToastMessage('Error al buscar citas');
      setOpenToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Buscar Citas por DNI
        </h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Ingrese el DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={8}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg shadow-sm hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
            >
              Buscar
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </form>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300">Resultados:</h2>
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="p-5 border border-gray-700 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-200"
                >
                  <h3 className="text-lg font-bold text-cyan-400">{appointment.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-400">Tipo: <span className="text-gray-300">{appointment.type}</span></p>
                      <p className="text-sm text-gray-400">Descripción: <span className="text-gray-300">{appointment.description || 'N/A'}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Fecha: <span className="text-gray-300">{new Date(appointment.date).toLocaleDateString()}</span></p>
                      <p className="text-sm text-gray-400">Hora: <span className="text-gray-300">{appointment.time}</span></p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400">No se encontraron citas para el DNI ingresado.</p>
        )}

        <Toast.Provider duration={5000}>
          <Toast.Root
            open={openToast}
            onOpenChange={setOpenToast}
            className="bg-gray-800 border border-cyan-500/30 rounded-lg p-4 shadow-lg animate-in fade-in slide-in-from-right-8"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <Toast.Title className="font-medium text-cyan-400">
                  Notificación
                </Toast.Title>
                <Toast.Description className="text-gray-300 mt-1">
                  {toastMessage}
                </Toast.Description>
              </div>
              <Toast.Close className="ml-4 text-gray-400 hover:text-gray-200">
                ×
              </Toast.Close>
            </div>
          </Toast.Root>
          <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-full max-w-xs z-50" />
        </Toast.Provider>
      </div>
    </div>
  );
};

export default AppointmentsPage;