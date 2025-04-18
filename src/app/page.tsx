import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <main className="flex flex-col items-center w-full max-w-4xl mx-auto text-center">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Petkar Móvil
          </h1>
          <p className="text-xl text-gray-300">
            Gestor de Citas Avanzado
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link 
            href="/appointments" 
            className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 p-6 transition-all hover:bg-gray-800/70 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">Gestionar Citas</h2>
              <p className="text-gray-400">Visualiza, edita y organiza tus citas existentes</p>
            </div>
            <div className="absolute bottom-4 right-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
          
          <Link 
            href="/clients/create" 
            className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 p-6 transition-all hover:bg-gray-800/70 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-blue-400 mb-3">Nueva Cita</h2>
              <p className="text-gray-400">Programa una nueva cita rápidamente</p>
            </div>
            <div className="absolute bottom-4 right-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>2025. Adriel Pezo©</p>
        </div>
      </main>
    </div>
  );
}