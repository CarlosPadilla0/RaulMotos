import React from 'react';
import type { OrderData } from '../types';
import { CheckCircleIcon } from './icons';

interface ConfirmationProps {
  orderData: OrderData;
  onStartOver: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ orderData, onStartOver }) => {
  const { product, address, paymentMethod, recipientInfo, deliveryMethod, pickupDate } = orderData;
  const recipient = recipientInfo.recipientType === 'other' ? `${recipientInfo.firstName} ${recipientInfo.lastName}` : address?.recipientName;
  
  const deliveryDate = pickupDate
    ? new Date(pickupDate + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    : "Fecha no especificada";

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
            <CheckCircleIcon className="w-16 h-16 text-coppel-blue mx-auto"/>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">¡Gracias por tu compra!</h1>
            <p className="text-gray-600 mt-2">Tu pedido ha sido confirmado y será procesado pronto.</p>
        </div>

        <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen de la Compra</h2>
            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4"/>
                    <div>
                        <p className="font-bold">{product.name}</p>
                        <p className="text-lg font-semibold text-red-600">${product.price.toLocaleString('es-MX')}</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">{deliveryMethod === 'store' ? 'Recoger en' : 'Dirección de Entrega'}</h3>
                    {deliveryMethod === 'home' && address ? (
                        <p className="text-gray-600">{address.street}, {address.city}, {address.state} {address.zip}</p>
                    ) : (
                        <p className="text-gray-600">Tienda Coppel seleccionada</p>
                    )}
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">Recibirá</h3>
                    <p className="text-gray-600">{recipient}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">Método de Pago</h3>
                    <p className="text-gray-600 capitalize">{paymentMethod?.replace('_', ' ')}</p>
                </div>
                
                 <div>
                    <h3 className="font-semibold text-gray-700">Fecha de Entrega Programada</h3>
                    <p className="text-gray-600">{deliveryDate}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">Información de facturación</h3>
                    <p className="text-gray-600 text-sm">Se te enviará tu factura entre 3 y 5 días hábiles después de recibir la compra. En caso de no recibirla, comunicarte con Raul.mireles@coppel.com o al 01 800 coppelmotos.</p>
                </div>

            </div>
        </div>

        <div className="mt-8 text-center">
            <button 
                onClick={onStartOver}
                className="bg-coppel-blue text-white font-bold py-3 px-12 rounded-full hover:bg-blue-800 transition-colors"
            >
                Realizar otra compra
            </button>
        </div>
    </div>
  );
};