import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, ArrowRight, User, Mail, Phone, DollarSign, Ticket } from 'lucide-react';

// --- CONFIGURAÇÃO DA PLANILHA GOOGLE (SHEETMONKEY) ---
// Integração configurada com a URL fornecida
const SHEET_ENDPOINT: string = "https://api.sheetmonkey.io/form/27prgfaSLJHTcMXbYdpTLj"; 

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    revenue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [agreed, setAgreed] = useState(true);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; 
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Máscara para o telefone (WhatsApp)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos (DDD + 9)

    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length > 10) {
      value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5}).*/, "($1) $2");
    }
    
    setFormData({ ...formData, whatsapp: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    setIsSubmitting(true);

    const timestamp = new Date().toLocaleString('pt-BR');

    // 1. Payload para E-MAIL (FormSubmit)
    const emailPayload = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        revenue: formData.revenue,
        _subject: `Novo Lead: ${formData.name}`,
        _template: "table",
        _captcha: "false"
    };

    // 2. Payload para PLANILHA (SheetMonkey)
    // As chaves aqui serão os nomes das colunas na planilha
    const sheetPayload = {
        "Nome": formData.name,
        "Email": formData.email,
        "WhatsApp": formData.whatsapp,
        "Faturamento": formData.revenue,
        "Data": timestamp,
    };

    try {
        const promises = [];

        // Envio 1: Email (FormSubmit)
        promises.push(
            fetch("https://formsubmit.co/ajax/topicstecnologia@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(emailPayload)
            })
        );

        // Envio 2: Planilha (SheetMonkey)
        if (SHEET_ENDPOINT && SHEET_ENDPOINT.startsWith("http")) {
            promises.push(
                fetch(SHEET_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sheetPayload),
                })
            );
        } else {
            console.warn("SheetMonkey Endpoint não configurado. Os dados não serão salvos na planilha.");
        }

        // Aguarda todas as requisições
        await Promise.all(promises);

        // Backup LocalStorage
        const currentLeads = JSON.parse(localStorage.getItem('rebrand_leads') || '[]');
        localStorage.setItem('rebrand_leads', JSON.stringify([...currentLeads, { ...formData, date: new Date().toISOString() }]));
        
        setIsSuccess(true);

    } catch (error) {
        console.error("Erro ao processar envio:", error);
        alert("Houve um erro de conexão. Se persistir, entre em contato via WhatsApp.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', whatsapp: '', revenue: '' });
    setIsSuccess(false);
    onClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Heavy Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-500"
        onClick={onClose}
      ></div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 bg-white text-black rounded-full p-2 hover:scale-110 transition-transform z-50"
      >
        <X size={20} strokeWidth={3} />
      </button>

      {/* Form Content */}
      <div className={`
        relative w-full max-w-[500px] z-10
        transform transition-all duration-500 ease-out
        ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}
      `}>
        
        {!isSuccess ? (
          <div className="flex flex-col gap-6">
            <div className="text-center mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                Preencha seus dados abaixo para prosseguir:
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Name Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors pointer-events-none">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-[#1A1A1A] transition-all"
                  placeholder="Seu nome...*"
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors pointer-events-none">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-[#1A1A1A] transition-all"
                  placeholder="Seu melhor email...*"
                />
              </div>

              {/* WhatsApp Input (Updated) */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none border-r border-white/10 pr-3 h-6">
                   <img src="https://flagcdn.com/w40/br.png" alt="Brasil" className="w-6 h-auto rounded-sm opacity-90" />
                </div>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  className="w-full bg-[#1A1A1A]/80 border border-white/10 rounded-2xl py-4 pl-24 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-[#1A1A1A] transition-all"
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>

               {/* Revenue Input */}
               <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors pointer-events-none">
                  <DollarSign size={20} />
                </div>
                <select
                  name="revenue"
                  required
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-300 focus:text-white focus:outline-none focus:border-red-500/50 focus:bg-[#1A1A1A] transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-gray-500">Selecione seu Faturamento*</option>
                  <option value="Ainda não faturo" className="bg-[#1A1A1A] text-white">Ainda não faturo</option>
                  <option value="Ate 5k" className="bg-[#1A1A1A] text-white">Até R$ 5.000</option>
                  <option value="5k a 10k" className="bg-[#1A1A1A] text-white">R$ 5.000 a R$ 10.000</option>
                  <option value="10k a 30k" className="bg-[#1A1A1A] text-white">R$ 10.000 a R$ 30.000</option>
                  <option value="30k a 50k" className="bg-[#1A1A1A] text-white">R$ 30.000 a R$ 50.000</option>
                  <option value="Acima de 50k" className="bg-[#1A1A1A] text-white">Acima de R$ 50.000</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mt-2 px-1">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-white/5 checked:border-red-500 checked:bg-red-500 transition-all"
                  />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer select-none">
                  Li e estou de acordo com os termos de uso e políticas de privacidade
                </label>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting || !agreed}
                className="group relative w-full mt-4 bg-gradient-to-r from-red-600 to-[#991B1B] hover:from-red-500 hover:to-red-700 text-white font-bold py-5 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)] transform transition-all active:scale-[0.98] flex items-center justify-between px-2 pl-8 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 overflow-hidden"
              >
                {/* Text */}
                <span className="uppercase tracking-wider text-sm md:text-base font-display z-10">
                  {isSubmitting ? 'Enviando...' : 'QUERO MINHA CONSULTORIA'}
                </span>

                {/* Icon Container */}
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors z-10">
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <Ticket size={20} className="transform -rotate-45" />
                    )}
                </div>

                {/* Shine Effect */}
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine transition-all"></div>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 px-6 bg-[#1A1A1A]/80 border border-white/10 rounded-3xl backdrop-blur-md">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display mb-3">Aplicação Recebida!</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Nossa equipe analisará seu perfil e entrará em contato via WhatsApp em até 48 horas.
            </p>
            <button
              onClick={resetForm}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors uppercase tracking-widest text-sm"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};