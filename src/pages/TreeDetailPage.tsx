import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { Loader2, ArrowLeft, TreeDeciduous } from 'lucide-react';
import Layout from '@/components/Layout';
import { Tree } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TreeDetailPage: React.FC = () => {
  const { treeId } = useParams<{ treeId: string }>();
  const { user } = useAuthStore();
  const { trees, fetchUserTrees, loading } = useTreeStore();
  const navigate = useNavigate();
  const [tree, setTree] = useState<Tree | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserTrees(user.id);
    }
  }, [user, fetchUserTrees]);

  useEffect(() => {
    if (trees.length > 0 && treeId) {
      const foundTree = trees.find(t => t.id === treeId);
      setTree(foundTree || null);
    }
  }, [trees, treeId]);

  // Get a random tree image based on the tree's ID
  const getTreeImage = (id: string) => {
    if (!tree) return '/placeholder.svg';
    const species = tree.species.toLowerCase();
    if (species.includes('quercia') || species.includes('oak') || species.includes('leccio')) return '/Quercia solitaria su sfondo grigio.png';
    if (species.includes('pino') || species.includes('pine') || species.includes('abete') || species.includes('fir')) return '/Albero di pino solitario.png';
    if (species.includes('acero') || species.includes('maple')) return '/Albero di acero in primo piano.png';
    if (species.includes('betulla') || species.includes('birch')) return '/Albero di betulla su sfondo bianco.png';
    if (species.includes('ciliegio') || species.includes('cherry')) return '/Ciliegi in Fiore contro lo Sfondo Neutro.png';
    if (species.includes('melo') || species.includes('apple')) return '/Albero di mele in fiore.png';
    if (species.includes('olivo') || species.includes('olive') || species.includes('ulivo')) return '/Albero di olivo solitario.png';
    if (species.includes('cipresso') || species.includes('cypress')) return '/Cipresso solitario su sfondo neutro.png';
    return '/placeholder.svg';
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento albero...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (!tree) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-nutella-brown hover:text-nutella-darkbrown"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla dashboard
            </Button>
          </div>
          <div className="text-center py-16 bg-nutella-beige/20 rounded-lg">
            <h3 className="text-xl font-semibold text-nutella-brown mb-2">Albero non trovato</h3>
            <p className="text-gray-600">
              L'albero che stai cercando non esiste o non è accessibile.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-nutella-brown hover:text-nutella-darkbrown text-lg font-bold px-6 py-3 rounded-full bg-nutella-beige/40 shadow-md border border-nutella-beige transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Torna alla dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="lg:col-span-1">
            <img
              src={getTreeImage(tree.id)}
              alt={`Foto di un albero di specie ${tree.species}`}
              className="h-72 w-full object-cover rounded-3xl mb-8 border-4 border-nutella-gold bg-white shadow-xl animate-fade-in"
              onError={e => (e.currentTarget.src = '/placeholder.svg')}
            />
            <Card className="bg-white/90 rounded-3xl shadow-xl animate-fade-in border-2 border-nutella-beige">
              <CardContent className="p-8">
                <h2 className="text-3xl font-extrabold text-nutella-brown mb-2 text-center">{tree.name}</h2>
                <p className="text-lg text-gray-600 mb-6 text-center">{tree.species}</p>
                <div className="space-y-5">
                  <div>
                    <p className="text-base text-gray-500">Data di piantumazione</p>
                    <p className="font-medium text-lg">{formatDate(tree.adoptedAt)}</p>
                  </div>
                  <div>
                    <p className="text-base text-gray-500">Codice</p>
                    <p className="font-medium text-lg">{tree.code}</p>
                  </div>
                  <div>
                    <p className="text-base text-gray-500">Posizione</p>
                    <p className="font-medium text-lg">{tree.location.country}</p>
                    <p className="text-base">Lat: {tree.location.latitude.toFixed(4)}, Long: {tree.location.longitude.toFixed(4)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-nutella-beige/60 via-white/80 to-nutella-gold/20 rounded-3xl shadow-2xl animate-fade-in border-2 border-nutella-beige">
              <CardContent className="p-10">
                <h3 className="text-3xl font-extrabold text-nutella-brown mb-8 text-center drop-shadow">Impatto ambientale</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
                  <div className="bg-nutella-green/10 p-8 rounded-2xl flex flex-col items-center shadow-md">
                    <p className="text-base text-gray-500 mb-1">CO₂ Assorbita</p>
                    <p className="text-3xl font-bold text-nutella-green mb-1">{tree.metrics.co2Absorbed} kg</p>
                    <p className="text-base text-gray-600">Equivalente a {(tree.metrics.co2Absorbed / 0.12).toFixed(1)} km di guida in auto non effettuati</p>
                  </div>
                  <div className="bg-nutella-green/10 p-8 rounded-2xl flex flex-col items-center shadow-md">
                    <p className="text-base text-gray-500 mb-1">Ossigeno Prodotto</p>
                    <p className="text-3xl font-bold text-nutella-green mb-1">{tree.metrics.oxygenProduced} kg</p>
                    <p className="text-base text-gray-600">Ossigeno per {(tree.metrics.oxygenProduced / 0.84).toFixed(1)} giorni di respirazione</p>
                  </div>
                  <div className="bg-nutella-green/10 p-8 rounded-2xl flex flex-col items-center shadow-md">
                    <p className="text-base text-gray-500 mb-1">Acqua Risparmiata</p>
                    <p className="text-3xl font-bold text-nutella-green mb-1">{tree.metrics.waterSaved} L</p>
                    <p className="text-base text-gray-600">Equivalente a {(tree.metrics.waterSaved / 1.5).toFixed(0)} bottiglie d'acqua</p>
                  </div>
                  <div className="bg-nutella-green/10 p-8 rounded-2xl flex flex-col items-center shadow-md">
                    <p className="text-base text-gray-500 mb-1">Habitat Creato</p>
                    <p className="text-3xl font-bold text-nutella-green mb-1">{tree.metrics.habitatCreated} m²</p>
                    <p className="text-base text-gray-600">Spazio vitale per piccoli organismi e insetti</p>
                  </div>
                </div>
                <div className="bg-nutella-beige/40 p-8 rounded-2xl shadow-inner animate-fade-in">
                  <h4 className="font-semibold text-nutella-brown mb-2">Lo sapevi che...</h4>
                  <p className="text-lg text-gray-700">
                    Un albero può assorbire fino a 22 kg di anidride carbonica all'anno e rilasciare 
                    ossigeno sufficiente per 2 persone. Piantando questo albero, contribuisci attivamente 
                    alla riduzione dell'impronta ecologica e alla protezione dell'ambiente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TreeDetailPage;
