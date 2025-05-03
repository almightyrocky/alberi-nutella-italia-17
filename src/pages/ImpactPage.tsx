
import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Tree } from '@/types';

const ImpactPage: React.FC = () => {
  const { user } = useAuthStore();
  const { trees, fetchUserTrees, loading } = useTreeStore();

  useEffect(() => {
    if (user) {
      fetchUserTrees(user.id);
    }
  }, [user, fetchUserTrees]);

  // Calculate total metrics
  const calculateTotals = () => {
    return trees.reduce((acc, tree) => {
      return {
        co2Absorbed: acc.co2Absorbed + tree.metrics.co2Absorbed,
        oxygenProduced: acc.oxygenProduced + tree.metrics.oxygenProduced,
        waterSaved: acc.waterSaved + tree.metrics.waterSaved,
        habitatCreated: acc.habitatCreated + tree.metrics.habitatCreated
      };
    }, {
      co2Absorbed: 0,
      oxygenProduced: 0,
      waterSaved: 0,
      habitatCreated: 0
    });
  };

  const totals = calculateTotals();

  // Impact comparisons
  const getImpactComparisons = () => {
    const kmDriving = (totals.co2Absorbed / 0.12).toFixed(1); // Average car emits ~120g per km
    const daysBreathing = (totals.oxygenProduced / 0.84).toFixed(1); // Average person consumes ~0.84kg oxygen per day
    const bottlesWater = (totals.waterSaved / 1.5).toFixed(0); // 1.5L water bottles
    
    return { kmDriving, daysBreathing, bottlesWater };
  };

  const comparisons = getImpactComparisons();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-2">
            Il tuo Impatto Ambientale
          </h1>
          <p className="text-gray-600">
            Scopri come i tuoi alberi stanno contribuendo alla salute del pianeta.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento dati...</span>
          </div>
        ) : trees.length === 0 ? (
          <div className="text-center py-16 bg-nutella-beige/20 rounded-lg">
            <h3 className="text-xl font-semibold text-nutella-brown mb-2">Nessun dato disponibile</h3>
            <p className="text-gray-600">
              Adotta il tuo primo albero per iniziare a vedere il tuo impatto ambientale.
            </p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard 
                title="CO₂ Assorbita" 
                value={`${totals.co2Absorbed} kg`} 
                description="Anidride carbonica rimossa dall'atmosfera"
                color="bg-nutella-green"
              />
              <MetricCard 
                title="Ossigeno Prodotto" 
                value={`${totals.oxygenProduced} kg`} 
                description="Ossigeno rilasciato nell'atmosfera"
                color="bg-nutella-darkgreen"
              />
              <MetricCard 
                title="Acqua Risparmiata" 
                value={`${totals.waterSaved} l`} 
                description="Litri di acqua risparmiati grazie agli alberi"
                color="bg-blue-500"
              />
              <MetricCard 
                title="Habitat Creato" 
                value={`${totals.habitatCreated} m²`} 
                description="Area di habitat naturale creata"
                color="bg-nutella-brown"
              />
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Equivalente a</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-nutella-brown">{comparisons.kmDriving} km</p>
                  <p className="text-gray-600 text-sm">di guida in auto non effettuati</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ossigeno per</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-nutella-brown">{comparisons.daysBreathing} giorni</p>
                  <p className="text-gray-600 text-sm">di respirazione per una persona</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pari a</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-nutella-brown">{comparisons.bottlesWater} bottiglie</p>
                  <p className="text-gray-600 text-sm">d'acqua da 1,5 litri risparmiate</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-nutella-beige/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-nutella-brown mb-3">Il tuo contributo per l'ambiente</h3>
              <p className="text-gray-700 mb-4">
                Grazie ai tuoi {trees.length} alberi adottati, stai contribuendo attivamente alla lotta contro il cambiamento climatico 
                e alla conservazione degli ecosistemi naturali. Ogni albero che adotti assorbe CO₂, produce ossigeno, aiuta 
                a risparmiare acqua e crea habitat per diverse specie.
              </p>
              <p className="text-gray-700">
                Continua ad adottare alberi e monitora il tuo impatto crescere nel tempo. Insieme possiamo fare la differenza 
                per il nostro pianeta, un albero alla volta!
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, color }) => {
  return (
    <Card>
      <div className={`h-2 ${color} rounded-t-md`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-nutella-brown">{value}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ImpactPage;
