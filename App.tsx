import React, { useState } from 'react';
import { CheckoutStep } from './types';
import type { OrderData, Product } from './types';
import { Home } from './components/Home';
import { AddedToCartModal } from './components/AddedToCartModal';
import { DeliveryOptions } from './components/DeliveryOptions';
import { OrderSummary } from './components/OrderSummary';
import { AddressSelection } from './components/AddressSelection';
import { BillingInfo } from './components/BillingInfo';
import { RecipientInfo } from './components/RecipientInfo';
import { Payment } from './components/Payment';
import { Confirmation } from './components/Confirmation';

const initialOrderData: OrderData = {
  product: null,
  insurance: {
    plus: false,
    rc: false,
    none: false,
  },
  deliveryMethod: null,
  address: null,
  billingInfo: {
    rfc: '',
    useGenericRfc: false,
    name: '',
    dob: '',
    postalCode: '',
    regime: '',
    cfdiUse: '',
    email: '',
    curp: '',
    gender: '',
  },
  recipientInfo: {
    recipientType: '',
    firstName: '',
    lastName: '',
    phone: '',
    phoneType: 'mobile',
  },
  paymentMethod: null,
};

const App: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.Home);
  const [orderData, setOrderData] = useState<OrderData>(initialOrderData);

  const resetFlow = () => {
    setOrderData(initialOrderData);
    setStep(CheckoutStep.Home);
  };

  const handleSelectProduct = (product: Product) => {
    setOrderData(prev => ({
        ...initialOrderData, // Reset all data
        product: product, // Set the new product
    }));
    setStep(CheckoutStep.AddedToCart);
  };
  
  const renderStep = () => {
    // Guard clause for steps that require a product
    if (step !== CheckoutStep.Home && !orderData.product) {
      // If we are in a later step without a product, go back to home
      setStep(CheckoutStep.Home);
      return null; // Render nothing this cycle, will re-render with Home
    }

    switch (step) {
      case CheckoutStep.Home:
        return <Home onSelectProduct={handleSelectProduct} />;

      case CheckoutStep.AddedToCart:
        return <AddedToCartModal orderData={orderData} setOrderData={setOrderData} onContinue={() => setStep(CheckoutStep.DeliveryOptions)} />;
      
      case CheckoutStep.DeliveryOptions:
        return (
          <div className="max-w-6xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            <div className="lg:col-span-2">
                <DeliveryOptions orderData={orderData} setOrderData={setOrderData} />
            </div>
            <div>
                <OrderSummary product={orderData.product!} onContinue={() => {
                    if (orderData.deliveryMethod) {
                        const nextStep = orderData.deliveryMethod === 'home' ? CheckoutStep.AddressSelection : CheckoutStep.BillingInfo;
                        setStep(nextStep);
                    } else {
                        alert("Por favor, selecciona una opción de entrega.");
                    }
                }} />
            </div>
          </div>
        );

      case CheckoutStep.AddressSelection:
         return (
            <div className="max-w-2xl mx-auto my-10 px-4">
                <AddressSelection 
                    orderData={orderData} 
                    setOrderData={setOrderData} 
                    onBack={() => setStep(CheckoutStep.DeliveryOptions)}
                    onContinue={() => setStep(CheckoutStep.BillingInfo)}
                />
            </div>
        );

      case CheckoutStep.BillingInfo:
         return (
            <div className="max-w-2xl mx-auto my-10 px-4">
                <BillingInfo 
                    orderData={orderData} 
                    setOrderData={setOrderData} 
                    onBack={() => {
                      const prevStep = orderData.deliveryMethod === 'home' ? CheckoutStep.AddressSelection : CheckoutStep.DeliveryOptions;
                      setStep(prevStep);
                    }}
                    onContinue={() => setStep(CheckoutStep.RecipientInfo)}
                />
            </div>
        );

      case CheckoutStep.RecipientInfo:
         return (
            <div className="max-w-2xl mx-auto my-10 px-4">
                <RecipientInfo 
                    orderData={orderData} 
                    setOrderData={setOrderData} 
                    onBack={() => setStep(CheckoutStep.BillingInfo)}
                    onContinue={() => setStep(CheckoutStep.Payment)}
                />
            </div>
        );
        
      case CheckoutStep.Payment:
        return (
            <div className="max-w-2xl mx-auto my-10 px-4">
                <Payment 
                    orderData={orderData} 
                    setOrderData={setOrderData} 
                    onBack={() => setStep(CheckoutStep.RecipientInfo)}
                    onContinue={() => setStep(CheckoutStep.Confirmation)}
                />
            </div>
        );

      case CheckoutStep.Confirmation:
        return <Confirmation orderData={orderData} onStartOver={resetFlow} />;

      default:
        return <div>Invalid Step</div>;
    }
  };

  return <div className="bg-coppel-gray-light min-h-screen">{renderStep()}</div>;
};

export default App;