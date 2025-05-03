
import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { Loader2, Lock, Check, Trophy, Gift } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Badge } from "@/components/ui/badge";

const BadgesPage: React.FC = () => {
  const { user } = useAuthStore();
  const { trees, fetchUserTrees } = useTreeStore();
  const { badges, unlockedBadges, fetchBadges, checkBadgeUnlocks, loading } = useBadgeStore();

  useEffect(() => {
    if (user) {
      fetchUserTrees(user.id);
      fetchBadges();
    }
  }, [user, fetchUserTrees, fetchBadges]);

  useEffect(() => {
    if (trees.length > 0) {
      checkBadgeUnlocks(trees);
    }
  }, [trees, checkBadgeUnlocks]);

  const isUnlocked = (badgeId: string) => {
    return unlockedBadges.some(badge => badge.id === badgeId);
  };

  const getUnlockDate = (badgeId: string) => {
    const badge = unlockedBadges.find(badge => badge.id === badgeId);
    return badge?.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString('it-IT') : null;
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-2">
            I Tuoi Obiettivi
          </h1>
          <p className="text-gray-600">
            Adotta alberi e sblocca badge speciali o premi esclusivi per il tuo contributo alla riforestazione.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento obiettivi...</span>
          </div>
        ) : badges.length === 0 ? (
          <div className="text-center py-16 bg-nutella-beige/20 rounded-lg">
            <h3 className="text-xl font-semibold text-nutella-brown mb-2">Caricamento obiettivi</h3>
            <p className="text-gray-600">
              Stiamo preparando i tuoi obiettivi...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 p-6 bg-gradient-to-br from-nutella-beige/30 to-nutella-beige/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-nutella-brown mb-2">Il tuo progresso</h2>
                  <p className="text-gray-600">Hai adottato {trees.length} alberi finora</p>
                </div>
                <div className="text-right">
                  <Badge 
                    className={trees.length >= 20 ? "bg-nutella-green" : "bg-gray-300"} 
                    variant="default"
                  >
                    {trees.length >= 20 ? "Premio sbloccato!" : `${trees.length}/20 per il premio speciale`}
                  </Badge>
                </div>
              </div>
              
              {trees.length >= 20 && (
                <div className="mt-6 p-4 bg-nutella-beige/40 rounded-lg flex items-center">
                  <Gift className="h-8 w-8 text-nutella-red mr-3" />
                  <div>
                    <h3 className="font-semibold text-nutella-brown">Premio Speciale Sbloccato!</h3>
                    <p className="text-gray-600">Hai raggiunto 20 alberi! Contatta il servizio clienti Nutella per ricevere il tuo premio esclusivo.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => {
                const unlocked = isUnlocked(badge.id);
                return (
                  <Card 
                    key={badge.id} 
                    className={`overflow-hidden transition-all duration-300 ${unlocked ? 'border-nutella-green shadow-md' : 'border-gray-200 opacity-75'}`}
                  >
                    <div className={`h-2 ${unlocked ? 'bg-nutella-green' : 'bg-gray-300'} rounded-t-md`}></div>
                    <CardHeader className="relative">
                      <div className="absolute top-4 right-4">
                        {unlocked ? (
                          <div className="bg-nutella-green text-white rounded-full p-1">
                            <Check className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="bg-gray-300 text-white rounded-full p-1">
                            <Lock className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="flex items-center">
                        {badge.name}
                        {badge.id === "badge-4" && <Trophy className="h-5 w-5 ml-2 text-nutella-red" />}
                      </CardTitle>
                      <CardDescription>
                        {badge.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className={`relative w-24 h-24 rounded-full mb-4 flex items-center justify-center ${unlocked ? 'bg-nutella-green/20' : 'bg-gray-200'}`}>
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-nutella-green to-nutella-darkgreen flex items-center justify-center">
                          {/* Badge icon */}
                          <span className="text-4xl text-white">🌳</span>
                        </div>
                      </div>
                      
                      <div className="w-full mt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">Progresso:</span>
                          <span className="text-sm font-medium text-gray-600">
                            {Math.min(trees.length, badge.requirement.count)}/{badge.requirement.count} alberi
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-nutella-green h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(Math.min(trees.length, badge.requirement.count) / badge.requirement.count) * 100}%` }} 
                          ></div>
                        </div>
                      </div>
                      
                      {unlocked && (
                        <p className="text-sm text-nutella-green mt-4">
                          Sbloccato il {getUnlockDate(badge.id)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BadgesPage;
