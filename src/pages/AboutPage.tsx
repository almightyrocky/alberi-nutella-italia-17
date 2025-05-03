
import React from 'react';
import Layout from '@/components/Layout';
import { TreeDeciduous, Leaf, Cloud, Globe, Droplets } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-nutella-beige/30 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-nutella-brown mb-6">
              La Missione <span className="text-nutella-red">Nutella</span> Forest
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Un impegno concreto per il nostro pianeta, un albero alla volta.
              Scopri come Nutella sta contribuendo a rendere il mondo più verde e sostenibile.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-nutella-brown mb-6">
                La Nostra Storia
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nutella Forest è nato dall'idea di unire la gioia di gustare Nutella con un impatto positivo sul pianeta.
                Nel 2024, abbiamo lanciato questa iniziativa con l'obiettivo di piantare 1 milione di alberi entro il 2030.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ogni barattolo di Nutella contiene un codice unico che ti permette di adottare un albero reale.
                Questi alberi vengono piantati in aree strategiche del nostro paese, contribuendo alla riforestazione
                e alla creazione di habitat naturali.
              </p>
            </div>
            <div className="relative">
              <div className="bg-nutella-green/10 rounded-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <TreeDeciduous className="h-12 w-12 text-nutella-green mb-4" />
                    <span className="text-3xl font-bold text-nutella-brown">120.000+</span>
                    <span className="text-sm text-gray-600">Alberi piantati</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Leaf className="h-12 w-12 text-nutella-green mb-4" />
                    <span className="text-3xl font-bold text-nutella-brown">25+</span>
                    <span className="text-sm text-gray-600">Specie diverse</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Globe className="h-12 w-12 text-nutella-green mb-4" />
                    <span className="text-3xl font-bold text-nutella-brown">15+</span>
                    <span className="text-sm text-gray-600">Regioni coinvolte</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Cloud className="h-12 w-12 text-nutella-green mb-4" />
                    <span className="text-3xl font-bold text-nutella-brown">480+</span>
                    <span className="text-sm text-gray-600">Tonnellate CO₂ assorbite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-16 bg-nutella-beige/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-nutella-brown mb-12 text-center">
            Il Nostro Impatto Ambientale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="bg-nutella-green/10 p-3 rounded-full mr-4">
                  <TreeDeciduous className="h-10 w-10 text-nutella-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-nutella-brown">Riforestazione</h3>
                  <p className="text-gray-600">
                    Ripristiniamo aree deforestate con specie locali per garantire 
                    la biodiversità e proteggere gli ecosistemi naturali.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="bg-nutella-green/10 p-3 rounded-full mr-4">
                  <Droplets className="h-10 w-10 text-nutella-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-nutella-brown">Conservazione dell'acqua</h3>
                  <p className="text-gray-600">
                    I nostri alberi aiutano a trattenere l'acqua nel suolo e a prevenire 
                    l'erosione, migliorando la qualità delle risorse idriche locali.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="bg-nutella-green/10 p-3 rounded-full mr-4">
                  <Cloud className="h-10 w-10 text-nutella-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-nutella-brown">Assorbimento CO₂</h3>
                  <p className="text-gray-600">
                    Ogni albero assorbe CO₂ dall'atmosfera, contribuendo attivamente 
                    alla lotta contro il cambiamento climatico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works in Detail */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-nutella-brown mb-8 text-center">
              Come Funziona in Dettaglio
            </h2>
            <div className="space-y-12">
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nutella-green flex items-center justify-center text-white font-bold mr-6">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-nutella-brown">Acquista un Barattolo Nutella</h3>
                  <p className="text-gray-600">
                    Ogni barattolo Nutella Forest contiene un codice unico all'interno della confezione. 
                    Questo codice è la chiave per adottare il tuo albero.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nutella-green flex items-center justify-center text-white font-bold mr-6">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-nutella-brown">Registrati sulla Piattaforma</h3>
                  <p className="text-gray-600">
                    Crea un account sulla piattaforma Nutella Forest inserendo le tue informazioni 
                    e il codice trovato nel barattolo.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nutella-green flex items-center justify-center text-white font-bold mr-6">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-nutella-brown">Adotta il Tuo Albero</h3>
                  <p className="text-gray-600">
                    Dagli un nome al tuo albero e scopri la sua posizione esatta nella foresta Nutella. 
                    Riceverai informazioni sulla specie e sul suo contributo all'ambiente.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nutella-green flex items-center justify-center text-white font-bold mr-6">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-nutella-brown">Monitora la Crescita</h3>
                  <p className="text-gray-600">
                    Segui lo sviluppo del tuo albero nel tempo attraverso la nostra piattaforma. 
                    Potrai vedere quanto CO₂ ha assorbito, quanta acqua ha conservato e altri dati ambientali.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-nutella-brown text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Unisciti a Noi in Questa Missione Verde
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ogni albero conta. Ogni barattolo di Nutella può fare la differenza. 
            Insieme, possiamo creare un futuro più sostenibile.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
