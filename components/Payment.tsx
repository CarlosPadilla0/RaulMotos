
import React from 'react';
import type { OrderData } from '../types';
import { CheckoutStepWrapper } from './CheckoutStepWrapper';
import { CoppelIcon, CreditCardIcon, CashIcon, PayPalIcon, CoppelLogo } from './icons';

interface PaymentProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onBack: () => void;
  onContinue: () => void;
}

const paymentOptions = [
    { id: 'coppel_credit', label: 'Crédito Coppel', icon: <CoppelLogo className="w-25 h-8"/> },
    { id: 'card', label: 'Tarjeta de crédito/débito', icon: <CreditCardIcon className="w-8 h-8 text-gray-600"/> },
    { id: 'cash', label: 'Efectivo en establecimiento', icon: <CashIcon className="w-8 h-8 text-gray-600"/> },
    { id: 'paypal', label: 'PayPal', icon: <PayPalIcon className="w-20 h-8 text-coppel-blue"/> }
];

export const Payment: React.FC<PaymentProps> = ({ orderData, setOrderData, onBack, onContinue }) => {
    
    const handleSelectPayment = (paymentMethodId: string) => {
        setOrderData(prev => ({ ...prev, paymentMethod: paymentMethodId }));
        onContinue();
    };

    return (
        <CheckoutStepWrapper title="Elige cómo quieres pagar" onBack={onBack}>
            <div className="space-y-3">
                {paymentOptions.map(option => (
                    <div 
                        key={option.id}
                        onClick={() => handleSelectPayment(option.id)}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${orderData.paymentMethod === option.id ? 'border-2 border-coppel-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                       <div className="w-20 flex items-center justify-center">
                         {option.icon}
                       </div>
                        <span className="font-semibold text-gray-700 ml-4">{option.label}</span>
                    </div>
                ))}
            </div>
        </CheckoutStepWrapper>
    );
};