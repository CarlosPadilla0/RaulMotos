import React from 'react';
import type { CheckoutProduct } from '../types';
import { CoppelIcon, CreditCardIcon, CashIcon, PayPalIcon } from './icons';

interface PaymentProps {
  activeProduct: CheckoutProduct;
  onSelectPayment: (paymentMethodId: string) => void;
}

const paymentOptions = [
    { id: 'coppel_credit', label: 'Crédito Coppel', icon: <CoppelIcon className="w-8 h-8"/> },
    { id: 'card', label: 'Tarjeta de crédito/débito', icon: <CreditCardIcon className="w-8 h-8 text-gray-600"/> },
    { id: 'cash', label: 'Efectivo en establecimiento', icon: <CashIcon className="w-8 h-8 text-gray-600"/> },
    { id: 'paypal', label: 'PayPal', icon: <PayPalIcon className="w-20 h-8 text-coppel-blue"/> }
];

export const Payment: React.FC<PaymentProps> = ({ activeProduct, onSelectPayment }) => {
    
    const handleSelectPayment = (paymentMethodId: string) => {
        onSelectPayment(paymentMethodId);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Elige cómo quieres pagar</h2>
            <div className="space-y-3">
                {paymentOptions.map(option => (
                    <div 
                        key={option.id}
                        onClick={() => handleSelectPayment(option.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${activeProduct.paymentMethod === option.id ? 'border-2 border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                        <div className="flex items-center">
                            <div className="w-20 flex items-center justify-center">
                                {option.icon}
                            </div>
                            <span className="font-semibold text-gray-700 ml-4">{option.label}</span>
                        </div>
                        {option.id === 'coppel_credit' && activeProduct.paymentPlan && (
                            <div className="mt-2 ml-4 pl-20 text-sm text-green-700">
                                <p><strong>Plan seleccionado:</strong> {activeProduct.paymentPlan.term} meses con abonos de ${activeProduct.paymentPlan.monthlyPayment.toLocaleString('es-MX')}.</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};