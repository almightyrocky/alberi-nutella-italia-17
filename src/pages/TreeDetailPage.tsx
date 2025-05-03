
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-nutella-green to-nutella-darkgreen p-8 rounded-lg flex items-center justify-center mb-6">
              <TreeDeciduous className="h-32 w-32 text-white" />
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-nutella-brown mb-2">{tree.name}</h2>
                <p className="text-gray-600 mb-4">{tree.species}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Data di adozione</p>
                    <p className="font-medium">{formatDate(tree.adoptedAt)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Codice</p>
                    <p className="font-medium">{tree.code}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Posizione</p>
                    <p className="font-medium">{tree.location.country}</p>
                    <p className="text-sm">Lat: {tree.location.latitude.toFixed(4)}, Long: {tree.location.longitude.toFixed(4)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-nutella-brown mb-4">Impatto ambientale</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-nutella-green/10 p-4 rounded-md">
                    <p className="text-sm text-gray-500">CO₂ Assorbita</p>
                    <p className="text-2xl font-bold text-nutella-green">{tree.metrics.co2Absorbed} kg</p>
                    <p className="text-sm text-gray-600">Equivalente a {(tree.metrics.co2Absorbed / 0.12).toFixed(1)} km di guida in auto non effettuati</p>
                  </div>
                  
                  <div className="bg-nutella-green/10 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Ossigeno Prodotto</p>
                    <p className="text-2xl font-bold text-nutella-green">{tree.metrics.oxygenProduced} kg</p>
                    <p className="text-sm text-gray-600">Ossigeno per {(tree.metrics.oxygenProduced / 0.84).toFixed(1)} giorni di respirazione</p>
                  </div>
                  
                  <div className="bg-nutella-green/10 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Acqua Risparmiata</p>
                    <p className="text-2xl font-bold text-nutella-green">{tree.metrics.waterSaved} L</p>
                    <p className="text-sm text-gray-600">Equivalente a {(tree.metrics.waterSaved / 1.5).toFixed(0)} bottiglie d'acqua</p>
                  </div>
                  
                  <div className="bg-nutella-green/10 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Habitat Creato</p>
                    <p className="text-2xl font-bold text-nutella-green">{tree.metrics.habitatCreated} m²</p>
                    <p className="text-sm text-gray-600">Spazio vitale per piccoli organismi e insetti</p>
                  </div>
                </div>
                
                <div className="bg-nutella-beige/30 p-4 rounded-md">
                  <h4 className="font-medium text-nutella-brown mb-2">Lo sapevi che...</h4>
                  <p className="text-gray-600">
                    Un albero può assorbire fino a 22 kg di anidride carbonica all'anno e rilasciare 
                    ossigeno sufficiente per 2 persone. Adottando questo albero, contribuisci attivamente 
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
