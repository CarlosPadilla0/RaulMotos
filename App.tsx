import React, { useState } from 'react';
import { AppStep } from './types';
import type { CatalogProduct, ModalConfig, BillingInfo, User, Address, CheckoutProduct } from './types';
import { Home } from './components/Home';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { Modal, type ModalComponentProps } from './components/Modal';
import { LoginModal } from './components/LoginModal';
import { Checkout } from './components/Checkout';
import { Confirmation } from './components/Confirmation';

const initialModalConfig: Omit<ModalComponentProps, 'onClose'> = {
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
};

const initialBillingInfo: BillingInfo = {
  rfc: '', useGenericRfc: false, name: '', dob: '', postalCode: '', regime: '', cfdiUse: '', email: '', confirmEmail: '', curp: '', gender: '',
};

const createInitialCheckoutProduct = (product: CatalogProduct): CheckoutProduct => ({
    ...product,
    quantity: 1,
    checkoutStatus: 'pending',
    itemCheckoutStep: 'configuration',
    insurance: { plus: false, rc: false, none: true, price: 0, name: '' },
    deliveryMethod: 'home',
    pickupDate: null,
    address: null,
    billingInfo: initialBillingInfo,
    recipientInfo: { recipientType: '', firstName: '', lastName: '', phone: '', phoneType: 'mobile', cic: '' },
    paymentMethod: null,
    paymentPlan: null,
});


const mockUser: User = {
    billingInfo: {
        rfc: 'RIJR900101ABC', useGenericRfc: false, name: 'José Raúl Ríos Mireles', dob: '01/01/1990', postalCode: '80000', regime: '612', cfdiUse: 'G03', email: 'Raul.Mireless@Coppel.com', confirmEmail: 'Raul.Mireless@Coppel.com', curp: 'RIJR900101HSR...', gender: 'male',
    },
    addresses: [
        { id: '1', isFavorite: true, recipientName: "José Raúl Ríos Mireles", street: "Calle Principal 123, Colonia Centro", city: "CULIACAN ROSALES", state: "SINALOA", zip: "80000" },
        { id: '2', isFavorite: false, recipientName: "Melissa Martinez Velazquez", street: "Boulevard Salvador Alvarado, Aerolito y meteorito", city: "CULIACAN ROSALES", state: "SINALOA", zip: "80028" },
        { id: '3', isFavorite: false, recipientName: "Papá de Raúl", street: "Avenida Siempre Viva 742", city: "CULIACAN ROSALES", state: "SINALOA", zip: "80050" },
    ],
};


