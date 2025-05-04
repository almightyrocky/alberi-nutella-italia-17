import React from 'react';
import Layout from '@/components/Layout';
import { TreeDeciduous, Leaf, Cloud, Globe, Droplets } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nutella-beige/70 via-white/80 to-nutella-gold/20 py-20 md:py-32 rounded-b-3xl shadow-2xl animate-fade-in">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-nutella-brown mb-8 drop-shadow-xl">
              La Missione <span className="inline-flex"><span className="text-black">n</span><span className="text-nutella-red">utella</span></span> Forest
            </h1>
            <p className="text-2xl text-nutella-brown/80 font-medium leading-relaxed">
              Un impegno concreto per il nostro pianeta, un albero alla volta.<br/>
              Scopri come Nutella sta contribuendo a rendere il mondo più verde e sostenibile.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-nutella-brown mb-8">
                La Nostra Storia
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nutella Forest è nato dall'idea di unire la gioia di gustare Nutella con un impatto positivo sul pianeta.
                Nel 2024, abbiamo lanciato questa iniziativa con l'obiettivo di piantare 1 milione di alberi entro il 2030.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ogni barattolo di Nutella contiene un codice unico che ti permette di piantare un albero reale.
                Questi alberi vengono piantati in aree strategiche del nostro paese, contribuendo alla riforestazione
                e alla creazione di habitat naturali.
              </p>
            </div>
            <div className="relative">
              <div className="bg-nutella-green/10 rounded-3xl p-10 shadow-xl animate-fade-in">
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex flex-col items-center text-center">
                    <TreeDeciduous className="h-14 w-14 text-nutella-green mb-4" />
                    <span className="text-4xl font-bold text-nutella-brown">120.000+</span>
                    <span className="text-base text-gray-600">Alberi piantati</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Leaf className="h-14 w-14 text-nutella-green mb-4" />
                    <span className="text-4xl font-bold text-nutella-brown">25+</span>
                    <span className="text-base text-gray-600">Specie diverse</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Globe className="h-14 w-14 text-nutella-green mb-4" />
                    <span className="text-4xl font-bold text-nutella-brown">15+</span>
                    <span className="text-base text-gray-600">Regioni coinvolte</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Cloud className="h-14 w-14 text-nutella-green mb-4" />
                    <span className="text-4xl font-bold text-nutella-brown">480+</span>
                    <span className="text-base text-gray-600">Tonnellate CO₂ assorbite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 bg-nutella-beige/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-extrabold text-nutella-brown mb-14 text-center drop-shadow">
            Il Nostro Impatto Ambientale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/90 p-10 rounded-3xl shadow-xl animate-fade-in flex flex-col items-center">
              <div className="bg-nutella-green/10 p-5 rounded-full mb-6">
                <TreeDeciduous className="h-12 w-12 text-nutella-green" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Riforestazione</h3>
              <p className="text-gray-600 text-lg text-center">
                Ripristiniamo aree deforestate con specie locali per garantire 
                la biodiversità e proteggere gli ecosistemi naturali.
              </p>
            </div>
            <div className="bg-white/90 p-10 rounded-3xl shadow-xl animate-fade-in flex flex-col items-center">
              <div className="bg-nutella-green/10 p-5 rounded-full mb-6">
                <Droplets className="h-12 w-12 text-nutella-green" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Conservazione dell'acqua</h3>
              <p className="text-gray-600 text-lg text-center">
                I nostri alberi aiutano a trattenere l'acqua nel suolo e a prevenire 
                l'erosione, migliorando la qualità delle risorse idriche locali.
              </p>
            </div>
            <div className="bg-white/90 p-10 rounded-3xl shadow-xl animate-fade-in flex flex-col items-center">
              <div className="bg-nutella-green/10 p-5 rounded-full mb-6">
                <Cloud className="h-12 w-12 text-nutella-green" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-nutella-brown">Assorbimento CO₂</h3>
              <p className="text-gray-600 text-lg text-center">
                Ogni albero assorbe CO₂ dall'atmosfera, contribuendo attivamente 
                alla lotta contro il cambiamento climatico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works in Detail */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-extrabold text-nutella-brown mb-12 text-center drop-shadow">
              Come Funziona in Dettaglio
            </h2>
            <div className="space-y-12">
              {[1,2,3,4].map((step, idx) => (
                <div className="flex items-start" key={step}>
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-nutella-green flex items-center justify-center text-white font-bold text-2xl mr-6 shadow-lg border-2 border-nutella-gold">
                    {step}
                  </div>
                  <div>
                    {step === 1 && <><h3 className="text-2xl font-bold mb-2 text-nutella-brown">Acquista un Barattolo Nutella</h3><p className="text-lg text-gray-600">Ogni barattolo Nutella Forest contiene un codice unico all'interno della confezione. Questo codice è la chiave per piantare il tuo albero.</p></>}
                    {step === 2 && <><h3 className="text-2xl font-bold mb-2 text-nutella-brown">Registrati sulla Piattaforma</h3><p className="text-lg text-gray-600">Crea un account sulla piattaforma Nutella Forest inserendo le tue informazioni e il codice trovato nel barattolo.</p></>}
                    {step === 3 && <><h3 className="text-2xl font-bold mb-2 text-nutella-brown">Pianta il Tuo Albero</h3><p className="text-lg text-gray-600">Dagli un nome al tuo albero e scopri la sua posizione esatta nella foresta Nutella. Riceverai informazioni sulla specie e sul suo contributo all'ambiente.</p></>}
                    {step === 4 && <><h3 className="text-2xl font-bold mb-2 text-nutella-brown">Monitora la Crescita</h3><p className="text-lg text-gray-600">Segui lo sviluppo del tuo albero nel tempo attraverso la nostra piattaforma. Potrai vedere quanto CO₂ ha assorbito, quanta acqua ha conservato e altri dati ambientali.</p></>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-nutella-brown via-nutella-gold/80 to-nutella-green/80 text-white rounded-t-3xl shadow-2xl animate-fade-in">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-8 drop-shadow-lg">
            Unisciti a Noi in Questa Missione Verde
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto drop-shadow">
            Ogni albero conta. Ogni barattolo di Nutella può fare la differenza. Insieme, possiamo creare un futuro più sostenibile.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
