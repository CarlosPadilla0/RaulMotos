import React, { useState } from 'react';
import { CheckoutStep } from './types';
import type { OrderData, Product, ModalConfig } from './types';
import { Home } from './components/Home';
import { AddedToCartModal } from './components/AddedToCartModal';
import { LoginModal } from './components/LoginModal';
import { DeliveryOptions } from './components/DeliveryOptions';
import { OrderSummary } from './components/OrderSummary';
import { AddressSelection } from './components/AddressSelection';
import { BillingInfo } from './components/BillingInfo';
import { RecipientInfo } from './components/RecipientInfo';
import { Payment } from './components/Payment';
import { Confirmation } from './components/Confirmation';
import { Modal, type ModalComponentProps } from './components/Modal';

const initialOrderData: OrderData = {
  product: null,
  insurance: {
    plus: false,
    rc: false,
    none: false,
    price: 0,
    name: '',
  },
  deliveryMethod: null,
  pickupDate: null,
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
    confirmEmail: '',
    curp: '',
    gender: '',
  },
  recipientInfo: {
    recipientType: '',
    firstName: '',
    lastName: '',
    phone: '',
    phoneType: 'mobile',
    cic: '',
  },
  paymentMethod: null,
};

const initialModalConfig: Omit<ModalComponentProps, 'onClose'> = {
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
};


const App: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.Home);
  const [orderData, setOrderData] = useState<OrderData>(initialOrderData);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState(initialModalConfig);

  const showModal = (config: ModalConfig) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModalConfig(initialModalConfig);
  };

  const resetFlow = () => {
    setOrderData(initialOrderData);
    setStep(CheckoutStep.Home);
    setIsGuest(false);
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
        return <AddedToCartModal orderData={orderData} setOrderData={setOrderData} onContinue={() => setStep(CheckoutStep.Login)} showModal={showModal} />;
      
      case CheckoutStep.Login:
        return <LoginModal setOrderData={setOrderData} onContinue={(isGuestUser) => {
            setIsGuest(isGuestUser);
            setStep(CheckoutStep.DeliveryOptions);
        }} />;

      case CheckoutStep.DeliveryOptions:
        return (
          <div className="max-w-6xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            <div className="lg:col-span-2">
                <DeliveryOptions orderData={orderData} setOrderData={setOrderData} />
            </div>
            <div>
                <OrderSummary orderData={orderData} onContinue={() => {
                    if (orderData.deliveryMethod && orderData.pickupDate) {
                        const nextStep = orderData.deliveryMethod === 'home' ? CheckoutStep.AddressSelection : CheckoutStep.BillingInfo;
                        setStep(nextStep);
                    } else {
                        showModal({
                          type: 'warning',
                          title: 'Datos Incompletos',
                          message: 'Por favor, selecciona un método y una fecha de entrega para continuar.',
                        });
                    }
                }} />
            </div>
          </div>
        );

      case CheckoutStep.AddressSelection:
         return (
            <div className="max-w-4xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
               <div className="lg:col-span-2">
                    <AddressSelection 
                        orderData={orderData} 
                        setOrderData={setOrderData} 
                        onBack={() => setStep(CheckoutStep.DeliveryOptions)}
                        onContinue={() => setStep(CheckoutStep.BillingInfo)}
                        isGuest={isGuest}
                        showModal={showModal}
                    />
                </div>
                <div>
                     <OrderSummary orderData={orderData} onContinue={() => setStep(CheckoutStep.BillingInfo)} />
                </div>
            </div>
        );

      case CheckoutStep.BillingInfo:
         return (
            <div className="max-w-4xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                <div className="lg:col-span-2">
                    <BillingInfo 
                        orderData={orderData} 
                        setOrderData={setOrderData} 
                        onBack={() => {
                        const prevStep = orderData.deliveryMethod === 'home' ? CheckoutStep.AddressSelection : CheckoutStep.DeliveryOptions;
                        setStep(prevStep);
                        }}
                        onContinue={() => setStep(CheckoutStep.RecipientInfo)}
                        showModal={showModal}
                        closeModal={closeModal}
                    />
                </div>
                 <div>
                     <OrderSummary orderData={orderData} onContinue={() => setStep(CheckoutStep.RecipientInfo)} />
                </div>
            </div>
        );

      case CheckoutStep.RecipientInfo:
         return (
            <div className="max-w-4xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                 <div className="lg:col-span-2">
                    <RecipientInfo 
                        orderData={orderData} 
                        setOrderData={setOrderData} 
                        onBack={() => setStep(CheckoutStep.BillingInfo)}
                        onContinue={() => setStep(CheckoutStep.Payment)}
                        showModal={showModal}
                    />
                </div>
                 <div>
                     <OrderSummary orderData={orderData} onContinue={() => setStep(CheckoutStep.Payment)} />
                </div>
            </div>
        );
        
      case CheckoutStep.Payment:
        return (
            <div className="max-w-4xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                <div className="lg:col-span-2">
                    <Payment 
                        orderData={orderData} 
                        setOrderData={setOrderData} 
                        onBack={() => setStep(CheckoutStep.RecipientInfo)}
                        onContinue={() => setStep(CheckoutStep.Confirmation)}
                    />
                </div>
                <div>
                     <OrderSummary orderData={orderData} onContinue={() => setStep(CheckoutStep.Confirmation)} continueButtonText="Confirmar y pagar"/>
                </div>
            </div>
        );

      case CheckoutStep.Confirmation:
        return <Confirmation orderData={orderData} onStartOver={resetFlow} />;

      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="bg-coppel-gray-light min-h-screen">
      {renderStep()}
      <Modal {...modalConfig} onClose={closeModal} />
    </div>
  );
};

export default App;