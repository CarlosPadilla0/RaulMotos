/*
import React from 'react';
import type { OrderData } from '../types';

interface OrderSummaryProps {
  orderData: OrderData;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ orderData }) => {
  const { products } = orderData;
  const subtotal = products.reduce((acc, p) => acc + p.price, 0);
  const insuranceTotal = products.reduce((acc, p) => acc + (p.insurance?.price || 0), 0);
  const total = subtotal + insuranceTotal;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 border-b pb-3">Resumen de tu compra</h2>
      
      <div className="space-y-3 mb-4 border-b pb-3">
        {products.map(product => (
            <div key={product.sku} className="flex justify-between items-start text-sm">
                <span className="flex-1 pr-2">{product.name}</span>
                <span className="font-semibold">${product.price.toLocaleString('es-MX')}</span>
            </div>
        ))}
         {insuranceTotal > 0 && (
            <div className="flex justify-between items-start text-sm text-coppel-blue">
                <span className="flex-1 pr-2">Seguros</span>
                <span className="font-semibold">${insuranceTotal.toLocaleString('es-MX')}</span>
            </div>
         )}
      </div>

      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString('es-MX')}</span>
        </div>
         <div className="flex justify-between">
          <span>Descuento</span>
          <span className="text-red-600">-$0</span>
        </div>
         <div className="flex justify-between">
          <span>Seguros</span>
          <span>${insuranceTotal.toLocaleString('es-MX')}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span className="font-semibold text-green-600">Gratis</span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
        <span>Total de contado (IVA incluido)</span>
        <span>${total.toLocaleString('es-MX')}</span>
      </div>
    </div>
  );
};


*/