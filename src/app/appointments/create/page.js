"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const CreateAppointmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    date: '',
    time: '',
    clientId: '',
    dni: '',
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const clientId = searchParams.get('clientId');
    const storedDni = sessionStorage.getItem('clientDni');
    
    if (clientId) {
      setFormData(prev => ({ ...prev, clientId }));
    }
    
    if (storedDni) {
      setFormData(prev => ({ ...prev, dni: storedDni }));
      sessionStorage.removeItem('clientDni');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateTime = new Date(`${formData.date}T${formData.time}:00`);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: dateTime.toISOString(),
        }),
      });

      if (response.ok) {
        setFormData({
          title: '',
          type: '',
          description: '',
          date: '',
          time: '',
          address: '',
          clientId: '',
          dni: '',
        });
        setTimeout(() => {
          router.push(`/`);
        }, 3500);
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error al crear cita:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 gap-8">
      {/* Formulario */}
      <div className="w-full max-w-md bg-gray-800/50 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Crear Nueva Cita
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Cita *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
              required
            >
              <option value="" className="bg-gray-800">Seleccione un tipo</option>
              <option value="Spa" className="bg-gray-800">Spa</option>
              <option value="Control Veterinario" className="bg-gray-800">Control Veterinario</option>
              <option value="Otro" className="bg-gray-800">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
              Dirección *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
            />
          </div>

          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-300 mb-2">
              DNI del Cliente *
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-400"
              required
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                Fecha *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                Hora *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200"
            >
              Crear Cita
            </button>
          </div>
        </form>
      </div>
      {/* Contenedor del Mapa */}
      <div className="w-full lg:w-1/2 bg-gray-800/50 rounded-xl border border-gray-700 p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Ubicación en el Mapa</h2>
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=16ZHbxOq4aCNO1w-YwAUZYzk8KG-4Sxo&ehbc=2E312F"
          width="100%"
          height="400"
          className="border-0 rounded-lg shadow-lg mb-4"
          allowFullScreen
          loading="lazy"
        ></iframe>
        
        {/* Leyenda de Zonas */}
        <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
          <h3 className="text-md font-medium text-gray-300 mb-3">Zonas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400 mr-2"></div>
              <span className="text-sm text-gray-300">Pampa Zona Este</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pampa Oeste</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Alto Ilo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Puerto</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Miramar-Gerónimo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pacocha Norte</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pacocha Sur</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-pink-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pampa Norte</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pampa Sur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppointmentsCreatePage = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CreateAppointmentForm />
    </Suspense>
  );
};

export default AppointmentsCreatePage;