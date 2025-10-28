import type { ModalType } from './components/Modal';
import React from 'react';

export enum CheckoutStep {
  Home,
  AddedToCart,
  Login,
  DeliveryOptions,
  AddressSelection,
  BillingInfo,
  RecipientInfo,
  Payment,
  Confirmation,
}

export interface Product {
  name: string;
  sku: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  seller: string;
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

export interface OrderData {
  product: Product | null;
  insurance: {
    plus: boolean;
    rc: boolean;
    none: boolean;
    price: number;
    name: string;
  };
  deliveryMethod: 'home' | 'store' | null;
  pickupDate: string | null;
  address: Address | null;
  billingInfo: BillingInfo;
  recipientInfo: RecipientInfo;
  paymentMethod: string | null;
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

export interface ModalConfig {
  title: string;
  message: string | React.ReactNode;
  type: ModalType;
  primaryButtonText?: string;
  onPrimaryAction?: () => void;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
}