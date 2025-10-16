
import React, { useState } from 'react';
import type { OrderData } from '../types';
import { CheckoutStepWrapper } from './CheckoutStepWrapper';
import { XCircleIcon } from './icons';

interface RecipientInfoProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onBack: () => void;
  onContinue: () => void;
}

const Input = ({ label, id, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, required?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input id={id} {...props} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm" />
    </div>
);


export const RecipientInfo: React.FC<RecipientInfoProps> = ({ orderData, setOrderData, onBack, onContinue }) => {
    const [showIneHelp, setShowIneHelp] = useState(false);
    
    const handleRecipientTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRecipientType = e.target.value as 'self' | 'other';
        
        setOrderData(prev => ({
            ...prev,
            recipientInfo: { ...prev.recipientInfo, recipientType: newRecipientType }
        }));
        
        if (newRecipientType === 'other') {
             alert("Se enviará un formato al correo proporcionado, es necesario presentarlo al momento de recibir.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData(prev => ({
            ...prev,
            recipientInfo: { ...prev.recipientInfo, [e.target.name]: e.target.value }
        }));
    };

    const handleContinue = () => {
        if (!orderData.recipientInfo.recipientType) {
            alert('Por favor, selecciona quién recibirá el pedido.');
            return;
        }

        if (orderData.recipientInfo.recipientType === 'other') {
            const { firstName, lastName, phone, ineVerificationCode } = orderData.recipientInfo;
            if (!firstName || !lastName || !phone || !ineVerificationCode) {
                 alert('Por favor, completa todos los datos de la persona que recibe, incluyendo el código de verificación INE.');
                 return;
            }
        }
        onContinue();
    };
    
    return (
        <CheckoutStepWrapper title="Persona que recibe" onBack={onBack}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">¿Quién recibirá tu pedido?<span className="text-red-500">*</span></label>
                    <div className="space-y-2">
                        <label className="flex items-center cursor-pointer p-3 border rounded-lg hover:border-coppel-blue transition-colors">
                            <input 
                                type="radio" 
                                name="recipientType"
                                value="self"
                                checked={orderData.recipientInfo.recipientType === 'self'}
                                onChange={handleRecipientTypeChange}
                                className="h-4 w-4 text-coppel-blue focus:ring-coppel-blue border-gray-300"
                            />
                            <span className="ml-3 font-medium text-gray-800">Yo recibiré</span>
                        </label>
                         <label className="flex items-center cursor-pointer p-3 border rounded-lg hover:border-coppel-blue transition-colors">
                            <input 
                                type="radio" 
                                name="recipientType"
                                value="other"
                                checked={orderData.recipientInfo.recipientType === 'other'}
                                onChange={handleRecipientTypeChange}
                                className="h-4 w-4 text-coppel-blue focus:ring-coppel-blue border-gray-300"
                            />
                            <span className="ml-3 font-medium text-gray-800">Alguien más recibirá mi pedido</span>
                        </label>
                    </div>
                </div>
                
                {orderData.recipientInfo.recipientType === 'other' && (
                    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                        <p className="text-sm text-gray-500">Los campos con asterisco (*) son obligatorios</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Input label="Nombre completo" id="firstName" name="firstName" value={orderData.recipientInfo.firstName} onChange={handleChange} required />
                             <Input label="Apellido(s)" id="lastName" name="lastName" value={orderData.recipientInfo.lastName} onChange={handleChange} required />
                        </div>
                        <div>
                             <Input label="Teléfono" id="phone" name="phone" type="tel" value={orderData.recipientInfo.phone} onChange={handleChange} required />
                             <div className="flex items-center space-x-4 mt-2">
                                <label className="flex items-center text-sm">
                                    <input type="radio" name="phoneType" value="mobile" checked={orderData.recipientInfo.phoneType === 'mobile'} onChange={handleChange} className="h-4 w-4 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                                    <span className="ml-2">Celular</span>
                                </label>
                                <label className="flex items-center text-sm">
                                    <input type="radio" name="phoneType" value="landline" checked={orderData.recipientInfo.phoneType === 'landline'} onChange={handleChange} className="h-4 w-4 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                                    <span className="ml-2">Fijo</span>
                                </label>
                             </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="ineVerificationCode" className="block text-sm font-medium text-gray-700">
                                    Código de verificación INE (OCR)<span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowIneHelp(true)}
                                    className="text-sm text-coppel-blue hover:underline focus:outline-none"
                                >
                                    ¿No sabes cuál es?
                                </button>
                            </div>
                            <input 
                                id="ineVerificationCode" 
                                name="ineVerificationCode" 
                                value={orderData.recipientInfo.ineVerificationCode} 
                                onChange={handleChange}
                                placeholder="Se encuentra al reverso de tu INE"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm"
                            />
                        </div>
                    </div>
                )}
                 <div className="flex justify-center mt-6">
                     <button onClick={handleContinue} className="w-full md:w-auto bg-coppel-blue text-white font-bold py-3 px-16 rounded-full hover:bg-blue-800 transition-colors text-lg">
                        Ir a formas de pago
                    </button>
                 </div>
            </div>

            {showIneHelp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
                    <div className="bg-white rounded-lg shadow-xl p-6 pt-12 relative max-w-lg w-full">
                        <button 
                            onClick={() => setShowIneHelp(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            aria-label="Cerrar"
                        >
                            <XCircleIcon className="w-8 h-8" />
                        </button>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Código de Verificación (OCR)</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            El código de verificación (OCR) se encuentra al reverso de tu credencial para votar, como se muestra en la imagen.
                        </p>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0XbCfLgEXq1fqt4PfIjGXUUSt2CQNPSxhQ&s" alt="Ejemplo de INE mostrando el código de verificación OCR" className="w-full rounded-md border" />
                    </div>
                </div>
            )}
        </CheckoutStepWrapper>
    );
};