/*
import React from 'react';
import type { Product } from '../types';
import { InformationCircleIcon } from './icons';

interface DeliveryOptionsProps {
  product: Product;
  onUpdateInsurance: (insurance: Product['insurance']) => void;
  onAddToCartAndContinueShopping: () => void;
  onProceedToCart: () => void;
}

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({ product, onUpdateInsurance, onAddToCartAndContinueShopping, onProceedToCart }) => {
    const insurance = product.insurance || { plus: false, rc: false, none: true, price: 0, name: '' };
    
    const handleInsuranceChange = (type: 'plus' | 'rc' | 'none') => {
        const newInsurance = {
            plus: type === 'plus',
            rc: type === 'rc',
            none: type === 'none',
            price: type === 'rc' ? 2199 : 0, // Simplified logic for example
            name: type === 'rc' ? 'Seguro RC' : '',
        };
        onUpdateInsurance(newInsurance);
    };

    const subtotal = product.price + (insurance?.price || 0);

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Configura tu Motocicleta</h1>
                
                <div className="flex flex-col md:flex-row items-center border rounded-lg p-4">
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-6" />
                    <div className="flex-grow text-center md:text-left">
                        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                        <p className="text-gray-500 text-sm">Vendido por {product.seller}</p>
                        <div className="mt-2">
                             <span className="text-2xl font-bold text-red-600">${product.price.toLocaleString('es-MX')}</span>
                             <span className="ml-2 text-md text-gray-500 line-through">${product.originalPrice.toLocaleString('es-MX')}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Protege tu moto con un seguro</h3>
                    <div className="space-y-3">
                            <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${insurance.rc ? 'border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                            <input type="radio" name="insurance" checked={insurance.rc} onChange={() => handleInsuranceChange('rc')} className="mt-1 h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                            <div className="ml-4 flex-grow">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Seguro de Responsabilidad Civil (RC)</span>
                                    <span className="font-bold text-coppel-blue">$2,199</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Cubre daños a terceros hasta por $250,000. ¡Indispensable para rodar seguro!</p>
                            </div>
                        </label>
                        <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${insurance.none ? 'border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                            <input type="radio" name="insurance" checked={insurance.none} onChange={() => handleInsuranceChange('none')} className="mt-1 h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                            <div className="ml-4">
                                <span className="font-bold text-gray-800">No, gracias</span>
                                <p className="text-sm text-gray-600 mt-1">Entiendo los riesgos y prefiero no asegurar mi motocicleta en este momento.</p>
                            </div>
                        </label>
                    </div>
                     {insurance.rc && (
                         <div className="mt-4 p-3 bg-blue-50 border-l-4 border-coppel-blue text-coppel-blue rounded-r-lg">
                            <p className="font-semibold">¡Excelente! Has agregado el Seguro RC a tu compra para proteger tu moto.</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t">
                    <div className="text-right mb-6">
                        <span className="text-lg font-medium text-gray-600">Subtotal de este artículo: </span>
                        <span className="text-2xl font-bold text-gray-900">${subtotal.toLocaleString('es-MX')}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
                        <button onClick={onAddToCartAndContinueShopping} className="w-full sm:w-auto text-coppel-blue font-bold py-3 px-8 rounded-full border-2 border-coppel-blue hover:bg-blue-50 transition-colors">
                            Agregar y seguir comprando
                        </button>
                        <button onClick={onProceedToCart} className="w-full sm:w-auto bg-coppel-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors">
                           Ir a pagar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};







*/