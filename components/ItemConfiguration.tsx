import React from 'react';
import type { CheckoutProduct, Insurance } from '../types';
import { InformationCircleIcon } from './icons';
import { Calendar } from './Calendar';

interface ItemConfigurationProps {
  activeProduct: CheckoutProduct;
  onUpdate: (data: Partial<CheckoutProduct>) => void;
}

export const ItemConfiguration: React.FC<ItemConfigurationProps> = ({ activeProduct, onUpdate }) => {
    
    const handleInsuranceChange = (type: 'plus' | 'rc' | 'none') => {
        let newInsurance: Insurance;
        switch (type) {
            case 'plus':
                newInsurance = { plus: true, rc: false, none: false, price: 3499, name: 'Seguro Protección Plus' };
                break;
            case 'rc':
                newInsurance = { plus: false, rc: true, none: false, price: 2199, name: 'Seguro Responsabilidad Civil (RC)' };
                break;
            case 'none':
            default:
                newInsurance = { plus: false, rc: false, none: true, price: 0, name: '' };
                break;
        }
        onUpdate({ insurance: newInsurance });
    };

    const handleDateSelect = (date: string) => {
        onUpdate({ pickupDate: date });
    };

    const subtotal = activeProduct.price + (activeProduct.insurance?.price || 0);

  return (
    <div className="space-y-8">
        {activeProduct.type === 'motorcycle' && (
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">1. Protege tu moto con un seguro</h3>
                <div className="space-y-3">
                    {/* Plus Insurance Option */}
                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${activeProduct.insurance.plus ? 'border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <input type="radio" name={`insurance-${activeProduct.sku}`} checked={activeProduct.insurance.plus} onChange={() => handleInsuranceChange('plus')} className="mt-1 h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                        <div className="ml-4 flex-grow">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Seguro Protección Plus</span>
                                <span className="font-bold text-coppel-blue">$3,499</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">¡La máxima protección! Cubre robo total, daños materiales y a terceros.</p>
                        </div>
                    </label>
                    {/* RC Insurance Option */}
                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${activeProduct.insurance.rc ? 'border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <input type="radio" name={`insurance-${activeProduct.sku}`} checked={activeProduct.insurance.rc} onChange={() => handleInsuranceChange('rc')} className="mt-1 h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                        <div className="ml-4 flex-grow">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Seguro de Responsabilidad Civil (RC)</span>
                                <span className="font-bold text-coppel-blue">$2,199</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Cubre daños a terceros hasta por $250,000. ¡Indispensable para rodar seguro!</p>
                        </div>
                    </label>
                    {/* No Insurance Option */}
                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${activeProduct.insurance.none ? 'border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <input type="radio" name={`insurance-${activeProduct.sku}`} checked={activeProduct.insurance.none} onChange={() => handleInsuranceChange('none')} className="mt-1 h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                        <div className="ml-4">
                            <span className="font-bold text-gray-800">No, gracias</span>
                            <p className="text-sm text-gray-600 mt-1">Entiendo los riesgos y prefiero no asegurar mi motocicleta en este momento.</p>
                        </div>
                    </label>
                </div>
                {activeProduct.insurance.name && (
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-coppel-blue text-coppel-blue rounded-r-lg">
                        <p className="font-semibold">Has agregado el {activeProduct.insurance.name} a tu compra.</p>
                    </div>
                )}
            </div>
        )}

        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{activeProduct.type === 'motorcycle' ? '2.' : '1.'} Elige la fecha de entrega</h3>
            <Calendar selectedDate={activeProduct.pickupDate} onDateSelect={handleDateSelect} />
        </div>

        <div className="mt-8 pt-6 border-t">
            <div className="text-right mb-6">
                <span className="text-lg font-medium text-gray-600">Subtotal de este artículo: </span>
                <span className="text-2xl font-bold text-gray-900">${subtotal.toLocaleString('es-MX')}</span>
            </div>
        </div>
    </div>
  );
};