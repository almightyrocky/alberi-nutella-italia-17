
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/stores/authStore';
import NutellaLogo from '@/components/NutellaLogo';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-nutella-beige/20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-nutella-brown">
                Benvenuto in <br /><NutellaLogo size="xl" className="inline-block mt-2" />
              </h1>
              <p className="text-lg mb-8 text-nutella-brown/80 leading-relaxed">
                Entra a far parte della <span className="font-bold text-nutella-gold">Nutella Forest</span>: ogni barattolo di Nutella contribuisce alla riforestazione e alla sostenibilità del nostro pianeta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-nutella-red hover:bg-nutella-red/90 text-white text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                >
                  {isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-nutella-green text-nutella-green hover:bg-nutella-green/10 text-lg py-6 px-8 rounded-full"
                  onClick={() => navigate('/about')}
                >
                  Scopri di più
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative animate-float">
                <img 
                  src="/lovable-uploads/c04417a4-ee30-4aa5-8c69-94197c0326d0.png" 
                  alt="Nutella Forest" 
                  className="w-64 md:w-96 h-auto drop-shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 right-0 h-12 bg-gradient-to-r from-nutella-green to-transparent rounded-full blur-xl opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-nutella-brown">
              Come funziona <span className="text-nutella-red">Nutella</span> Forest
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un'iniziativa per rendere il mondo più verde, un barattolo alla volta
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-nutella-beige/30 rounded-2xl p-8 text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-nutella-lg">
              <div className="bg-gradient-to-br from-nutella-green to-nutella-darkgreen w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Acquista Nutella</h3>
              <p className="text-gray-700">
                Cerca i barattoli speciali di Nutella con il codice Forest all'interno.
              </p>
            </div>
            
            <div className="bg-nutella-beige/30 rounded-2xl p-8 text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-nutella-lg">
              <div className="bg-gradient-to-br from-nutella-red to-nutella-brown w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Registra il Codice</h3>
              <p className="text-gray-700">
                Inserisci il codice trovato nel barattolo sulla piattaforma Nutella Forest.
              </p>
            </div>
            
            <div className="bg-nutella-beige/30 rounded-2xl p-8 text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-nutella-lg">
              <div className="bg-gradient-to-br from-nutella-gold to-nutella-lightgold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Segui il Tuo Albero</h3>
              <p className="text-gray-700">
                Monitora la crescita del tuo albero e il suo impatto positivo sull'ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-nutella-green to-nutella-darkgreen text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Unisciti alla Foresta Nutella
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Un piccolo gesto per te, un grande passo per il pianeta. Inizia oggi il tuo percorso verde.
          </p>
          <Button
            className="bg-white text-nutella-green hover:bg-nutella-beige text-lg py-6 px-10 rounded-full shadow-xl border-2 border-white transition-transform hover:scale-105"
            onClick={() => navigate('/register')}
          >
            Crea il tuo account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
