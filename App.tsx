import React, { useRef, useState, useEffect } from 'react';
import { NoiseOverlay } from './components/NoiseOverlay';
import { Hero } from './components/Hero';
import { Button } from './components/Button';
import { Accordion } from './components/Accordion';
import { LeadForm } from './components/LeadForm';
import { Check, X, ArrowRight, Target, BarChart2, Users, ClipboardList, Search, Calendar, Gem } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Logic for Method Timeline Progress
  const methodRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    // Trigger progress bar animation on mount
    const timer = setTimeout(() => {
      setProgress(25);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!methodRef.current) return;
      
      const rect = methodRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const startOffset = windowHeight * 0.6; 
      const elementTop = rect.top;
      const scrolled = startOffset - elementTop;
      
      let percentage = (scrolled / (elementHeight - 100)) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      
      setLineHeight(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const deliverables = [
    { 
      icon: <ClipboardList className="w-6 h-6 text-red-500" />, 
      title: "Plano de Ação", 
      desc: "Um guia estratégico desenhado para o seu momento atual, focado em implementação imediata e resultados rápidos." 
    },
    { 
      icon: <Search className="w-6 h-6 text-red-500" />, 
      title: "Auditoria de Gargalos", 
      desc: "Análise profunda do seu negócio para identificar exatamente onde você está deixando dinheiro na mesa hoje." 
    },
    { 
      icon: <Calendar className="w-6 h-6 text-red-500" />, 
      title: "Roadmap de 30 Dias", 
      desc: "Cronograma prático do que deve ser executado nas próximas 4 semanas para gerar caixa e atrair clientes." 
    },
    { 
      icon: <Gem className="w-6 h-6 text-red-500" />, 
      title: "Insight Premium", 
      desc: "Acesso a estratégias validadas de alto nível e inteligência de mercado que pouquíssimos players têm acesso." 
    }
  ];

  const methodSteps = [
    { 
      step: "01", 
      title: "Diagnóstico de Posicionamento", 
      desc: "Identificamos as brechas na sua oferta atual que estão fazendo você perder dinheiro todos os dias. Analisamos seu público, sua promessa e sua entrega.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "02", 
      title: "Engenharia de Oferta", 
      desc: "Reestruturamos seu serviço para que ele se torne irresistível. Criamos uma oferta High-Ticket que permite cobrar de 3x a 10x mais pelo mesmo serviço.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "03", 
      title: "Funil de Aquisição Automática", 
      desc: "Implementamos o sistema que traz leads qualificados em 48h sem você precisar gravar dancinhas ou criar conteúdo o dia inteiro.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-red-500/30 font-sans">
      <NoiseOverlay />
      <LeadForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* --- SECTION 1: HERO --- */}
      <Hero />

      {/* --- SECTION 2: PARA QUEM É --- */}
      <section id="about" className="py-20 md:py-24 relative z-10 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src="https://i.postimg.cc/3wNHJZdZ/adient-(6).jpg" 
            alt="Background Texture" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen" 
          />
          {/* Gradients to blend edges into black background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase mb-3 font-display">Público Alvo</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display tracking-tight">
              Para quem é o método <span className="italic font-serif text-gray-400">Rebrand Co.</span>?
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Desenvolvemos este ecossistema estratégico especificamente para quem vende conhecimento ou serviços de alto valor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: <Target className="w-5 h-5 text-red-500" />, title: "Consultores & Coaches", desc: "Que estão cansados de vender hora e querem vender transformações high-ticket." },
              { icon: <BarChart2 className="w-5 h-5 text-white" />, title: "Agências & Freelancers", desc: "Que sofrem com o ciclo da falência: meses com muitos clientes, meses sem nenhum." },
              { icon: <Users className="w-5 h-5 text-gray-400" />, title: "Prestadores de Serviço", desc: "Advogados, Arquitetos e Especialistas que dependem 100% do 'boca a boca'." }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-red-500/30 transition-all hover:bg-white/[0.07] group backdrop-blur-sm">
                <div className="mb-4 p-2.5 bg-black/40 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  {item.icon}
                </div>
                <h4 className="text-base font-bold mb-2 text-white font-display">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: ENTREGÁVEIS (BLOCKS) --- */}
      <section className="py-20 bg-[#080808] border-y border-white/5 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase mb-3 font-display">Entregáveis</h2>
              <h3 className="text-2xl md:text-4xl font-bold text-white font-display tracking-tight">
                O que você recebe na <br className="hidden md:block" />Consultoria Gratuita
              </h3>
            </div>
            <div className="hidden md:flex gap-2">
               <div className="w-12 h-1 bg-white/10 rounded-full"></div>
               <div className="w-4 h-1 bg-red-500 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {deliverables.map((item, idx) => (
               <div key={idx} className="bg-[#0A0A0A] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-red-500/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
                  {/* Background Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                       {item.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white font-display mb-3 group-hover:text-red-500 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: O MÉTODO (UPDATED) --- */}
      <section className="py-20 bg-[#0A0A0A] relative z-10 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center md:text-left">
            <h2 className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase mb-3 font-display">Nossa Metodologia</h2>
            <h3 className="text-2xl md:text-4xl font-bold text-white font-display tracking-tight leading-tight">
              Como funciona o <br /> ecossistema?
            </h3>
          </div>
          
          <div className="max-w-5xl mx-auto relative pl-4 md:pl-0" ref={methodRef}>
             {/* Timeline Vertical Line Container */}
             <div className="absolute left-0 md:left-8 top-8 bottom-8 w-[1px] bg-white/5 overflow-hidden z-0">
               {/* Animated Progress Line */}
               <div 
                 className="w-full bg-gradient-to-b from-red-500 to-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)] transition-all duration-75 ease-linear will-change-transform"
                 style={{ height: `${lineHeight}%` }}
               />
             </div>

             {/* Steps Grid */}
             <div className="space-y-20 md:space-y-24 relative z-10">
                {methodSteps.map((item, idx) => (
                  <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center group pl-8 md:pl-20">
                    
                    {/* Visual Indicator on Timeline */}
                    <div className={`absolute left-[-4px] md:left-[28px] top-6 w-2.5 h-2.5 rounded-full border border-gray-700 transition-all duration-500 z-10 bg-[#0A0A0A] ${lineHeight > ((idx * 33) + 10) ? '!bg-red-500 !border-red-500 shadow-[0_0_10px_rgba(220,38,38,1)]' : ''}`}></div>

                    {/* Text Content */}
                    <div className="order-2 md:order-1">
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-red-500/20 transition-colors font-display">
                          {item.step}
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-white font-display group-hover:text-red-500 transition-colors duration-300">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed pl-1">
                        {item.desc}
                      </p>
                    </div>

                    {/* Image Frame */}
                    <div className="order-1 md:order-2">
                       <div className="relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden border border-white/10 group-hover:border-red-500/30 transition-all duration-500 shadow-2xl">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                          />
                          {/* Inner overlay/scanline effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                       </div>
                    </div>

                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ANTES E DEPOIS --- */}
      <section className="py-20 md:py-24 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
              A Diferença é <span className="text-red-500">Brutal</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card Antes */}
            <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/5 relative opacity-70 hover:opacity-100 transition-opacity">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 to-gray-500"></div>
              <h4 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-3 font-display">
                <X className="text-gray-500 w-5 h-5" /> Sem o Método
              </h4>
              <ul className="space-y-3 text-gray-400 text-xs md:text-sm">
                <li className="flex gap-3"><span className="text-red-900 font-bold">✕</span> Renda instável (montanha russa)</li>
                <li className="flex gap-3"><span className="text-red-900 font-bold">✕</span> Clientes que pedem desconto</li>
                <li className="flex gap-3"><span className="text-red-900 font-bold">✕</span> Dependência de indicações</li>
                <li className="flex gap-3"><span className="text-red-900 font-bold">✕</span> Trabalha muito, ganha pouco</li>
              </ul>
            </div>

            {/* Card Depois */}
            <div className="bg-[#0f0f0f] p-6 md:p-8 rounded-2xl border border-red-500/20 relative shadow-[0_0_50px_rgba(220,38,38,0.05)] transform md:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-gray-800"></div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3 font-display">
                <Check className="text-red-500 w-5 h-5" /> Com Rebrand Co.
              </h4>
              <ul className="space-y-3 text-gray-200 text-xs md:text-sm">
                <li className="flex gap-3"><span className="text-red-500 font-bold">✓</span> Previsibilidade de caixa</li>
                <li className="flex gap-3"><span className="text-red-500 font-bold">✓</span> Clientes High-Ticket</li>
                <li className="flex gap-3"><span className="text-red-500 font-bold">✓</span> Sistema automático de vendas</li>
                <li className="flex gap-3"><span className="text-red-500 font-bold">✓</span> Liberdade de tempo e geográfica</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FAQ --- */}
      <section className="py-20 bg-[#050505] relative z-10 pb-48">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-500 text-sm">Tire suas dúvidas antes de agendar sua sessão estratégica.</p>
          </div>

          <div className="space-y-3">
            <Accordion 
              question="A consultoria é realmente gratuita?" 
              answer="Sim. A sessão inicial de diagnóstico e plano de ação é 100% gratuita. Fazemos isso porque sabemos que uma porcentagem das pessoas que ajudamos decide contratar nossa implementação avançada." 
            />
            <Accordion 
              question="Funciona para quem está começando do zero?" 
              answer="O método funciona melhor para quem já tem uma habilidade técnica validada. Se você já presta serviço mas não sabe vender, é perfeito para você. Se você ainda não tem nenhuma habilidade vendável, recomendamos estudar uma profissão primeiro." 
            />
            <Accordion 
              question="Preciso investir em anúncios?" 
              answer="Nossa metodologia ensina tanto estratégias orgânicas quanto pagas. Você pode começar sem investir um real em anúncios, usando nosso script de prospecção ativa." 
            />
            <Accordion 
              question="Quanto tempo demora para ver resultados?" 
              answer="A maioria dos nossos mentorados fecha o primeiro contrato High-Ticket (acima de R$ 2k) nos primeiros 30 dias de aplicação do método." 
            />
          </div>
        </div>
      </section>

      {/* --- STICKY FOOTER CTA --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
        {/* Increased Blur Height and Intensity */}
        <div 
          className="absolute bottom-0 left-0 w-full h-48 bg-black/60 backdrop-blur-[20px] pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)'
          }}
        />
        
        {/* Sticky Content */}
        <div className="relative z-50 container mx-auto px-4 pb-8 pt-12 flex flex-col items-center pointer-events-auto">
          <Button 
            className="w-full md:w-auto md:min-w-[450px] text-base md:text-lg shadow-[0_0_50px_rgba(217,4,41,0.3)]"
            onClick={handleOpenModal}
            continuousShine={true}
          >
            QUERO ME APLICAR <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
          </Button>

          {/* Progress Bar Section */}
          <div className="w-full md:w-auto md:min-w-[450px] mt-5 flex flex-col gap-2">
            <div className="w-full h-3 bg-gray-800/80 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm relative">
               <div 
                  className="h-full bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-[3000ms] ease-out"
                  style={{ width: `${progress}%` }}
               >
               </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-display flex items-center justify-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(220,38,38,0.8)]"></span>
               25% das vagas preenchidas
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default App;