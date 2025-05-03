
import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { MapPin, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';

const MapPage: React.FC = () => {
  const { user } = useAuthStore();
  const { trees, fetchUserTrees, loading } = useTreeStore();

  useEffect(() => {
    if (user) {
      fetchUserTrees(user.id);
    }
  }, [user, fetchUserTrees]);

  // In a real app, this would be a MapLibre GL JS implementation
  // For this demo, we'll create a simple placeholder map

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-2">
            Mappa della Foresta
          </h1>
          <p className="text-gray-600">
            Visualizza la posizione dei tuoi alberi e scopri gli altri alberi adottati nella foresta Nutella.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento mappa...</span>
          </div>
        ) : (
          <div className="bg-nutella-beige/20 rounded-lg overflow-hidden">
            <div className="w-full h-[70vh] relative bg-gray-200 flex flex-col items-center justify-center">
              {/* Placeholder Map */}
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-white p-2 rounded-md shadow-md">
                    <MapPin className="h-5 w-5 text-nutella-green" />
                  </button>
                </div>
                
                {/* Tree Markers */}
                {trees.map((tree) => (
                  <div
                    key={tree.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(tree.location.longitude + 180) / 360 * 100}%`,
                      top: `${(90 - tree.location.latitude) / 180 * 100}%`
                    }}
                  >
                    <div className="bg-nutella-green text-white p-2 rounded-full shadow-lg flex items-center justify-center h-10 w-10 hover:scale-110 transition-transform cursor-pointer">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="mt-2 bg-white text-nutella-brown px-2 py-1 rounded text-xs font-medium shadow-md">
                      {tree.name}
                    </div>
                  </div>
                ))}
                
                {/* Map Attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                  © Nutella Forest Italia
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
                <h3 className="font-medium text-sm mb-2">Legenda</h3>
                <div className="flex items-center text-xs mb-1">
                  <div className="bg-nutella-green h-3 w-3 rounded-full mr-2"></div>
                  <span>I tuoi alberi</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="bg-gray-400 h-3 w-3 rounded-full mr-2"></div>
                  <span>Altri alberi</span>
                </div>
              </div>
            </div>
            <div className="p-4 text-center text-nutella-brown text-sm">
              <strong>Nota:</strong> Questa è una mappa dimostrativa. In una versione definitiva, qui vedresti una mappa interattiva con MapLibre GL JS.
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MapPage;
