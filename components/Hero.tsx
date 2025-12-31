
import React from 'react';

interface HeroProps {
  onNavigate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-[80vh] md:min-h-[90vh] flex items-center justify-center text-center bg-transparent relative overflow-hidden py-2 md:py-6">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
        }}
      ></div>
      
      <div className="relative z-10 px-4 w-full flex flex-col items-center">
        {/* Large prominent logo */}
        <div className="w-full max-w-[340px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[850px] mx-auto mb-2 transition-all duration-500">
          <img 
            src="https://publicdomainfanzine.puter.site/img/logo.png" 
            alt="Public Domain Fanzine Logo" 
            className="w-full h-auto animate-fade-in-scale drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
          />
        </div>

        {/* Descriptive text with optimized margins */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-lg text-medium-text mb-6 md:mb-8 leading-relaxed">
          <strong className="text-light-text font-bold">Public Domain Fanzine</strong> é uma série que resgata joias esquecidas da Era de Ouro dos quadrinhos. Focada em comics norte-americanos em domínio público, a coleção une pesquisa e restauração histórica.
        </p>

        {/* Forced CTA button to stay above the fold */}
        <button
          onClick={onNavigate}
          className="group relative inline-block px-12 py-4 text-base md:text-xl font-black text-light-text uppercase tracking-[0.2em] overflow-hidden border-2 border-brand-secondary shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300"
        >
          <span className="absolute inset-0 bg-brand-secondary transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"></span>
          <span className="relative transition-colors duration-300 group-hover:text-dark-bg">Veja as Edições</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
