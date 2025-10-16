
import React from 'react';
import type { Product } from '../types';
import { CoppelIcon, CoppelLogo, MotorcycleIcon } from './icons';

const motorcycles: Product[] = [
    {
        name: "Motocicleta Bajaj Pulsar N 250 cc 2026",
        sku: "450918",
        price: 57499,
        originalPrice: 66999,
        image: "https://cdn5.coppel.com/pm/5038053-1.jpg",
        quantity: 1,
        seller: "Coppel"
    },
    {
        name: "Motocicleta Vento Nitrox 250 cc 2025",
        sku: "432156",
        price: 48999,
        originalPrice: 54999,
        image: "https://cdn5.coppel.com/pm/5855153-1.jpg",
        quantity: 1,
        seller: "Coppel"
    },
    {
        name: "Motocicleta Vento Xpress Sport 170 cc 2025",
        sku: "460210",
        price: 52999,
        originalPrice: 59999,
        image: "https://cdn5.coppel.com/pm/5854183-1.jpg",
        quantity: 1,
        seller: "Coppel"
    }
];

interface HomeProps {
    onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<{ product: Product, onSelect: () => void }> = ({ product, onSelect }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-800 flex-grow">{product.name}</h3>
            <div className="mt-2">
                <span className="text-2xl font-bold text-red-600">${product.price.toLocaleString('es-MX')}</span>
                <span className="ml-2 text-md text-gray-500 line-through">${product.originalPrice.toLocaleString('es-MX')}</span>
            </div>
            <button
                onClick={onSelect}
                className="w-full bg-coppel-blue text-white font-bold py-2 mt-4 rounded-full hover:bg-blue-800 transition-colors"
            >
                Agregar al carrito
            </button>
        </div>
    </div>
);


export const Home: React.FC<HomeProps> = ({ onSelectProduct }) => {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-10">
                 <CoppelLogo className="w-30 h-20 text-coppel-blue mx-auto mb-4" />
                <h1 className="text-4xl font-extrabold text-gray-900">Elige tu próxima moto</h1>
                <p className="text-lg text-gray-600 mt-2">Comienza tu aventura sobre dos ruedas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {motorcycles.map(moto => (
                    <ProductCard key={moto.sku} product={moto} onSelect={() => onSelectProduct(moto)} />
                ))}
            </div>
        </div>
    );
}