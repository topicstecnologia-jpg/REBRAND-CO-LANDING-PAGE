import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionProps {
  question: string;
  answer: string;
}

export const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-red-500' : 'text-white group-hover:text-gray-300'}`}>
          {question}
        </span>
        <div className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/50'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};