// components/common/NavBar.jsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Gestor de Citas
        </Link>
        
        <div className="flex space-x-4">
          <Link 
            href="/dashboard" 
            className={`${pathname === '/dashboard' ? 'bg-indigo-800' : 'hover:bg-indigo-700'} px-3 py-2 rounded-md`}
          >
            Dashboard
          </Link>
          <Link 
            href="/appointments" 
            className={`${pathname.startsWith('/appointments') ? 'bg-indigo-800' : 'hover:bg-indigo-700'} px-3 py-2 rounded-md`}
          >
            Citas
          </Link>
          <Link 
            href="/clients" 
            className={`${pathname.startsWith('/clients') ? 'bg-indigo-800' : 'hover:bg-indigo-700'} px-3 py-2 rounded-md`}
          >
            Clientes
          </Link>
        </div>
      </div>
    </nav>
  );
}

