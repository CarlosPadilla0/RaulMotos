import React, { useState, useEffect } from 'react';
import type { CheckoutProduct, Address } from '../types';
import { MotorcycleIcon, StarIcon, HomeIcon, PlusCircleIcon, StoreIcon } from './icons';

interface AddressSelectionProps {
  activeProduct: CheckoutProduct;
  onUpdate: (data: Partial<CheckoutProduct>) => void;
  availableAddresses: Address[];
  isGuest: boolean;
}

const Input = ({ label, id, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label:string, required?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input id={id} {...props} className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm" />
    </div>
);

const GuestAddressForm: React.FC<{ address: Address | null, onUpdate: (address: Address) => void }> = ({ address, onUpdate }) => {
    const [formData, setFormData] = useState({
        recipientName: address?.recipientName || '',
        street: address?.street || '',
        zip: address?.zip || '',
        city: address?.city || '',
        state: address?.state || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleBlur = () => {
        const newAddress: Address = {
            ...formData,
            id: 'guest-address',
            isFavorite: false,
        };
        onUpdate(newAddress);
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <p className="text-sm text-gray-500">Completa los campos para la entrega. Los campos con asterisco (*) son obligatorios.</p>
            <Input label="Nombre de quien recibe" id="recipientName" name="recipientName" value={formData.recipientName} onChange={handleChange} onBlur={handleBlur} required />
            <Input label="Calle y número" id="street" name="street" value={formData.street} onChange={handleChange} onBlur={handleBlur} required />
            <Input label="Código Postal" id="zip" name="zip" value={formData.zip} onChange={handleChange} onBlur={handleBlur} maxLength={5} required />
            <Input label="Ciudad" id="city" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} required />
            <Input label="Estado" id="state" name="state" value={formData.state} onChange={handleChange} onBlur={handleBlur} required />
        </div>
    );
};

export const AddressSelection: React.FC<AddressSelectionProps> = ({ activeProduct, onUpdate, availableAddresses, isGuest }) => {
    
    const handleSelectAddress = (address: Address) => {
        onUpdate({ address });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Indica los datos de entrega</h2>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center mb-6">
                <div className="bg-white p-2 rounded-md shadow-sm mr-4">
                    <StoreIcon className="w-8 h-8 text-gray-600"/>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Para recibir a domicilio</h3>
            </div>
            
            {isGuest ? (
                <GuestAddressForm address={activeProduct.address} onUpdate={(addr) => onUpdate({ address: addr })} />
            ) : (
                <>
                    <div className="space-y-4">
                        {availableAddresses.length > 0 ? (
                            availableAddresses.map(address => (
                                <div key={address.id} className={`p-4 border rounded-lg cursor-pointer transition-all ${activeProduct.address?.id === address.id ? 'border-2 border-coppel-blue bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'}`} onClick={() => handleSelectAddress(address)}>
                                    {address.isFavorite && (
                                        <div className="flex items-center text-xs text-coppel-blue font-semibold mb-2">
                                            <StarIcon className="w-4 h-4 mr-1"/>
                                            <span>Domicilio favorito</span>
                                        </div>
                                    )}
                                    <div className="flex items-start">
                                        <HomeIcon className="w-5 h-5 text-gray-500 mr-3 mt-1"/>
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
                            ))
                        ) : (
                            <div className="text-center py-8 px-4 border border-dashed rounded-lg">
                                <p className="text-gray-600">No tienes direcciones guardadas.</p>
                                <p className="text-sm text-gray-500">Agrega una nueva para continuar.</p>
                            </div>
                        )}
                    </div>

                    <button className="w-full flex items-center justify-center p-4 mt-6 border border-dashed border-gray-400 rounded-lg text-coppel-blue font-semibold hover:bg-gray-50 transition-colors">
                        <PlusCircleIcon className="w-6 h-6 mr-2" />
                        Agregar nuevo domicilio
                    </button>
                </>
            )}
        </div>
    );
};