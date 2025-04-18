// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/common/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gestor de Citas',
  description: 'Aplicación para la gestión de citas y clientes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-100 py-4">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Gestor de Citas - Todos los derechos reservados
            </div>
          </footer>
        </div>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}

