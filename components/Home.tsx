import React from 'react';
import type { CatalogProduct } from '../types';
import { MotorcycleIcon, WasherIcon } from './icons';

const products: CatalogProduct[] = [
    {
        name: "Motocicleta Bajaj Pulsar N 250 cc 2026",
        sku: "450918",
        price: 57499,
        originalPrice: 66999,
        image: "https://cdn5.coppel.com/pm/5038053-1.jpg",
        seller: "Coppel",
        type: 'motorcycle',
    },
    {
        name: "Motocicleta Vento Nitrox 250 cc 2025",
        sku: "432156",
        price: 48999,
        originalPrice: 54999,
        image: "https://cdn5.coppel.com/pm/5855153-1.jpg",
        seller: "Coppel",
        type: 'motorcycle',
    },
    {
        name: "Motocicleta Vento Xpress Sport 170 cc 2025",
        sku: "460210",
        price: 52999,
        originalPrice: 59999,
        image: "https://cdn5.coppel.com/pm/5854183-1.jpg",
        seller: "Coppel",
        type: 'motorcycle',
    },
    {
        name: "Lavadora Whirlpool 22 kg Blanca",
        sku: "789123",
        price: 12999,
        originalPrice: 15999,
        image: "https://cdn5.coppel.com/pm/6577783-1.jpg?iresize=width:255,height:205",
        seller: "Coppel",
        type: 'appliance',
    },
    {
        name: "Lavadora Mabe 24 kg Aqua Saver Green",
        sku: "789456",
        price: 14599,
        originalPrice: 17999,
        image: "https://cdn5.coppel.com/pm/6577783-1.jpg?iresize=width:255,height:205",
        seller: "Coppel",
        type: 'appliance',
    },
    {
        name: "Lavadora Samsung 25 kg Carga Superior",
        sku: "789789",
        price: 16999,
        originalPrice: 20999,
        image: "https://cdn5.coppel.com/pm/6577783-1.jpg?iresize=width:255,height:205",
        seller: "Coppel",
        type: 'appliance',
    }
];

interface HomeProps {
    onAddToCart: (product: CatalogProduct) => void;
}

const ProductCard: React.FC<{ product: CatalogProduct, onAddToCart: () => void }> = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-800 flex-grow">{product.name}</h3>
            <div className="mt-2">
                <span className="text-2xl font-bold text-red-600">${product.price.toLocaleString('es-MX')}</span>
                <span className="ml-2 text-md text-gray-500 line-through">${product.originalPrice.toLocaleString('es-MX')}</span>
            </div>
            <button
                onClick={onAddToCart}
                className="w-full bg-coppel-blue text-white font-bold py-2 mt-4 rounded-full hover:bg-blue-800 transition-colors"
            >
                Comprar ahora
            </button>
        </div>
    </div>
);


export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
    const motorcycles = products.filter(p => p.type === 'motorcycle');
    const appliances = products.filter(p => p.type === 'appliance');

    return (
        <div className="container mx-auto px-4 py-10 space-y-16">
             <section>
                <div className="text-center mb-10">
                    <MotorcycleIcon className="w-16 h-16 text-coppel-blue mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-gray-900">Elige tu próxima moto</h1>
                    <p className="text-lg text-gray-600 mt-2">Comienza tu aventura sobre dos ruedas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {motorcycles.map(moto => (
                        <ProductCard key={moto.sku} product={moto} onAddToCart={() => onAddToCart(moto)} />
                    ))}
                </div>
            </section>
            
            <section>
                <div className="text-center mb-10">
                    <WasherIcon className="w-16 h-16 text-coppel-blue mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-gray-900">Renueva tu hogar</h1>
                    <p className="text-lg text-gray-600 mt-2">Encuentra los mejores electrodomésticos.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {appliances.map(appliance => (
                        <ProductCard key={appliance.sku} product={appliance} onAddToCart={() => onAddToCart(appliance)} />
                    ))}
                </div>
            </section>
        </div>
    );
}