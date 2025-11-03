import React from 'react';
import type { CheckoutProduct } from '../types';

interface CartProps {
  cartItems: CheckoutProduct[];
  onContinue: () => void;
  onGoHome: () => void;
  isEmployee: boolean;
}

export const Cart: React.FC<CartProps> = ({ cartItems, onContinue, onGoHome, isEmployee }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = isEmployee ? subtotal * 0.25 : 0;
  const total = subtotal - discount;


  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mi Carrito</h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 space-y-4">
                <h2 className="text-xl font-bold">Artículos</h2>
                {cartItems.map(item => (
                    <div key={item.sku} className="flex items-center border-b pb-4 last:border-b-0">
                         <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4"/>
                         <div className="flex-grow">
                             <p className="font-semibold text-gray-800">{item.name}</p>
                             <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                         </div>
                         <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">${item.price.toLocaleString('es-MX')}</p>
                         </div>
                    </div>
                ))}
            </div>
            <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6 sticky top-24">
                 <h2 className="text-xl font-bold mb-4 border-b pb-3">Resumen de tu compra</h2>
                 <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                        <span>Subtotal ({cartItems.length} productos)</span>
                        <span>${subtotal.toLocaleString('es-MX')}</span>
                    </div>
                    {isEmployee && (
                        <div className="flex justify-between font-semibold text-red-600">
                            <span>Descuento Colaborador (25%)</span>
                            <span>-${discount.toLocaleString('es-MX')}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span>Envío</span>
                        <span className="font-semibold text-green-600">Gratis</span>
                    </div>
                 </div>
                 <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
                    <span>Total de contado</span>
                    <span>${total.toLocaleString('es-MX')}</span>
                 </div>
                 <button 
                    onClick={onContinue}
                    className="w-full mt-6 bg-coppel-blue text-white font-bold py-3 rounded-full hover:bg-blue-800 transition-colors text-lg"
                 >
                    Proceder con la Compra
                 </button>
            </div>
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Tu carrito está vacío</h2>
          <p className="text-gray-500 mt-2">Aún no has agregado ninguna moto. ¡Explora nuestro catálogo!</p>
           <button 
                onClick={onGoHome}
                className="mt-6 bg-coppel-blue text-white font-bold py-3 px-12 rounded-full hover:bg-blue-800 transition-colors"
            >
                Ver motocicletas
            </button>
        </div>
      )}
    </div>
  );
};