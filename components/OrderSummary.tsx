
import React from 'react';
import type { Product } from '../types';

interface OrderSummaryProps {
  product: Product;
  onContinue: () => void;
  continueButtonText?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ product, onContinue, continueButtonText = "Continuar compra" }) => {
    const discount = product.originalPrice - product.price;
    const shipping = 0; // Gratis
    const total = product.price + shipping;

    return (
        <div className="bg-white rounded-lg shadow-lg w-full p-6">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Resumen de tu compra</h3>
            <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                    <span>Subtotal (1 producto)</span>
                    <span>${product.originalPrice.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between text-red-500">
                    <span>Descuento</span>
                    <span>-${discount.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-coppel-blue font-semibold">Gratis</span>
                </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Total de contado (IVA incluido)</span>
                <span>${total.toLocaleString('es-MX')}</span>
            </div>
            <p className="text-sm text-center bg-coppel-blue/10 border border-coppel-blue/20 text-coppel-blue rounded-md p-2 mt-4">
                Tu envío es gratis a partir de $499
            </p>
            <button
                onClick={onContinue}
                className="w-full bg-coppel-blue text-white font-bold py-3 mt-4 rounded-full hover:bg-blue-800 transition-colors"
            >
                {continueButtonText}
            </button>
        </div>
    );
};