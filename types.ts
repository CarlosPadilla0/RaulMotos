import type { ModalType } from './components/Modal';
import React from 'react';

export enum AppStep {
  Home,
  Cart,
  Login,
  Checkout,
  Confirmation,
}

export type CheckoutStatus = 'pending' | 'completed';
export type ItemCheckoutStep = 'configuration' | 'address' | 'billing' | 'recipient' | 'payment' | 'summary';

export interface CatalogProduct {
  name: string;
  sku: string;
  price: number;
  originalPrice: number;
  image: string;
  seller: string;
  type: 'motorcycle' | 'appliance';
}

export interface Insurance {
  plus: boolean;
  rc: boolean;
  none: boolean;
  price: number;
  name: string;
}

export interface Address {
  id: string;
  isFavorite: boolean;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface RecipientInfo {
  recipientType: 'self' | 'other' | '';
  firstName: string;
  lastName: string;
  phone: string;
  phoneType: 'mobile' | 'landline';
  cic: string;
}

export interface BillingInfo {
    rfc: string;
    useGenericRfc: boolean;
    name: string;
    dob: string;
    postalCode: string;
    regime: string;
    cfdiUse: string;
    email: string;
    confirmEmail: string;
    curp: string;
    gender: 'male' | 'female' | '';
}

export interface PaymentPlan {
  term: number; // in months
  monthlyPayment: number;
  totalCredit: number;
  downPayment: number;
  cashPrice: number;
}


export interface CheckoutProduct extends CatalogProduct {
  quantity: number;
  // Per-item checkout data
  checkoutStatus: CheckoutStatus;
  itemCheckoutStep: ItemCheckoutStep;
  insurance: Insurance;
  deliveryMethod: 'home' | 'store' | null;
  pickupDate: string | null;
  address: Address | null;
  billingInfo: BillingInfo;
  recipientInfo: RecipientInfo;
  paymentMethod: string | null;
  paymentPlan: PaymentPlan | null;
}

export interface User {
  billingInfo: BillingInfo;
  addresses: Address[];
}

export interface ModalConfig {
  title: string;
  message: string | React.ReactNode;
  type: ModalType;
  primaryButtonText?: string;
  onPrimaryAction?: () => void;
  secondaryButtonText?: string;
  // FIX: Changed type of onSecondaryAction from `void` to `() => void` to match ModalComponentProps.
  onSecondaryAction?: () => void;
}