const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Home);
  const [checkoutProducts, setCheckoutProducts] = useState<CheckoutProduct[]>([]);
  const [activeProductSku, setActiveProductSku] = useState<string | null>(null);
  
  const [modalConfig, setModalConfig] = useState(initialModalConfig);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEmployee, setIsEmployee] = useState(false);

  const showModal = (config: ModalConfig) => { setModalConfig({ ...config, isOpen: true }); };
  const closeModal = () => { setModalConfig(initialModalConfig); };
  
  const handleLogin = () => {
    setCurrentUser(mockUser);
    const favoriteAddress = mockUser.addresses.find(a => a.isFavorite) || mockUser.addresses[0] || null;
    
    // Pre-fill data for all pending products
    setCheckoutProducts(prevProducts => prevProducts.map(p => {
        if (p.checkoutStatus === 'pending') {
            return {
                ...p,
                billingInfo: p.type === 'motorcycle' ? mockUser.billingInfo : p.billingInfo,
                address: p.address || favoriteAddress, // Only set address if not already set
            };
        }
        return p;
    }));

    setShowLoginModal(false);
    setStep(AppStep.Checkout);
  };

  const handleGuestLogin = () => {
    setShowLoginModal(false);
    setStep(AppStep.Checkout);
  };
  
  const handleEmployeeLogin = () => {
    setIsEmployee(true);
    handleLogin(); // Use the same base login logic
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsEmployee(false);
  };

  const handleAddToCart = (product: CatalogProduct) => {
    const isExisting = checkoutProducts.some(item => item.sku === product.sku);
    if (isExisting) {
        showModal({type: 'info', title: 'Producto en el carrito', message: `${product.name} ya se encuentra en tu carrito.`});
        return;
    }

    const newCheckoutProduct = createInitialCheckoutProduct(product);
    setCheckoutProducts(prevCart => [...prevCart, newCheckoutProduct]);

    showModal({
        type: 'success',
        title: '¡Agregado!',
        message: <p><strong>{product.name}</strong> se ha añadido a tu carrito.</p>,
        primaryButtonText: 'Ver Carrito',
        onPrimaryAction: () => {
            setStep(AppStep.Cart);
            closeModal();
        },
        secondaryButtonText: 'Seguir Comprando',
        onSecondaryAction: closeModal
    });
  };
  
  const handleProceedToLogin = () => {
      // Set the first pending product as active when entering checkout
      const firstPending = checkoutProducts.find(p => p.checkoutStatus === 'pending');
      if (firstPending) {
        setActiveProductSku(firstPending.sku);
      } else {
        setActiveProductSku(null); // Or handle case where all are completed
      }
      setShowLoginModal(true);
  };
  
  const updateCheckoutProduct = (sku: string, data: Partial<CheckoutProduct>) => {
      setCheckoutProducts(prev => prev.map(p => p.sku === sku ? {...p, ...data} : p));
  }

  const handleFinalizePurchase = (sku: string) => {
      updateCheckoutProduct(sku, { checkoutStatus: 'completed' });
      
      const nextPending = checkoutProducts.find(p => p.checkoutStatus === 'pending' && p.sku !== sku);
      if (nextPending) {
          setActiveProductSku(nextPending.sku);
      } else {
          const allCompleted = checkoutProducts.every(p => p.checkoutStatus === 'completed' || p.sku === sku);
          if (allCompleted) {
              setActiveProductSku(null);
              setStep(AppStep.Confirmation);
          }
      }
  }
  
  const handleRemoveFromCheckout = (skuToRemove: string) => {
    setCheckoutProducts(prev => prev.filter(p => p.sku !== skuToRemove));
    if (activeProductSku === skuToRemove) {
      setActiveProductSku(null);
    }
  };

  const clearCartAndState = () => {
    setCheckoutProducts([]);
    setActiveProductSku(null);
  };

  const handleReset = () => {
    clearCartAndState();
    setStep(AppStep.Home);
  };

  const handleHomeClick = () => {
    if (step === AppStep.Confirmation) {
        handleReset();
    } else {
        setStep(AppStep.Home);
    }
  };

  const handleCartClick = () => {
    if (step === AppStep.Confirmation) {
        clearCartAndState();
    }
    setStep(AppStep.Cart);
  };


  const renderStep = () => {
    switch (step) {
      case AppStep.Home:
        return <Home onAddToCart={handleAddToCart} />;
      
      case AppStep.Cart:
        return <Cart 
                  cartItems={checkoutProducts} 
                  onContinue={handleProceedToLogin}
                  onGoHome={() => setStep(AppStep.Home)}
                  isEmployee={isEmployee}
                />;
      
      case AppStep.Checkout:
        return <Checkout
                  products={checkoutProducts}
                  activeProductSku={activeProductSku}
                  setActiveProductSku={setActiveProductSku}
                  onUpdateProduct={updateCheckoutProduct}
                  onFinalizeProduct={handleFinalizePurchase}
                  onRemoveProduct={handleRemoveFromCheckout}
                  currentUser={currentUser}
                  isEmployee={isEmployee}
                  showModal={showModal}
                  closeModal={closeModal}
                />
      
      case AppStep.Confirmation:
          return <Confirmation 
                    completedProducts={checkoutProducts.filter(p => p.checkoutStatus === 'completed')} 
                    onStartOver={handleReset}
                    currentUser={currentUser}
                    isEmployee={isEmployee}
                 />

      default:
        return <Home onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="bg-coppel-gray-light min-h-screen">
      <Header 
        cartItemCount={checkoutProducts.length} 
        onCartClick={handleCartClick} 
        onHomeClick={handleHomeClick}
        currentUser={currentUser}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      <main>
        {renderStep()}
      </main>
      <Modal {...modalConfig} onClose={closeModal} />
      {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
            onGuest={handleGuestLogin}
            onEmployee={handleEmployeeLogin}
          />
      )}
    </div>
  );
};

export default App;