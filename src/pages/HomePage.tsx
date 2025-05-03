
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Award, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/stores/authStore';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-nutella-beige to-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-nutella-brown mb-6">
                Adotta un albero con <span className="text-nutella-red">Nutella</span>
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Entra a far parte della Nutella Forest: ogni barattolo di Nutella
                contribuisce alla riforestazione e alla sostenibilità del nostro pianeta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-nutella-green hover:bg-nutella-darkgreen text-lg py-6 px-8"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                >
                  {isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
                  <ArrowRight className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-nutella-green text-nutella-green hover:bg-nutella-green/10 text-lg py-6 px-8"
                  onClick={() => navigate('/about')}
                >
                  Scopri di più
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/c04417a4-ee30-4aa5-8c69-94197c0326d0.png" 
                  alt="Nutella Forest - Un cucchiaio per te, un albero per tutti" 
                  className="w-64 md:w-80 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-nutella-brown mb-12">
            Come funziona?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-nutella-beige/50 rounded-lg p-6 text-center">
              <div className="bg-nutella-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-nutella-brown">Registrati</h3>
              <p className="text-gray-700">
                Crea un account per iniziare il tuo viaggio nella Nutella Forest.
              </p>
            </div>
            
            <div className="bg-nutella-beige/50 rounded-lg p-6 text-center">
              <div className="bg-nutella-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img 
                  src="/lovable-uploads/c04417a4-ee30-4aa5-8c69-94197c0326d0.png" 
                  alt="Nutella Forest" 
                  className="h-12 w-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-nutella-brown">Adotta un Albero</h3>
              <p className="text-gray-700">
                Usa il codice che trovi nel barattolo Nutella per adottare un albero vero.
              </p>
            </div>
            
            <div className="bg-nutella-beige/50 rounded-lg p-6 text-center">
              <div className="bg-nutella-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-nutella-brown">Guadagna Badge</h3>
              <p className="text-gray-700">
                Segui la crescita del tuo albero e guadagna badge speciali per il tuo contributo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-nutella-beige/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-nutella-brown mb-12">
            Cosa ti offriamo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src="/lovable-uploads/c04417a4-ee30-4aa5-8c69-94197c0326d0.png" 
                    alt="Nutella Forest" 
                    className="h-12 w-auto"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-nutella-brown">Mappa Interattiva</h3>
                  <p className="text-gray-700">
                    Visualizza la posizione esatta del tuo albero e scopri gli altri alberi adottati nella foresta Nutella.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-start">
                <BarChart className="h-10 w-10 text-nutella-green mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3 text-nutella-brown">Impatto Ambientale</h3>
                  <p className="text-gray-700">
                    Monitora l'impatto positivo del tuo albero sull'ambiente con metriche dettagliate in tempo reale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-nutella-brown text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Unisciti alla Nutella Forest
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ogni albero conta. Contribuisci a rendere il nostro pianeta più verde, un barattolo di Nutella alla volta.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Button
              className="bg-nutella-red hover:bg-nutella-red/90 text-lg py-6 px-8"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            >
              {isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
              <ArrowRight className="ml-2" />
            </Button>
            <img 
              src="/lovable-uploads/c04417a4-ee30-4aa5-8c69-94197c0326d0.png" 
              alt="Nutella Forest" 
              className="h-16 w-auto"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
