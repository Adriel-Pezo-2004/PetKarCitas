// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <main className="flex flex-col items-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          Creador de Citas
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ingresa tus datos para agendar tu cita
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Link href="/dashboard" className="p-6 border border-indigo-100 rounded-lg shadow-md hover:shadow-lg bg-white transition-shadow">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Dashboard</h2>
            <p className="text-gray-600">Visualiza tus citas y estadísticas en un solo lugar</p>
          </Link>
          
          <Link href="/appointments" className="p-6 border border-indigo-100 rounded-lg shadow-md hover:shadow-lg bg-white transition-shadow">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Gestionar Citas</h2>
            <p className="text-gray-600">Crea, edita y organiza tus citas</p>
          </Link>
          
          <Link href="/clients" className="p-6 border border-indigo-100 rounded-lg shadow-md hover:shadow-lg bg-white transition-shadow">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Clientes</h2>
            <p className="text-gray-600">Administra tu base de datos de clientes</p>
          </Link>
          
          <Link href="/clients/create" className="p-6 border border-indigo-100 rounded-lg shadow-md hover:shadow-lg bg-white transition-shadow">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Nueva Cita</h2>
            <p className="text-gray-600">Programa una nueva cita rápidamente</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

