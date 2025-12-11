import React from 'react';
import { Hexagon, Triangle, Circle, Square, Activity, Layers, Zap, Box, ChevronDown, Check } from 'lucide-react';

export const Hero: React.FC = () => {
  const logos = [
    { icon: <Hexagon />, name: "Nexus" },
    { icon: <Triangle />, name: "Vortex" },
    { icon: <Circle />, name: "Orbit" },
    { icon: <Square />, name: "Cube" },
    { icon: <Activity />, name: "Pulse" },
    { icon: <Layers />, name: "Stack" },
    { icon: <Zap />, name: "Bolt" },
    { icon: <Box />, name: "Block" },
  ];

  // Duplicating logos for infinite loop
  const carouselItems = [...logos, ...logos];
  
  // Imagem estilo Noir/Detetive - Updated
  const HERO_IMAGE_URL = "https://i.postimg.cc/437djRkb/adient-(7).jpg"; 

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end">
      {/* Fixed Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 w-full h-full">
           <img
            src={HERO_IMAGE_URL}
            alt="Background Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Gradient Overlay: Decreased opacity as requested */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
      </div>

      {/* Content Positioned at Bottom Center - Padding Reduced to move content lower */}
      <div className="relative z-20 container mx-auto px-4 pb-10 md:pb-12 flex flex-col items-center text-center">
        
        <div className="flex flex-col items-center gap-6 max-w-5xl mx-auto mb-10">
          
          {/* H1 Updated Text */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight drop-shadow-2xl font-display">
            Vamos te entregar em dois dias uma <br className="hidden md:block" />
            máquina de atrair clientes qualificados
          </h1>
          
          {/* Replacement for Subtitle: Bullets */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-2">
             <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/15 transition-colors">
                <Check className="w-4 h-4 text-red-500" strokeWidth={3} />
                <span className="text-sm font-medium text-white tracking-wide">Consultoria Gratuita</span>
             </div>
             <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/15 transition-colors">
                <Check className="w-4 h-4 text-red-500" strokeWidth={3} />
                <span className="text-sm font-medium text-white tracking-wide">Sem depender de indicação</span>
             </div>
          </div>

        </div>

        {/* Logo Carousel - Subtle at bottom */}
        <div className="w-full max-w-5xl mx-auto opacity-50 hover:opacity-100 transition-opacity duration-500 border-t border-white/5 pt-6">
            <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-4 font-display">Empresas que escalaram</p>
            <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
                
                <div className="flex animate-marquee whitespace-nowrap">
                   {carouselItems.map((item, index) => (
                     <div key={index} className="flex items-center gap-2 mx-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        {React.cloneElement(item.icon, { size: 16, strokeWidth: 1.5 })}
                        <span className="font-display font-bold text-xs tracking-wide">{item.name}</span>
                     </div>
                   ))}
                </div>
            </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 animate-bounce pointer-events-none opacity-30">
        <ChevronDown className="text-white w-4 h-4" />
      </div>
    </section>
  );
};