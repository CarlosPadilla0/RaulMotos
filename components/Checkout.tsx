import React, { useState } from 'react';
import type { CheckoutProduct, ModalConfig, User, PaymentPlan, ItemCheckoutStep } from '../types';
import { AddressSelection } from './AddressSelection';
import { BillingInfo as BillingInfoComponent } from './BillingInfo';
import { RecipientInfo as RecipientInfoComponent } from './RecipientInfo';
import { Payment } from './Payment';
import { ItemConfiguration } from './ItemConfiguration';
import { CheckoutStepWrapper } from './CheckoutStepWrapper';
import { CheckCircleIcon, TrashIcon } from './icons';
import { PaymentPlanModal } from './PaymentPlanModal';

interface CheckoutProps {
    products: CheckoutProduct[];
    activeProductSku: string | null;
    setActiveProductSku: (sku: string | null) => void;
    onUpdateProduct: (sku: string, data: Partial<CheckoutProduct>) => void;
    onFinalizeProduct: (sku: string) => void;
    onRemoveProduct: (sku: string) => void;
    currentUser: User | null;
    isEmployee: boolean;
    showModal: (config: ModalConfig) => void;
    closeModal: () => void;
}

const getStepsForProduct = (productType: 'motorcycle' | 'appliance'): ItemCheckoutStep[] => {
    if (productType === 'motorcycle') {
        return ['configuration', 'address', 'billing', 'recipient', 'payment'];
    }
    // For appliances, skip 'billing'
    return ['configuration', 'address', 'recipient', 'payment'];
};

const ProductItem: React.FC<{product: CheckoutProduct, isActive: boolean, onSelect: () => void, onRemove: () => void}> = ({ product, isActive, onSelect, onRemove }) => {
    const isCompleted = product.checkoutStatus === 'completed';
    const containerBaseClasses = "flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200";
    const activeClasses = "bg-coppel-blue text-white shadow-md";
    const inactiveClasses = "bg-white hover:bg-gray-50";
    const completedClasses = "bg-green-50 border-green-300 text-green-800 hover:bg-green-100 cursor-default";

    let containerClasses = `${containerBaseClasses} `;
    if (isCompleted) {
        containerClasses += completedClasses;
    } else if (isActive) {
        containerClasses += activeClasses;
    } else {
        containerClasses += inactiveClasses;
    }

    return (
        <div 
          className={`${containerClasses} ${!isCompleted ? 'cursor-pointer' : ''}`}
          onClick={!isCompleted ? onSelect : undefined} 
          role={!isCompleted ? "button" : undefined} 
          tabIndex={!isCompleted ? 0 : -1}
          onKeyDown={(e) => { if (e.key === 'Enter' && !isCompleted) onSelect()}}
        >
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0"/>
            <div className="flex-grow min-w-0">
                <p className={`font-semibold text-sm truncate ${isActive ? 'text-white' : 'text-gray-800'}`}>{product.name}</p>
                <p className={`text-xs ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>SKU: {product.sku}</p>
            </div>
            {isCompleted ? (
                <CheckCircleIcon className="w-6 h-6 text-green-600 ml-2 flex-shrink-0" />
            ) : (
                <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(); }} 
                    className={`p-2 rounded-full transition-colors flex-shrink-0 ml-2 ${isActive ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:bg-red-100 hover:text-red-600'}`}
                    aria-label={`Remover ${product.name}`}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            )}
        </div>
    )
}

const isBillingInfoValid = (info: CheckoutProduct['billingInfo']): { valid: boolean, message: string } => {
    if (!info.email || !info.confirmEmail || !info.name) {
        return { valid: false, message: 'Por favor, completa los campos de nombre y correo electrónico.' };
    }
    if (info.email !== info.confirmEmail) {
        return { valid: false, message: 'Los correos electrónicos no coinciden.' };
    }
    if (info.useGenericRfc) {
        if (!info.rfc || !info.postalCode || !info.regime || !info.cfdiUse) {
            return { valid: false, message: 'Por favor, completa todos los campos de facturación requeridos.' };
        }
    } else {
        if (!info.rfc || !info.postalCode || !info.regime || !info.cfdiUse || !info.dob || !info.curp || !info.gender) {
            return { valid: false, message: 'Por favor, completa todos los campos de facturación y datos personales.' };
        }
    }
    return { valid: true, message: '' };
};

