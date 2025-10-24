

import React from 'react';
import { ChevronRightIcon, CheckCircleIcon, XCircleIcon } from './icons';
import type { OrderData, ModalConfig } from '../types';

interface AddedToCartModalProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onContinue: () => void;
  showModal: (config: ModalConfig) => void;
}

export const AddedToCartModal: React.FC<AddedToCartModalProps> = ({ orderData, setOrderData, onContinue, showModal }) => {
  const { product, insurance } = orderData;
  
  if (!product) {
      // This should not happen if the flow is correct, but it's a good safeguard.
      return null; 
  }

  const insuranceOptions = {
    plus: { name: 'Seguro Plus', price: 5499 },
    rc: { name: 'Seguro RC', price: 2199 },
    none: { name: 'No me interesa por el momento', price: 0 },
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target as { name: 'plus' | 'rc' | 'none'; checked: boolean };
    
    setOrderData(prev => ({
      ...prev,
      insurance: {
        plus: name === 'plus' && checked,
        rc: name === 'rc' && checked,
        none: name === 'none' && checked,
        price: checked ? insuranceOptions[name].price : 0,
        name: checked ? insuranceOptions[name].name : '',
      }
    }));
  };
  
  const handleContinue = () => {
      if (!insurance.plus && !insurance.rc && !insurance.none) {
          showModal({
            type: 'warning',
            title: 'Opción Requerida',
            message: 'Por favor, selecciona una opción de seguro para continuar.',
          });
          return;
      }
      onContinue();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 md:p-8">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XCircleIcon className="w-8 h-8" />
        </button>
        <div className="flex items-center text-coppel-blue mb-6">
          <CheckCircleIcon className="w-7 h-7 mr-3"/>
          <h2 className="text-2xl font-semibold">Agregado al carrito</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Info */}
          <div className="flex flex-col items-center text-center">
            <img src={product.image} alt={product.name} className="max-w-xs w-full object-cover rounded-lg mb-4"/>
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 mt-1">Vendido y entregado por <strong>{product.seller}</strong></p>
            <p className="text-gray-500">Cantidad: {product.quantity}</p>
            <div className="mt-2">
              <span className="text-3xl font-bold text-red-600">${product.price.toLocaleString('es-MX')}</span>
              <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice.toLocaleString('es-MX')}</span>
            </div>
          </div>
          
          {/* Insurance Options */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-700 font-medium mb-4">
              Protege tu moto con un seguro. Elige una de nuestras opciones:
            </p>
            <div className="space-y-4">
              <label className="flex items-start p-4 border rounded-lg hover:border-coppel-blue transition-colors cursor-pointer">
                <input type="checkbox" name="plus" checked={insurance.plus} onChange={handleCheckboxChange} className="mt-1 h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300 rounded"/>
                <div className="ml-4">
                  <span className="font-semibold text-gray-800">Seguro Plus</span>
                  <p className="text-sm text-gray-500">Contado: $5,499</p>
                  <p className="text-sm text-gray-500">Crédito Coppel: Desde $250 quincenales</p>
                </div>
              </label>
              <label className="flex items-start p-4 border rounded-lg hover:border-coppel-blue transition-colors cursor-pointer">
                <input type="checkbox" name="rc" checked={insurance.rc} onChange={handleCheckboxChange} className="mt-1 h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300 rounded"/>
                <div className="ml-4">
                  <span className="font-semibold text-gray-800">Seguro RC</span>
                  <p className="text-sm text-gray-500">Contado: $2,199</p>
                  <p className="text-sm text-gray-500">Crédito Coppel: Desde $110 quincenales</p>
                </div>
              </label>
              <label className="flex items-center p-4 border rounded-lg hover:border-coppel-blue transition-colors cursor-pointer">
                <input type="checkbox" name="none" checked={insurance.none} onChange={handleCheckboxChange} className="h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300 rounded"/>
                <span className="ml-4 text-gray-700">No me interesa por el momento.</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t">
          <button className="flex items-center text-coppel-blue font-semibold hover:underline mb-4 md:mb-0">
            Seguir viendo productos
            <ChevronRightIcon className="w-5 h-5 ml-1" />
          </button>
          <button onClick={handleContinue} className="w-full md:w-auto bg-coppel-blue text-white font-bold py-3 px-12 rounded-full hover:bg-blue-800 transition-colors text-lg">
            Continuar con la compra
          </button>
        </div>
      </div>
    </div>
  );
};