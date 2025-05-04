import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { Loader2, Lock, Check, Trophy, Award, Leaf, TreeDeciduous } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Badge } from "@/components/ui/badge";
import clsx from 'clsx';

const badgeIcons: { [key: string]: React.ReactNode } = {
  'badge-1': <Award className="w-16 h-16 text-yellow-500 drop-shadow-md" />,
  'badge-2': <Leaf className="w-16 h-16 text-green-600 drop-shadow-md" />,
  'badge-3': <TreeDeciduous className="w-16 h-16 text-nutella-green drop-shadow-md" />,
  'badge-4': <Trophy className="w-16 h-16 text-nutella-red drop-shadow-md" />,
};

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

  // Trova il badge sbloccato più recente
  const latestUnlocked = unlockedBadges.length > 0 ? unlockedBadges.reduce((a, b) => (a.unlockedAt > b.unlockedAt ? a : b)) : null;
  // Trova il prossimo badge da sbloccare
  const nextBadge = badges.find(b => !isUnlocked(b.id));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nutella-beige/70 via-white/80 to-nutella-gold/20 py-20 md:py-32 rounded-b-3xl shadow-2xl animate-fade-in">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-nutella-brown mb-8 drop-shadow-xl">
              I Tuoi Obiettivi <span role='img' aria-label='piantina'>🌱</span>
            </h1>
            <p className="text-2xl text-nutella-brown/80 font-medium max-w-2xl mx-auto mb-4">
              Pianta alberi, sblocca badge esclusivi e diventa un eroe della Nutella Forest! Ogni traguardo raggiunto è un passo verso un pianeta più verde.
            </p>
          </div>
        </div>
      </section>
      <div className="container mx-auto py-16 px-4">
        <div className="w-full max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium text-nutella-brown">Progresso totale</span>
            <span className="text-lg font-medium text-nutella-green">{trees.length} alberi</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
            <div className="bg-gradient-to-r from-nutella-green to-green-400 h-5 rounded-full transition-all duration-700" style={{ width: `${Math.min((trees.length / 20) * 100, 100)}%` }}></div>
          </div>
          {nextBadge && (
            <div className="mt-2 text-base text-gray-600">
              Prossimo obiettivo: <span className="font-semibold text-nutella-brown">{nextBadge.name}</span> ({nextBadge.requirement.count} alberi)
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento obiettivi...</span>
          </div>
        ) : badges.length === 0 ? (
          <div className="text-center py-16 bg-nutella-beige/20 rounded-3xl shadow-md animate-fade-in">
            <h3 className="text-2xl font-semibold text-nutella-brown mb-2">Caricamento obiettivi</h3>
            <p className="text-lg text-gray-600">
              Stiamo preparando i tuoi obiettivi...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-14 justify-items-center mt-12">
              {badges.map((badge) => {
                const unlocked = isUnlocked(badge.id);
                const isLatest = latestUnlocked && badge.id === latestUnlocked.id;
                return (
                  <Card 
                    key={badge.id} 
                    className={clsx(
                      "relative overflow-hidden transition-all duration-300 border-2 rounded-3xl shadow-xl group flex flex-col items-center w-full max-w-xs min-h-[400px] bg-white/90 animate-fade-in",
                      unlocked ? 'border-nutella-gold shadow-2xl' : 'border-gray-200 bg-nutella-beige/20 opacity-80',
                      isLatest ? 'ring-4 ring-nutella-gold/60 animate-pulse-slow' : ''
                    )}
                    style={{ boxShadow: unlocked ? '0 0 32px 0 rgba(229,161,0,0.15), 0 4px 24px 0 rgba(0,0,0,0.08)' : undefined }}
                  >
                    {isLatest && (
                      <span className="absolute top-3 left-3 bg-nutella-gold text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-bounce">Nuovo!</span>
                    )}
                    <div className={clsx("h-2 w-full", unlocked ? 'bg-gradient-to-r from-nutella-gold to-nutella-green' : 'bg-gray-200', "rounded-t-3xl")}></div>
                    <CardHeader className="relative pb-2 w-full flex flex-col items-center">
                      <div className="absolute top-4 right-4">
                        {unlocked ? (
                          <div className="bg-nutella-gold text-white rounded-full p-1 animate-bounce">
                            <Check className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="bg-gray-300 text-white rounded-full p-1">
                            <Lock className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="flex items-center gap-2 text-2xl font-bold text-center text-nutella-brown">
                        {badge.name}
                        {badge.id === "badge-4" && <Trophy className="h-5 w-5 ml-2 text-nutella-gold" />}
                      </CardTitle>
                      <CardDescription className="text-lg text-gray-700 text-center">
                        {badge.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center flex-1 justify-center">
                      <div className={clsx(
                        "relative w-36 h-36 rounded-full mb-6 flex items-center justify-center border-4 transition-all duration-300 bg-white",
                        unlocked ? 'border-nutella-gold shadow-lg animate-bounce-in' : 'border-gray-200 bg-gray-100 opacity-70'
                      )}>
                        <div className={clsx("absolute inset-0 flex items-center justify-center w-full h-full", unlocked ? '' : 'grayscale opacity-60')}
                        >
                          {badgeIcons[badge.id] || <Award className="w-20 h-20 text-gray-400" />}
                        </div>
                      </div>
                      <div className="w-full mt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-lg font-medium text-gray-600">Progresso:</span>
                          <span className="text-lg font-medium text-gray-600">
                            {Math.min(trees.length, badge.requirement.count)}/{badge.requirement.count} alberi
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                          <div 
                            className={clsx("h-5 rounded-full transition-all duration-700", unlocked ? 'bg-gradient-to-r from-nutella-gold to-nutella-green' : 'bg-nutella-green/40')}
                            style={{ width: `${(Math.min(trees.length, badge.requirement.count) / badge.requirement.count) * 100}%` }} 
                          ></div>
                        </div>
                      </div>
                      {unlocked && (
                        <p className="text-lg text-nutella-gold mt-4 animate-fade-in text-center font-semibold">
                          Sbloccato il {getUnlockDate(badge.id)}<br/>
                          <span className="text-base text-gray-500">Continua così, eroe della foresta!</span>
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
