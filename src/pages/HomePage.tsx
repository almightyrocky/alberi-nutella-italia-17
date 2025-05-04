import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Award, BarChart, TreeDeciduous } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/stores/authStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [communityCount, setCommunityCount] = useState(12835);

  // Simple animation effect for the counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCommunityCount(prevCount => prevCount + Math.floor(Math.random() * 3));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Mock user profile data for the community avatars
  const mockProfiles = [
    { name: 'Marco R', src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { name: 'Giulia T', src: '' },
    { name: 'Andrea B', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04' },
    { name: 'Sofia M', src: '' },
    { name: 'Luca V', src: '' },
    { name: 'Elena C', src: '' },
  ];

  return (
    <Layout>
      {/* Hero Section with Dynamic Background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/SFONDO HERO.jpg" 
            alt="Sfondo Hero Nutella Forest" 
            className="w-full h-full object-cover object-center" 
            style={{ filter: 'brightness(0.85) blur(0px)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-white/40"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white drop-shadow-lg">
                Pianta un albero con grazie al tuo <span className="text-nutella-red drop-shadow">bicchiere</span>
              </h1>
              <p className="text-lg mb-8 text-white drop-shadow-md">
                Entra a far parte della <span className="font-bold drop-shadow" style={{ color: '#e5a100' }}>Nutella Forest</span>: ogni barattolo di Nutella contribuisce alla riforestazione e alla sostenibilità del nostro pianeta.
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
              
              {/* Community Counter with Avatars */}
              <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-nutella-beige shadow-sm">
                <div className="flex items-center mb-2">
                  <Users className="h-6 w-6 text-nutella-brown mr-3" />
                  <div>
                    <p className="text-sm font-medium text-nutella-brown">La nostra community</p>
                    <p className="text-2xl font-bold text-nutella-red">
                      {communityCount.toLocaleString('it-IT')} partecipanti
                    </p>
                  </div>
                </div>
                
                {/* Profile avatars */}
                <div className="flex -space-x-2 overflow-hidden mt-2">
                  {mockProfiles.map((profile, index) => (
                    <Avatar key={index} className="border-2 border-white w-8 h-8">
                      {profile.src ? (
                        <AvatarImage src={profile.src} alt={profile.name} />
                      ) : (
                        <AvatarFallback className="bg-nutella-green text-white text-xs">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-nutella-beige text-nutella-brown text-xs font-medium">
                    +{(communityCount - mockProfiles.length).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative animate-bounce-slow">
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
      <section className="py-20 bg-nutella-beige/60">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-extrabold text-center text-nutella-brown mb-14 tracking-tight drop-shadow">
            Come funziona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-nutella-beige hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="bg-nutella-gold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Registrati</h3>
              <p className="text-gray-700 text-lg">
                Crea un account per iniziare il tuo viaggio nella Nutella Forest.
              </p>
            </div>
            <div className="bg-nutella-green/10 rounded-2xl p-8 text-center shadow-xl border border-nutella-beige hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="bg-nutella-green w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <TreeDeciduous className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Pianta un Albero</h3>
              <p className="text-gray-700 text-lg">
                Usa il codice che trovi nel barattolo Nutella per piantare un albero vero.
              </p>
            </div>
            <div className="bg-nutella-red/10 rounded-2xl p-8 text-center shadow-xl border border-nutella-beige hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="bg-nutella-red w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Guadagna Badge</h3>
              <p className="text-gray-700 text-lg">
                Segui la crescita del tuo albero e guadagna badge speciali per il tuo contributo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-nutella-beige/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-extrabold text-center text-nutella-brown mb-14 tracking-tight drop-shadow">
            Cosa ti offriamo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-nutella-beige flex items-start gap-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="flex-shrink-0">
                <TreeDeciduous className="h-14 w-14 text-nutella-green" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Mappa Interattiva</h3>
                <p className="text-gray-700 text-lg">
                  Visualizza la posizione esatta del tuo albero e scopri gli altri alberi piantati nella foresta Nutella.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-nutella-beige flex items-start gap-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="flex-shrink-0">
                <BarChart className="h-14 w-14 text-nutella-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Impatto Ambientale</h3>
                <p className="text-gray-700 text-lg">
                  Monitora l'impatto positivo del tuo albero sull'ambiente con metriche dettagliate in tempo reale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-nutella-green/90 to-nutella-gold/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-8 drop-shadow-lg">
            Unisciti alla Nutella Forest
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto drop-shadow">
            Ogni albero conta. Contribuisci a rendere il nostro pianeta più verde, un barattolo di Nutella alla volta.
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <Button
              className="bg-nutella-red hover:bg-nutella-green text-lg py-6 px-10 rounded-full font-bold shadow-xl border-2 border-nutella-red transition-all duration-200"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            >
              {isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-nutella-gold text-nutella-gold hover:bg-nutella-gold/10 text-lg py-6 px-10 rounded-full font-bold shadow-xl"
              onClick={() => navigate('/about')}
            >
              Scopri di più
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
