
import React from 'react';
import { ArrowLeftIcon } from './icons';

interface CheckoutStepWrapperProps {
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
}

export const CheckoutStepWrapper: React.FC<CheckoutStepWrapperProps> = ({ title, onBack, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-full p-6 md:p-8">
      <div className="relative flex items-center justify-center mb-6 pb-4 border-b">
        {onBack && (
          <button onClick={onBack} className="absolute left-0 text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};
