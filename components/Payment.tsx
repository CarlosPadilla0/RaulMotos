import React from 'react';
import type { CheckoutProduct } from '../types';
import { CoppelIcon, CreditCardIcon, CashIcon, PayPalIcon } from './icons';

interface PaymentProps {
  activeProduct: CheckoutProduct;
  onSelectPayment: (paymentMethodId: string) => void;
  isEmployee: boolean;
}

const paymentOptions = [
    { id: 'coppel_credit', label: 'Crédito Coppel', icon: <CoppelIcon className="w-8 h-8"/> },
    { id: 'card', label: 'Tarjeta de crédito/débito', icon: <CreditCardIcon className="w-8 h-8 text-gray-600"/> },
    { id: 'cash', label: 'Efectivo en establecimiento', icon: <CashIcon className="w-8 h-8 text-gray-600"/> },
    { id: 'paypal', label: 'PayPal', icon: <PayPalIcon className="w-20 h-8 text-coppel-blue"/> }
];

export const Payment: React.FC<PaymentProps> = ({ activeProduct, onSelectPayment, isEmployee }) => {
    
    const handleSelectPayment = (paymentMethodId: string) => {
        if (isEmployee && paymentMethodId === 'coppel_credit') {
            return; // Do nothing if employee tries to select Coppel Credit
        }
        onSelectPayment(paymentMethodId);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Elige cómo quieres pagar</h2>
            <div className="space-y-3">
                {paymentOptions.map(option => {
                    const isCoppelCredit = option.id === 'coppel_credit';
                    const isDisabled = isEmployee && isCoppelCredit;

                    return (
                        <div 
                            key={option.id}
                            onClick={() => handleSelectPayment(option.id)}
                            className={`p-4 border rounded-lg transition-all ${
                                isDisabled 
                                ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                                : activeProduct.paymentMethod === option.id 
                                ? 'border-2 border-coppel-blue bg-blue-50' 
                                : 'border-gray-200 bg-white hover:border-gray-300 cursor-pointer'
                            }`}
                        >
                            <div className="flex items-center">
                                <div className="w-20 flex items-center justify-center">
                                    {option.icon}
                                </div>
                                <span className={`font-semibold ml-4 ${isDisabled ? 'text-gray-500' : 'text-gray-700'}`}>{option.label}</span>
                            </div>
                            {isCoppelCredit && activeProduct.paymentPlan && !isDisabled && (
                                <div className="mt-2 ml-4 pl-20 text-sm text-green-700">
                                    <p><strong>Plan seleccionado:</strong> {activeProduct.paymentPlan.term} meses con abonos de ${activeProduct.paymentPlan.monthlyPayment.toLocaleString('es-MX')}.</p>
                                </div>
                            )}
                            {isDisabled && (
                                <div className="mt-2 ml-4 pl-20 text-xs text-gray-500">
                                    <p>Esta opción de pago no está disponible para colaboradores.</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};