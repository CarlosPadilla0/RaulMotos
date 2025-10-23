import React from 'react';
import type { OrderData } from '../types';
import { CheckoutStepWrapper } from './CheckoutStepWrapper';

interface BillingInfoProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onBack: () => void;
  onContinue: () => void;
}

const GENERIC_RFC = 'XAXX010101000';

const Input = ({ label, id, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label:string, required?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input id={id} {...props} className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm disabled:bg-gray-100" />
    </div>
);

const Select = ({ label, id, children, required, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, required?: boolean }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <select id={id} {...props} className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm">
            {children}
        </select>
    </div>
);


export const BillingInfo: React.FC<BillingInfoProps> = ({ orderData, setOrderData, onBack, onContinue }) => {
    
    const { billingInfo } = orderData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        switch (name) {
            case 'name':
                // Allow letters and spaces only
                processedValue = value.replace(/[^a-zA-Z\s]/g, '');
                break;
            case 'postalCode':
                // Allow numbers only
                processedValue = value.replace(/\D/g, '');
                break;
            case 'rfc':
            case 'curp':
                // Allow alphanumeric only and convert to uppercase
                processedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                break;
        }

        setOrderData(prev => ({
            ...prev,
            billingInfo: { ...prev.billingInfo, [name]: processedValue }
        }));
    };
    
    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
        if (value.length > 4) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
        } else if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        
        setOrderData(prev => ({
            ...prev,
            billingInfo: { ...prev.billingInfo, dob: value }
        }));
    };

    const handleGenericRfcToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setOrderData(prev => ({
            ...prev,
            billingInfo: { 
                ...prev.billingInfo, 
                useGenericRfc: isChecked,
                rfc: isChecked ? GENERIC_RFC : '',
                name: isChecked ? 'PÚBLICO EN GENERAL' : prev.billingInfo.name === 'PÚBLICO EN GENERAL' ? '' : prev.billingInfo.name,
                postalCode: isChecked ? '80105' : prev.billingInfo.postalCode === '80105' ? '' : prev.billingInfo.postalCode,
                regime: isChecked ? '616' : '',
                cfdiUse: isChecked ? 'S01' : '',
            }
        }));
    };
    
    const handleContinue = () => {
        if (!window.confirm("¿Estás seguro de que tus datos son correctos?")) {
            return;
        }

        const { useGenericRfc, name, postalCode, cfdiUse, email, confirmEmail, rfc, regime, dob, curp, gender } = billingInfo;

        if (!name || !postalCode || !cfdiUse || !email || !confirmEmail) {
            alert('Por favor, completa los campos obligatorios (*): Nombre, Código Postal, Uso de CFDI y ambos campos de Correo electrónico.');
            return;
        }

        if (email !== confirmEmail) {
            alert('Los correos electrónicos no coinciden. Por favor, verifícalos.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un correo electrónico con un formato válido (ej. tu@correo.com).');
            return;
        }

        if (!useGenericRfc) {
            if (!rfc || !regime || !dob || !curp || !gender) {
                alert('Para facturar, por favor completa todos los campos obligatorios (*): RFC, Régimen fiscal, Fecha de Nacimiento, CURP y Género.');
                return;
            }
        }

        onContinue();
    };


    return (
        <CheckoutStepWrapper title="Datos de facturación" onBack={onBack}>
            <div className="space-y-6">
                 <p className="text-sm text-gray-500">Los campos con asterisco (*) son obligatorios.</p>
                <label className="flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={billingInfo.useGenericRfc}
                        onChange={handleGenericRfcToggle}
                        className="h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300 rounded"
                    />
                    <span className="ml-3 font-semibold text-gray-800">Usar RFC genérico</span>
                </label>
                
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                     <div>
                        <Input label="RFC" id="rfc" name="rfc" value={billingInfo.rfc} onChange={handleChange} maxLength={13} required disabled={billingInfo.useGenericRfc} />
                        {!billingInfo.useGenericRfc && (
                            <p className="text-right mt-1">
                                <a href="https://www54.sat.gob.mx/curp/Consult" target="_blank" rel="noopener noreferrer" className="text-sm text-coppel-blue hover:underline">
                                    ¿No sabes tu RFC? Consúltalo aquí
                                </a>
                            </p>
                        )}
                     </div>
                     <Input label="Nombre o razón social" id="name" name="name" value={billingInfo.name} onChange={handleChange} required />
                     <Input label="Código Postal" id="postalCode" name="postalCode" value={billingInfo.postalCode} onChange={handleChange} maxLength={5} required />

                     <Select label="Régimen fiscal" id="regime" name="regime" value={billingInfo.regime} onChange={handleChange} required={!billingInfo.useGenericRfc} >
                        <option value="">Selecciona una opción</option>
                        <option value="601">General de Ley Personas Morales</option>
                        <option value="603">Personas Morales con Fines no Lucrativos</option>
                        <option value="612">Personas Físicas con Actividades Empresariales y Profesionales</option>
                        <option value="616">Sin obligaciones fiscales</option>
                        <option value="621">Incorporación Fiscal</option>
                        <option value="626">Régimen Simplificado de Confianza</option>
                    </Select>

                    <Select label="Uso de CFDI" id="cfdiUse" name="cfdiUse" value={billingInfo.cfdiUse} onChange={handleChange} required>
                         <option value="">Selecciona una opción</option>
                        <option value="G01">Adquisición de mercancías</option>
                        <option value="G03">Gastos en general</option>
                        <option value="I08">Mobiliario y equipo de oficina por inversiones</option>
                        <option value="S01">Sin efectos fiscales</option>
                        <option value="P01">Por definir</option>
                    </Select>
                     <Input label="Correo electrónico" id="email" name="email" type="email" value={billingInfo.email} onChange={handleChange} required />
                     <Input label="Confirmar correo electrónico" id="confirmEmail" name="confirmEmail" type="email" value={billingInfo.confirmEmail} onChange={handleChange} required />
                     
                     {!billingInfo.useGenericRfc && (
                        <>
                            <Input 
                                label="Fecha de Nacimiento" 
                                id="dob" 
                                name="dob" 
                                type="text" 
                                placeholder="DD/MM/AAAA"
                                value={billingInfo.dob} 
                                onChange={handleDobChange} 
                                maxLength={10}
                                required 
                            />
                            <div>
                                <Input label="CURP" id="curp" name="curp" value={billingInfo.curp} onChange={handleChange} maxLength={18} required />
                                 <p className="text-right mt-1">
                                    <a href="https://www.gob.mx/curp" target="_blank" rel="noopener noreferrer" className="text-sm text-coppel-blue hover:underline">
                                        ¿No sabes tu CURP? Consúltalo aquí
                                    </a>
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Género<span className="text-red-500">*</span></label>
                                <div className="flex items-center space-x-4 mt-2">
                                    <label className="flex items-center text-sm">
                                        <input type="radio" name="gender" value="male" checked={billingInfo.gender === 'male'} onChange={handleChange} className="h-4 w-4 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                                        <span className="ml-2">Masculino</span>
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input type="radio" name="gender" value="female" checked={billingInfo.gender === 'female'} onChange={handleChange} className="h-4 w-4 text-coppel-blue focus:ring-coppel-blue border-gray-300"/>
                                        <span className="ml-2">Femenino</span>
                                    </label>
                                </div>
                            </div>
                        </>
                     )}
                </div>

                 <div className="flex justify-center mt-6">
                     <button onClick={handleContinue} className="w-full md:w-auto bg-coppel-blue text-white font-bold py-3 px-16 rounded-full hover:bg-blue-800 transition-colors text-lg">
                        Siguiente
                    </button>
                 </div>
            </div>
        </CheckoutStepWrapper>
    );
};