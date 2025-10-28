import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
  onGuest: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onGuest }) => {
  const [email, setEmail] = useState('RaulMireles@coppel.com');
  const [password, setPassword] = useState('•••••');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" 
        aria-modal="true" 
        role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-8 relative max-w-md w-full text-left transform transition-all scale-100 opacity-100 animate-fade-in-up"
      >
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Casi listo!</h2>
            <p className="text-gray-600 mb-8">Inicia sesión para una compra más rápida o continúa como invitado.</p>
        </div>
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
               <input
                type="email"
                name="email"
                id="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-coppel-blue text-white font-bold py-3 px-4 rounded-full hover:bg-blue-800 transition-colors text-lg mt-6"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">o</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button
            onClick={onGuest}
            className="w-full mt-6 bg-white border-2 border-coppel-blue text-coppel-blue font-bold py-3 px-4 rounded-full hover:bg-blue-50 transition-colors text-lg"
        >
            Continuar como invitado
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};