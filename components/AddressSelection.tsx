
import React from 'react';
import type { OrderData, Address } from '../types';
import { CheckoutStepWrapper } from './CheckoutStepWrapper';
import { MotorcycleIcon, StarIcon, HomeIcon, PlusCircleIcon, HomeIcon2 } from './icons';

const addresses: Address[] = [
   
     {
        id: '1',
        isFavorite: true,
        recipientName: "José Raúl Ríos Mireles",
        street: "Calle Principal 123, Colonia Centro",
        city: "CULIACAN ROSALES",
        state: "SINALOA",
        zip: "80000"
    },
     {
        id: '2',
        isFavorite: false,
        recipientName: "Melissa Martinez Velazquez",
        street: "Boulevard Salvador Alvarado, Aerolito y meteorito",
        city: "CULIACAN ROSALES",
        state: "SINALOA",
        zip: "80028"
    },
];

interface AddressSelectionProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onBack: () => void;
  onContinue: () => void;
}

export const AddressSelection: React.FC<AddressSelectionProps> = ({ orderData, setOrderData, onBack, onContinue }) => {
    
    const handleSelectAddress = (address: Address) => {
        setOrderData(prev => ({...prev, address: address}));
        onContinue();
    };

    return (
        <CheckoutStepWrapper title="Indica los datos de entrega" onBack={onBack}>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center mb-6">
                <div className="bg-white p-2 rounded-md shadow-sm mr-4">
                    <HomeIcon2 className="w-8 h-8 text-gray-600"/>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Para recibir a domicilio</h3>
            </div>
            
            <div className="space-y-4">
                {addresses.map(address => (
                    <div key={address.id} className={`p-4 border rounded-lg cursor-pointer transition-all ${orderData.address?.id === address.id ? 'border-2 border-coppel-blue bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'}`} onClick={() => handleSelectAddress(address)}>
                        {address.isFavorite && (
                             <div className="flex items-center text-xs text-coppel-blue font-semibold mb-2">
                                <StarIcon className="w-4 h-4 mr-1"/>
                                <span>Domicilio favorito</span>
                            </div>
                        )}
                        <div className="flex items-start">
                            <HomeIcon2 className="w-5 h-5 text-gray-500 mr-3 mt-1"/>
                            <div>
                                <p className="font-bold text-gray-900">{address.recipientName}</p>
                                <p className="text-gray-600 text-sm">{address.street}, {address.zip}, {address.city}, {address.state.toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-3 text-sm font-semibold">
                            <button className="text-red-500 hover:underline" onClick={(e) => {e.stopPropagation()}}>Eliminar</button>
                            <button className="text-coppel-blue hover:underline" onClick={(e) => {e.stopPropagation()}}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full flex items-center justify-center p-4 mt-6 border border-dashed border-gray-400 rounded-lg text-coppel-blue font-semibold hover:bg-gray-50 transition-colors">
                <PlusCircleIcon className="w-6 h-6 mr-2" />
                Agregar nuevo domicilio
            </button>
        </CheckoutStepWrapper>
    );
};