const isRecipientInfoValid = (info: CheckoutProduct['recipientInfo']): boolean => {
    if (!info.recipientType) return false;
    if (info.recipientType === 'self') return true;
    if (info.recipientType === 'other') {
        return !!info.firstName && !!info.lastName && !!info.phone && info.phone.length === 10 && !!info.cic && info.cic.length === 9;
    }
    return false;
};

export const Checkout: React.FC<CheckoutProps> = ({ 
    products, 
    activeProductSku, 
    setActiveProductSku,
    onUpdateProduct,
    onFinalizeProduct, 
    onRemoveProduct,
    currentUser,
    isEmployee,
    showModal, 
    closeModal 
}) => {
    const [isPlanModalOpen, setPlanModalOpen] = useState(false);
    
    const activeProduct = products.find(p => p.sku === activeProductSku);
    const allProductsCompleted = products.every(p => p.checkoutStatus === 'completed');

    const handleUpdate = (data: Partial<CheckoutProduct>) => {
        if (activeProduct) {
            onUpdateProduct(activeProduct.sku, data);
        }
    }

    const handleSelectPayment = (paymentMethodId: string) => {
        if (paymentMethodId === 'coppel_credit') {
            setPlanModalOpen(true);
        } else {
            handleUpdate({ paymentMethod: paymentMethodId, paymentPlan: null });
        }
    };

    const handleSavePlan = (plan: PaymentPlan) => {
        handleUpdate({ paymentMethod: 'coppel_credit', paymentPlan: plan });
        setPlanModalOpen(false);
    };
    
    const changeStep = (nextStep: ItemCheckoutStep) => {
        handleUpdate({ itemCheckoutStep: nextStep });
    };
    
    const proceedToNextStep = () => {
        if (!activeProduct) return;
        const steps = getStepsForProduct(activeProduct.type);
        const currentIndex = steps.indexOf(activeProduct.itemCheckoutStep);
        if (currentIndex < steps.length - 1) {
            changeStep(steps[currentIndex + 1]);
        }
    };
    
     const prevItemStep = () => {
        if (!activeProduct) return;
        const steps = getStepsForProduct(activeProduct.type);
        const currentIndex = steps.indexOf(activeProduct.itemCheckoutStep);
        if (currentIndex > 0) {
            changeStep(steps[currentIndex - 1]);
        }
    };

    const handleNextStep = () => {
        if (!activeProduct) return;

        let isValid = false;
        let errorMessage = "Por favor, completa todos los campos requeridos.";

        switch (activeProduct.itemCheckoutStep) {
            case 'configuration':
                if (activeProduct.pickupDate) {
                    isValid = true;
                } else {
                    errorMessage = "Por favor, selecciona una fecha de entrega.";
                }
                break;
            
            case 'address':
                if (activeProduct.address && 
                    activeProduct.address.recipientName && 
                    activeProduct.address.street && 
                    activeProduct.address.zip && 
                    activeProduct.address.city && 
                    activeProduct.address.state) {
                    isValid = true;
                } else {
                    errorMessage = "Por favor, completa tu dirección de entrega.";
                }
                break;

            case 'billing':
                const billingValidation = isBillingInfoValid(activeProduct.billingInfo);
                isValid = billingValidation.valid;
                errorMessage = billingValidation.message;
                break;
                
            case 'recipient':
                if(isRecipientInfoValid(activeProduct.recipientInfo)) {
                    isValid = true;
                } else {
                    errorMessage = "Por favor, completa la información de la persona que recibe."
                }
                break;
        }

        if (isValid) {
            proceedToNextStep();
        } else {
            showModal({ type: 'error', title: 'Información Incompleta', message: errorMessage });
        }
    };

    const handleFinalize = () => {
        if (!activeProduct) return;
        
        if (!activeProduct.paymentMethod) {
            showModal({ type: 'error', title: 'Falta Método de Pago', message: 'Por favor, elige un método de pago para finalizar.' });
            return;
        }

        if (activeProduct.paymentMethod === 'coppel_credit' && !activeProduct.paymentPlan) {
            showModal({ type: 'error', title: 'Falta Plan de Pago', message: 'Por favor, selecciona un plan de pagos a plazos para continuar.' });
            return;
        }

        showModal({
            type: 'confirmation',
            title: 'Confirmar Compra',
            message: `Estás a punto de finalizar la compra de: ${activeProduct.name}. ¿Deseas continuar?`,
            primaryButtonText: 'Confirmar',
            onPrimaryAction: () => {
                onFinalizeProduct(activeProduct.sku);
                closeModal();
            },
            secondaryButtonText: 'Cancelar',
        });
    };

    const renderActiveStep = () => {
        if (!activeProduct) {
             return (
                <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                    {allProductsCompleted 
                        ? <>
                            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                            <h2 className="text-2xl font-bold text-gray-800">¡Todo listo!</h2>
                            <p className="text-gray-600 mt-2">Has completado la compra de todos tus productos.</p>
                          </>
                        : <>
                            <h2 className="text-2xl font-bold text-gray-800">Selecciona un producto</h2>
                            <p className="text-gray-600 mt-2">Elige un artículo del panel izquierdo para comenzar su proceso de compra.</p>
                          </>
                    }
                </div>
            );
        }

        const stepTitles: Record<ItemCheckoutStep, string> = {
            configuration: 'Configura tu Artículo',
            address: 'Dirección de Entrega',
            billing: 'Datos de Facturación',
            recipient: 'Persona que Recibe',
            payment: 'Método de Pago',
            summary: 'Resumen de Compra',
        };

        const currentStep = activeProduct.itemCheckoutStep;
        
        let content: React.ReactNode;
        switch(currentStep) {
            case 'configuration':
                content = <ItemConfiguration 
                            activeProduct={activeProduct} 
                            onUpdate={handleUpdate} 
                          />;
                break;
            case 'address':
                content = <AddressSelection 
                            activeProduct={activeProduct} 
                            onUpdate={handleUpdate} 
                            availableAddresses={currentUser?.addresses || []}
                            isGuest={currentUser === null}
                          />;
                break;
            case 'billing':
                content = <BillingInfoComponent 
                            activeProduct={activeProduct}
                            onUpdate={data => handleUpdate({ billingInfo: {...activeProduct.billingInfo, ...data.billingInfo}})}
                            showModal={showModal}
                            closeModal={closeModal}
                          />;
                break;
            case 'recipient':
                content = <RecipientInfoComponent 
                            activeProduct={activeProduct}
                            onUpdate={data => handleUpdate({ recipientInfo: {...activeProduct.recipientInfo, ...data.recipientInfo}})}
                            showModal={showModal}
                          />;
                break;
            case 'payment':
                content = <Payment 
                            activeProduct={activeProduct} 
                            onSelectPayment={handleSelectPayment} 
                          />;
                break;
            default:
                content = <div>Paso desconocido</div>
        }
        
        return (
            <CheckoutStepWrapper title={stepTitles[currentStep]} onBack={currentStep !== 'configuration' ? prevItemStep : undefined}>
                {content}
                <div className="mt-6 flex justify-end gap-4">
                    {currentStep !== 'payment' 
                        ? <button onClick={handleNextStep} className="bg-coppel-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors">Continuar</button>
                        : <button onClick={handleFinalize} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-colors">Finalizar Compra</button>
                    }
                </div>
            </CheckoutStepWrapper>
        )
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Centro de Compra</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-3 sticky top-24">
                   <h2 className="text-xl font-bold text-gray-800 mb-2">Tus Artículos</h2>
                   {products.map(p => (
                       <ProductItem 
                            key={p.sku} 
                            product={p} 
                            isActive={p.sku === activeProductSku} 
                            onSelect={() => setActiveProductSku(p.sku)}
                            onRemove={() => onRemoveProduct(p.sku)}
                        />
                   ))}
                </div>
                <div className="lg:col-span-2">
                    {renderActiveStep()}
                </div>
            </div>
            {activeProduct && (
                <PaymentPlanModal 
                    isOpen={isPlanModalOpen}
                    onClose={() => setPlanModalOpen(false)}
                    product={activeProduct}
                    onSave={handleSavePlan}
                    isEmployee={isEmployee}
                />
            )}
        </div>
    )
}