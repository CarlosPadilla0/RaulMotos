import React, { useState } from 'react';
import type { OrderData, BillingInfo } from '../types';

const mockUsers: Record<string, BillingInfo> = {
     'RaulMireless@coppel.com': {
        rfc: 'MIRM900101ABC',
        useGenericRfc: false,
        name: 'Raul Mireles',
        dob: '01/01/1990',
        postalCode: '80000',
        regime: '612',
        cfdiUse: 'G03',
        email: 'RaulMireless@coppel.com',
        confirmEmail: 'RaulMireless@coppel.com',
        curp: 'MIRM900101HZZZZZ01',
        gender: 'male',
    },
    'MelissaVelazquez@coppel.com': {
        rfc: 'VEGM850202XYZ',
        useGenericRfc: false,
        name: 'Melissa Velazquez',
        dob: '02/02/1985',
        postalCode: '80028',
        regime: '626',
        cfdiUse: 'G01',
        email: 'MelissaVelazquez@coppel.com',
        confirmEmail: 'MelissaVelazquez@coppel.com',
        curp: 'VEGM850202MZZZZZ02',
        gender: 'female',
    },
};


interface LoginModalProps {
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onContinue: (isGuest: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ setOrderData, onContinue }) => {
    const [email, setEmail] = useState('RaulMireless@coppel.com');
    const [password, setPassword] = useState('12345');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const userData = mockUsers[email];
        if (userData) {
            setError('');
            setOrderData(prev => ({
                ...prev,
                billingInfo: userData,
            }));
            onContinue(false); // User is NOT a guest
        } else {
            setError('Correo o contraseña inválidos. Intenta con los correos de ejemplo.');
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">¡Casi listo!</h2>
                <p className="text-center text-gray-600 mb-6">Inicia sesión para una compra más rápida o continúa como invitado.</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <select
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm"
                        >
                            <option value="RaulMireless@coppel.com">RaulMireles@coppel.com</option>
                            <option value="MelissaVelazquez@coppel.com">MelissaVelazquez@coppel.com</option>
                        </select>
                     </div>
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm"
                         />
                     </div>
                     {error && <p className="text-sm text-red-600">{error}</p>}
                     <button type="submit" className="w-full bg-coppel-blue text-white font-bold py-3 rounded-full hover:bg-blue-800 transition-colors text-lg">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">o</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                 <button onClick={() => onContinue(true)} className="w-full bg-white border-2 border-coppel-blue text-coppel-blue font-bold py-3 rounded-full hover:bg-blue-50 transition-colors text-lg">
                    Continuar como invitado
                </button>
            </div>
        </div>
    );
};