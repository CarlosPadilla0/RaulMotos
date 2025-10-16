export enum CheckoutStep {
  Home,
  AddedToCart,
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

export interface BillingInfo {
    rfc: string;
    useGenericRfc: boolean;
    name: string;
    dob: string;
    postalCode: string;
    regime: string;
    cfdiUse: string;
    email: string;
    curp: string;
    gender: 'male' | 'female' | '';
}

export interface RecipientInfo {
  recipientType: 'self' | 'other' | '';
  firstName: string;
  lastName: string;
  phone: string;
  phoneType: 'mobile' | 'landline';
}


export interface OrderData {
  product: Product | null;
  insurance: {
    plus: boolean;
    rc: boolean;
    none: boolean;
  };
  deliveryMethod: 'home' | 'store' | null;
  address: Address | null;
  billingInfo: BillingInfo;
  recipientInfo: RecipientInfo;
  paymentMethod: string | null;
}