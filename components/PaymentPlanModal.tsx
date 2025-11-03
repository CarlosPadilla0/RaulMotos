import React, { useState, useMemo, useEffect } from 'react';
import type { PaymentPlan } from '../types';
import { XCircleIcon, InformationCircleIcon } from './icons';

interface PaymentPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  title: string;
  onSave: (plan: PaymentPlan) => void;
  isEmployee: boolean;
}

const terms = [12, 18, 24, 30];
// Interest factors approximated from user-provided image
const interestFactors: { [key: number]: number } = {
  12: 1.41,
  18: 1.655,
  24: 1.82,
  30: 1.98,
};

const formatCurrency = (amount: number) => {
    return `$${Math.round(amount).toLocaleString('es-MX')}`;
}

export const PaymentPlanModal: React.FC<PaymentPlanModalProps> = ({ isOpen, onClose, price, title, onSave, isEmployee }) => {
    const [selectedTerm, setSelectedTerm] = useState<number>(30);
    const [downPayment, setDownPayment] = useState<number>(0);

    const cashPrice = useMemo(() => {
        const discount = isEmployee ? price * 0.25 : 0;
        return price - discount;
    }, [price, isEmployee]);

    useEffect(() => {
        // Set initial down payment to 10% of cash price
        setDownPayment(Math.round(cashPrice * 0.1));
    }, [cashPrice]);
    
    const calculatedPlans = useMemo(() => {
        return terms.map(term => {
            const totalCredit = (cashPrice - downPayment) * (interestFactors[term] || 1);
            const monthlyPayment = totalCredit / term;

            return {
                term,
                cashPrice: cashPrice,
                totalCredit: totalCredit + downPayment,
                monthlyPayment,
                downPayment
            };
        });
    }, [cashPrice, downPayment]);

    if (!isOpen) return null;

    const selectedPlanData = calculatedPlans.find(p => p.term === selectedTerm);

    const handleSave = () => {
        if (selectedPlanData) {
            const finalPlan: PaymentPlan = {
                term: selectedPlanData.term,
                monthlyPayment: Math.round(selectedPlanData.monthlyPayment),
                totalCredit: Math.round(selectedPlanData.totalCredit),
                downPayment: selectedPlanData.downPayment,
                cashPrice: selectedPlanData.cashPrice,
            };
            onSave(finalPlan);
        }
    };
    
    const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
        if (value <= cashPrice) {
            setDownPayment(value);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl p-6 pt-12 relative max-w-2xl w-full transform transition-all scale-100 opacity-100 animate-fade-in-up">
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Cerrar"
                >
                    <XCircleIcon className="w-8 h-8" />
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <label htmlFor="downPayment" className="font-semibold text-gray-700 whitespace-nowrap">Su Pago Inicial:</label>
                    <input 
                        type="text"
                        id="downPayment"
                        value={`$${downPayment.toLocaleString('es-MX')}`}
                        onChange={handleDownPaymentChange}
                        className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue"
                    />
                    <button className="px-6 py-2 bg-gray-300 text-gray-600 font-semibold rounded-md cursor-not-allowed" disabled>
                        Recalcular
                    </button>
                </div>

                <div className="my-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-800 rounded-r-lg flex items-start">
                    <InformationCircleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div>
                        <p className="font-bold">¡Paga menos!</p>
                        <p className="text-sm">Si liquidas tu crédito dentro de los primeros 30 días, solo pagas el <strong>precio de contado: {formatCurrency(cashPrice)}</strong>.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 border-collapse">
                        <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 font-bold">Concepto</th>
                                {calculatedPlans.map(plan => (
                                    <th 
                                        key={plan.term} 
                                        onClick={() => setSelectedTerm(plan.term)}
                                        className={`px-4 py-3 text-center cursor-pointer transition-colors ${selectedTerm === plan.term ? 'bg-coppel-blue text-white' : 'hover:bg-gray-200'}`}
                                    >
                                        {plan.term} Meses
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-3 font-semibold">Total contado</td>
                                {calculatedPlans.map(plan => (
                                    <td key={plan.term} className={`px-4 py-3 text-center transition-colors ${selectedTerm === plan.term ? 'bg-blue-50' : ''}`}>{formatCurrency(plan.cashPrice)}</td>
                                ))}
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-3 font-semibold">Total crédito</td>
                                {calculatedPlans.map(plan => (
                                    <td key={plan.term} className={`px-4 py-3 text-center transition-colors ${selectedTerm === plan.term ? 'bg-blue-50' : ''}`}>{formatCurrency(plan.totalCredit)}</td>
                                ))}
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-3 font-bold text-lg">Abono mensual</td>
                                {calculatedPlans.map(plan => (
                                    <td key={plan.term} className={`px-4 py-3 text-center font-bold text-lg text-red-600 transition-colors ${selectedTerm === plan.term ? 'bg-blue-50' : ''}`}>{formatCurrency(plan.monthlyPayment)}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-coppel-blue text-white font-bold py-3 px-12 rounded-full hover:bg-blue-800 transition-colors text-lg disabled:bg-gray-400"
                        disabled={!selectedPlanData}
                    >
                        Seleccionar Plan
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};