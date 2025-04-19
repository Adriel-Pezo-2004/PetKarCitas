"use client";

import React, { useState } from 'react';
import * as Toast from '@radix-ui/react-toast';

const AppointmentsPage = () => {
  const [dni, setDni] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos.');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-5 border border-gray-700 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 text-center">
          Buscar Citas por DNI
        </h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Ingrese el DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={8}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg shadow-sm hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 flex items-center justify-center min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Buscando...
                </>
              ) : 'Buscar'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        </form>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : hasSearched && appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No se encontraron citas para el DNI ingresado.</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300 text-center sm:text-left">Resultados:</h2>
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="p-4 sm:p-5 border border-gray-700 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-200"
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
          <div className="text-center py-12 text-gray-500">
            <p>Ingrese un DNI y haga clic en Buscar para ver las citas</p>
          </div>
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