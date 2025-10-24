import React from 'react';
import type { OrderData } from '../types';
import { HomeIcon, StoreIcon } from './icons';
import { Calendar } from './Calendar';

interface DeliveryOptionsProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
}

const DeliveryOptionCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    deliveryEstimate: string;
    description: string;
    value: 'home' | 'store';
    selectedValue: 'home' | 'store' | null;
    onChange: (value: 'home' | 'store') => void;
    disabled?: boolean;
}> = ({ icon, title, deliveryEstimate, description, value, selectedValue, onChange, disabled = false}) => (
    <label className={`flex flex-col p-4 border-2 rounded-lg transition-all ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : selectedValue === value ? 'border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'} ${!disabled && 'cursor-pointer'}`}>
        <div className="flex items-center">
            <input
                type="radio"
                name="deliveryMethod"
                value={value}
                checked={selectedValue === value}
                onChange={() => !disabled && onChange(value)}
                className="sr-only"
                disabled={disabled}
            />
            <div className={`mr-4 ${selectedValue === value && !disabled ? 'text-coppel-blue' : 'text-gray-500'}`}>
                {icon}
            </div>
            <div>
                <p className="font-bold text-gray-800">{title}</p>
                <p className={`text-sm font-semibold ${disabled ? 'text-gray-500' : 'text-coppel-blue'}`}>{deliveryEstimate}</p>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
        </div>
        
    </label>
);


export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({ orderData, setOrderData }) => {
  const { product, deliveryMethod, pickupDate, insurance } = orderData;
  
  const handleDeliveryChange = (value: 'home' | 'store') => {
    setOrderData(prev => ({ ...prev, deliveryMethod: value, pickupDate: null })); // Reset date on method change
  };
  
  const handleDateSelect = (date: string) => {
    setOrderData(prev => ({...prev, pickupDate: date }));
  };

  const getHomeDeliveryEstimate = () => {
    if (deliveryMethod === 'home' && pickupDate) {
        const date = new Date(pickupDate + 'T00:00:00');
        return `Llega el ${date.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}`;
    }
    return "Elige una fecha para la entrega";
  }

  const getInsuranceMessage = () => {
    if (insurance.price > 0 && insurance.name) {
        return `¡Excelente! Has agregado el ${insurance.name} a tu compra para proteger tu moto.`;
    }
    if (insurance.none) {
        return 'Has decidido no incluir una póliza de seguro por el momento.';
    }
    return 'Ninguna moto incluye póliza de seguro.';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full p-6 md:p-8">
        <h3 className="text-lg font-bold mb-4">Motos</h3>
        <div className="bg-yellow-50 border-l-4 border-coppel-yellow text-yellow-800 p-4 rounded-r-lg mb-4 text-sm" role="alert">
            <p><strong>Por motivos de facturación</strong>, solo puedes incluir 1 moto en cada compra. Los demás productos deben ir en otro pedido.</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-coppel-blue text-blue-800 p-4 rounded-r-lg mb-6 text-sm" role="alert">
            <p>{getInsuranceMessage()}</p>
        </div>

        <div className="border rounded-lg p-4 flex items-center justify-between mb-6">
            <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <div className="text-xs inline-flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full mt-1">
                        <span className="w-2 h-2 rounded-full bg-coppel-yellow mr-1.5"></span> Vendido por {product.seller}
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-500">Cantidad: {product.quantity}</p>
                <p className="font-bold text-lg">${product.price.toLocaleString('es-MX')}</p>
                <p className="text-sm text-gray-400 line-through">${product.originalPrice.toLocaleString('es-MX')}</p>
                 <div className="mt-2 text-xs">
                    <button className="text-red-500 hover:underline">Eliminar</button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-coppel-blue hover:underline">Guardar para después</button>
                </div>
            </div>
        </div>

        <h3 className="text-lg font-bold mb-4">Opciones de entrega</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <DeliveryOptionCard 
                icon={<HomeIcon className="w-8 h-8"/>}
                title="Recibir a domicilio"
                deliveryEstimate={getHomeDeliveryEstimate()}
                description="Más adelante podrás elegir el domicilio"
                value="home"
                selectedValue={orderData.deliveryMethod}
                onChange={handleDeliveryChange}
            />
            <DeliveryOptionCard 
                icon={<StoreIcon className="w-8 h-8"/>}
                title="Recoger en tienda"
                deliveryEstimate="No disponible"
                description="Esta opción no está disponible por el momento"
                value="store"
                selectedValue={orderData.deliveryMethod}
                onChange={handleDeliveryChange}
                disabled={true}
            />
        </div>
         {deliveryMethod === 'home' && (
            <div className="mt-6">
                <h4 className="font-bold text-gray-800 mb-2">Selecciona un día de entrega</h4>
                <Calendar selectedDate={pickupDate} onDateSelect={handleDateSelect} />
            </div>
        )}
    </div>
  );
};