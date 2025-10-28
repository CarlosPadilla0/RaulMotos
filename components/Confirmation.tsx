import React from 'react';
import type { CheckoutProduct, User } from '../types';
import { CheckCircleIcon, InformationCircleIcon } from './icons';

interface ConfirmationProps {
  completedProducts: CheckoutProduct[];
  onStartOver: () => void;
  currentUser: User | null;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ completedProducts, onStartOver, currentUser }) => {
  
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">¡Gracias por tu compra!</h1>
            <p className="text-lg text-gray-600 mt-2">Hemos recibido tu(s) pedido(s) y lo(s) estamos procesando.</p>
            
            <div className="mt-8 text-left border-t pt-6 space-y-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen de Pedidos</h2>
                {completedProducts.map(product => {
                    let recipient: string | undefined;

                    if (product.recipientInfo.recipientType === 'other') {
                        recipient = `${product.recipientInfo.firstName} ${product.recipientInfo.lastName}`;
                    } else if (product.recipientInfo.recipientType === 'self' && currentUser) {
                        recipient = currentUser.billingInfo.name;
                    } else {
                        // Fallback for guest checkout or unexpected cases
                        recipient = product.address?.recipientName;
                    }
  
                    const deliveryDate = product.pickupDate
                        ? new Date(product.pickupDate + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
                        : "Fecha no especificada";

                    return (
                        <div key={product.sku} className="border rounded-lg p-4 flex flex-col sm:flex-row items-start gap-4">
                            <img src={product.image} alt={product.name} className="w-full sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0" />
                            <div className="flex-grow w-full">
                                <h3 className="font-bold text-gray-800 text-lg mb-3">{product.name}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    <div>
                                        <h4 className="font-semibold text-gray-600">Dirección de Entrega</h4>
                                        <p className="text-gray-800">{product.address ? `${product.address.street}, ${product.address.city}` : 'No especificada'}</p>
                                    </div>
                                     <div>
                                        <h4 className="font-semibold text-gray-600">Recibirá</h4>
                                        <p className="text-gray-800">{recipient}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-600">Método de Pago</h4>
                                        <p className="text-gray-800 capitalize">{product.paymentMethod?.replace('_', ' ')}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-600">Fecha de Entrega</h4>
                                        <p className="text-gray-800">{deliveryDate}</p>
                                    </div>
                                    {product.insurance.name && (
                                         <div>
                                            <h4 className="font-semibold text-gray-600">Seguro Contratado</h4>
                                            <p className="text-gray-800">{product.insurance.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 text-left border-t pt-6">
                <div className="flex items-start">
                    <InformationCircleIcon className="w-5 h-5 text-coppel-blue mr-3 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Información de facturación</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Se te enviará tu factura entre 3 y 5 días hábiles después de recibir la compra.
                            En caso de no recibirla, comunícate con <a href="mailto:Raul.mireles@coppel.com" className="text-coppel-blue hover:underline font-medium">Raul.mireles@coppel.com</a> o al 01 800 coppelmotos.
                        </p>
                    </div>
                </div>
            </div>

             <div className="mt-10">
                <button 
                    onClick={onStartOver}
                    className="bg-coppel-blue text-white font-bold py-3 px-12 rounded-full hover:bg-blue-800 transition-colors text-lg"
                >
                    Realizar otra compra
                </button>
            </div>
        </div>
    </div>
  );
};