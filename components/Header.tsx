import React from 'react';
import type { User } from '../types';
import { CoppelLogo, MotorcycleIcon } from './icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  currentUser: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onHomeClick, currentUser, onLogin, onLogout }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button onClick={onHomeClick} className="flex items-center gap-2 text-xl font-bold text-coppel-blue hover:opacity-80 transition-opacity">
           <CoppelLogo className="w-35 h-12"/>
           <span>Raul Motos</span>
        </button>
        <div className="flex items-center gap-6">
            {currentUser ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 hidden sm:block">
                        Hola, <span className="font-semibold">{currentUser.billingInfo.name.split(' ')[0]}</span>
                    </span>
                    <button onClick={onLogout} className="text-sm font-semibold text-coppel-blue hover:underline">
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                 <button onClick={onLogin} className="text-sm font-semibold text-coppel-blue hover:underline">
                    Iniciar Sesión
                </button>
            )}
            <button onClick={onCartClick} className="relative text-gray-600 hover:text-coppel-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-5.513A1.875 1.875 0 0 0 18.125 5.25H5.875a1.875 1.875 0 0 0-1.875 1.875l-1.5 6A1.875 1.875 0 0 0 4.375 15H5.25" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
        </div>
      </div>
    </header>
  );
};