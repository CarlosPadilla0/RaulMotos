import React, { useEffect } from 'react';
import type { CheckoutProduct, ModalConfig, BillingInfo as BillingInfoType } from '../types';
import { InformationCircleIcon } from './icons';

interface BillingInfoProps {
  activeProduct: CheckoutProduct;
  onUpdate: (data: { billingInfo: BillingInfoType }) => void;
  showModal: (config: ModalConfig) => void;
  closeModal: () => void;
  isEmployee: boolean;
}

const GENERIC_RFC = 'XAXX010101000';

const Input = ({ label, id, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label:string, required?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input id={id} {...props} className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed" />
    </div>
);

const Select = ({ label, id, children, required, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, required?: boolean }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <select id={id} {...props} className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coppel-blue focus:border-coppel-blue sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
            {children}
        </select>
    </div>
);


export const BillingInfo: React.FC<BillingInfoProps> = ({ activeProduct, onUpdate, showModal, closeModal, isEmployee }) => {
    
    const { billingInfo } = activeProduct;

    useEffect(() => {
        if (isEmployee && !billingInfo.useGenericRfc) {
            const newBillingInfo: BillingInfoType = {
                ...billingInfo,
                useGenericRfc: true,
                rfc: GENERIC_RFC,
                postalCode: '80105',
                regime: '616',
                cfdiUse: 'S01',
                dob: '',
                curp: '',
                gender: '',
            };
            onUpdate({ billingInfo: newBillingInfo });
        }
    }, [isEmployee, billingInfo, onUpdate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        switch (name) {
            case 'name':
                processedValue = value.replace(/[^a-zA-Z\s]/g, '');
                break;
            case 'postalCode':
                processedValue = value.replace(/\D/g, '');
                break;
            case 'rfc':
            case 'curp':
                processedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                break;
        }
        
        onUpdate({ billingInfo: { ...billingInfo, [name]: processedValue }});
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
        
        onUpdate({ billingInfo: { ...billingInfo, dob: value }});
    };

    const handleGenericRfcToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEmployee) return;

        const isChecked = e.target.checked;
        const newBillingInfo = {
            ...billingInfo,
            useGenericRfc: isChecked,
            rfc: isChecked ? GENERIC_RFC : '',
            name: isChecked ? billingInfo.name : billingInfo.name, // Keep the buyer's name
            postalCode: isChecked ? '80105' : billingInfo.postalCode === '80105' ? '' : billingInfo.postalCode,
            regime: isChecked ? '616' : '',
            cfdiUse: isChecked ? 'S01' : '',
        };
        onUpdate({ billingInfo: newBillingInfo });
    };
    
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Datos de facturación</h2>
            <div className="space-y-6">
                 <p className="text-sm text-gray-500">Los campos con asterisco (*) son obligatorios.</p>
                <label className={`flex items-center ${isEmployee ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input 
                        type="checkbox" 
                        checked={billingInfo.useGenericRfc}
                        onChange={handleGenericRfcToggle}
                        className="h-5 w-5 text-coppel-blue focus:ring-coppel-blue border-gray-300 rounded disabled:bg-gray-200"
                        disabled={isEmployee}
                    />
                    <span className={`ml-3 font-semibold ${isEmployee ? 'text-gray-500' : 'text-gray-800'}`}>Usar RFC genérico</span>
                </label>
                
                {isEmployee && (
                    <div className="flex items-start p-3 bg-yellow-50 border-l-4 border-coppel-yellow text-yellow-800 rounded-r-lg">
                       <InformationCircleIcon className="w-5 h-5 mr-2 mt-px flex-shrink-0" />
                       <p className="text-sm font-medium">Como colaborador, la facturación se realiza únicamente con RFC genérico.</p>
                   </div>
                )}

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
                     <Input label="Código Postal" id="postalCode" name="postalCode" value={billingInfo.postalCode} onChange={handleChange} maxLength={5} required disabled={billingInfo.useGenericRfc} />

                     <Select label="Régimen fiscal" id="regime" name="regime" value={billingInfo.regime} onChange={handleChange} required={!billingInfo.useGenericRfc} disabled={billingInfo.useGenericRfc}>
                        <option value="">Selecciona una opción</option>
                        <option value="601">General de Ley Personas Morales</option>
                        <option value="603">Personas Morales con Fines no Lucrativos</option>
                        <option value="612">Personas Físicas con Actividades Empresariales y Profesionales</option>
                        <option value="616">Sin obligaciones fiscales</option>
                        <option value="621">Incorporación Fiscal</option>
                        <option value="626">Régimen Simplificado de Confianza</option>
                    </Select>

                    <Select label="Uso de CFDI" id="cfdiUse" name="cfdiUse" value={billingInfo.cfdiUse} onChange={handleChange} required disabled={billingInfo.useGenericRfc}>
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
            </div>
        </div>
    );
};