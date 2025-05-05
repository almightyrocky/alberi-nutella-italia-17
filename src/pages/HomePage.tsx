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
      {/* HERO SECTION - Nutella style, glass effect, big logo, CTA */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-br from-nutella-beige/90 via-white/90 to-nutella-gold/20 animate-fade-in-up">
        <div className="absolute inset-0 z-0">
          <img 
            src="/SFONDO HERO.jpg" 
            alt="Sfondo Hero Nutella Forest" 
            className="w-full h-full object-cover object-center scale-105 blur-[2px] brightness-95" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-nutella-beige/60 to-nutella-gold/20" />
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 flex flex-col items-start justify-center">
            <h1 className="text-6xl md:text-7xl font-display font-extrabold mb-8 text-nutella-brown drop-shadow-2xl leading-tight tracking-tight">
              Un bicchiere <span className="inline-flex"><span className="text-black">n</span><span className="text-nutella-red">utella</span></span>, un albero
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-nutella-brown/90 drop-shadow font-medium max-w-xl">
              Entra a far parte della <span className="font-bold text-nutella-gold">Nutella Forest</span>: ogni bicchiere di Nutella contribuisce alla riforestazione e alla sostenibilità del nostro pianeta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button
                className="bg-nutella-red hover:bg-nutella-green text-lg md:text-xl py-6 px-10 rounded-full font-bold shadow-2xl border-2 border-nutella-red transition-all duration-200 w-full sm:w-auto focus:ring-4 focus:ring-nutella-gold/40"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                aria-label={isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
              >
                {isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
                <ArrowRight className="ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-nutella-gold bg-white/90 text-nutella-gold hover:bg-nutella-gold/90 hover:text-white text-lg md:text-xl py-6 px-10 rounded-full font-bold shadow-2xl transition-all duration-200 focus:ring-4 focus:ring-nutella-gold/40"
                onClick={() => navigate('/about')}
                aria-label="Scopri di più"
              >
                Scopri di più
              </Button>
            </div>
            {/* Community Counter with Avatars */}
            <div className="mt-12 bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-nutella-beige shadow-xl flex flex-col gap-2 w-full max-w-md animate-fade-in">
              <div className="flex items-center mb-1">
                <Users className="h-7 w-7 text-nutella-brown mr-3 icon-pulse" />
                <div>
                  <p className="text-base font-medium text-nutella-brown">La nostra community</p>
                  <p className="text-3xl font-bold text-nutella-red">
                    {communityCount.toLocaleString('it-IT')} partecipanti
                  </p>
                </div>
              </div>
              <div className="flex -space-x-2 overflow-hidden mt-2">
                {mockProfiles.map((profile, index) => (
                  <Avatar key={index} className="border-2 border-white w-10 h-10 avatar-ripple">
                    {profile.src ? (
                      <AvatarImage src={profile.src} alt={profile.name} />
                    ) : (
                      <AvatarFallback className="bg-nutella-green text-white text-sm">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ))}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-nutella-beige text-nutella-brown text-sm font-medium">
                  +{(communityCount - mockProfiles.length).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative animate-bounce-slow drop-shadow-2xl">
              <img 
                src="/lovable-uploads/c04417a4-ee30-4aa5-8c69-94197c0326d0.png" 
                alt="Nutella Forest - Un cucchiaio per te, un albero per tutti" 
                className="w-80 md:w-[28rem] h-auto rounded-3xl border-4 border-nutella-gold shadow-2xl bg-white/80 transition-transform duration-300 hover:scale-105 hover:brightness-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - modern Nutella cards */}
      <section className="py-24 bg-gradient-to-br from-nutella-beige/70 to-white/90 animate-fade-in-up">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-extrabold text-center text-nutella-brown mb-16 tracking-tight drop-shadow">
            Come funziona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="bg-white/95 rounded-3xl p-10 text-center shadow-2xl border-2 border-nutella-beige hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <div className="bg-nutella-green/90 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Users className="h-12 w-12 text-white icon-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-nutella-brown">Registrati</h3>
              <p className="text-gray-700 text-lg">
                Crea un account per iniziare il tuo viaggio nella Nutella Forest.
              </p>
            </Card>
            <Card className="bg-nutella-green/10 rounded-3xl p-10 text-center shadow-2xl border-2 border-nutella-beige hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <div className="bg-nutella-green w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <TreeDeciduous className="h-12 w-12 text-white icon-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-nutella-brown">Pianta un Albero</h3>
              <p className="text-gray-700 text-lg">
                Usa il codice che trovi nel bicchiere di Nutella per piantare un albero vero.
              </p>
            </Card>
            <Card className="bg-nutella-red/10 rounded-3xl p-10 text-center shadow-2xl border-2 border-nutella-beige hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <div className="bg-nutella-red w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Award className="h-12 w-12 text-white icon-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-nutella-brown">Guadagna Badge</h3>
              <p className="text-gray-700 text-lg">
                Segui la crescita del tuo albero e guadagna badge speciali per il tuo contributo.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES - modern Nutella cards */}
      <section className="py-24 bg-gradient-to-br from-nutella-beige/40 to-white/90 animate-fade-in-up">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-extrabold text-center text-nutella-brown mb-16 tracking-tight drop-shadow">
            Cosa ti offriamo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-white/95 rounded-3xl p-10 shadow-2xl border-2 border-nutella-beige flex items-start gap-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <div className="flex-shrink-0">
                <TreeDeciduous className="h-16 w-16 text-nutella-green icon-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-nutella-brown">Mappa Interattiva</h3>
                <p className="text-gray-700 text-lg">
                  Visualizza la posizione esatta del tuo albero e scopri gli altri alberi piantati nella foresta Nutella.
                </p>
              </div>
            </Card>
            <Card className="bg-white/95 rounded-3xl p-10 shadow-2xl border-2 border-nutella-beige flex items-start gap-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <div className="flex-shrink-0">
                <BarChart className="h-16 w-16 text-nutella-gold icon-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-nutella-brown">Impatto Ambientale</h3>
                <p className="text-gray-700 text-lg">
                  Monitora l'impatto positivo del tuo albero sull'ambiente con metriche dettagliate in tempo reale.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA - Nutella style */}
      <section className="py-24 bg-gradient-to-br from-nutella-green/90 to-nutella-gold/80 text-white animate-fade-in-up">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-10 drop-shadow-lg text-white">
            Unisciti alla Nutella Forest
          </h2>
          <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto drop-shadow">
            Ogni albero conta. Contribuisci a rendere il nostro pianeta più verde, un bicchiere di Nutella alla volta.
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <Button
              className="bg-nutella-red hover:bg-nutella-green text-lg md:text-xl py-6 px-12 rounded-full font-bold shadow-2xl border-2 border-nutella-red transition-all duration-200 focus:ring-4 focus:ring-nutella-gold/40"
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate(isAuthenticated ? '/dashboard' : '/register'); }}
              aria-label={isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
            >
              {isAuthenticated ? 'Vai alla tua foresta' : 'Inizia ora'}
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-nutella-gold bg-white/90 text-nutella-gold hover:bg-nutella-gold/90 hover:text-white text-lg md:text-xl py-6 px-12 rounded-full font-bold shadow-2xl transition-all duration-200 focus:ring-4 focus:ring-nutella-gold/40"
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/about'); }}
              aria-label="Scopri di più"
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
