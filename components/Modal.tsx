import React from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from './icons';

export type ModalType = 'success' | 'error' | 'warning' | 'confirmation' | 'info';

export interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string | React.ReactNode;
  type?: ModalType;
  primaryButtonText?: string;
  onPrimaryAction?: () => void;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
}

const modalConfig = {
  success: {
    Icon: CheckCircleIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-500',
  },
  error: {
    Icon: XCircleIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500',
  },
  warning: {
    Icon: ExclamationTriangleIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-500',
  },
  info: {
      Icon: InformationCircleIcon,
      iconColor: 'text-white',
      bgColor: 'bg-coppel-blue',
  },
  confirmation: {
    Icon: InformationCircleIcon,
    iconColor: 'text-white',
    bgColor: 'bg-coppel-blue',
  },
};


export const Modal: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  primaryButtonText = 'Entendido',
  onPrimaryAction,
  secondaryButtonText,
  onSecondaryAction,
}) => {
  if (!isOpen) return null;

  const { Icon, iconColor, bgColor } = modalConfig[type];

  const handlePrimaryClick = () => {
    if (onPrimaryAction) {
        onPrimaryAction();
    }
    // For confirmation modals, we might not want to auto-close
    if (type !== 'confirmation') {
        onClose();
    }
  };
  
  const handleSecondaryClick = () => {
      if (onSecondaryAction) {
          onSecondaryAction();
      }
      onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl p-8 pt-6 relative max-w-lg w-full text-center transform transition-all scale-100 opacity-100 animate-fade-in-up">
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${bgColor} mb-4`}>
          <Icon className={`h-10 w-10 ${iconColor}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <div className="text-md text-gray-600 mb-6 px-4">
          {message}
        </div>
        <div className="flex flex-col sm:flex-row-reverse gap-3 justify-center">
            <button 
                onClick={handlePrimaryClick}
                className="w-full sm:w-auto bg-coppel-blue text-white font-bold py-3 px-12 rounded-full hover:bg-blue-800 transition-colors text-lg"
            >
                {primaryButtonText}
            </button>
            {secondaryButtonText && (
                 <button 
                    onClick={handleSecondaryClick}
                    className="w-full sm:w-auto bg-white border-2 border-coppel-blue text-coppel-blue font-bold py-3 px-12 rounded-full hover:bg-blue-50 transition-colors text-lg"
                >
                    {secondaryButtonText}
                </button>
            )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
