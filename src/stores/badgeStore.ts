import { create } from 'zustand';
import { Badge, Tree } from '@/types';
import { toast } from 'sonner';

interface BadgeState {
  badges: Badge[];
  unlockedBadges: Badge[];
  loading: boolean;
  error: string | null;
  
  fetchBadges: () => Promise<void>;
  checkBadgeUnlocks: (trees: Tree[]) => Promise<void>;
}

// Mock badges for development
const mockBadges: Badge[] = [
  {
    id: "badge-1",
    name: "Primo Albero",
    description: "Hai piantato il tuo primo albero!",
    image: "/badges/first-tree.svg",
    requirement: { type: "trees", count: 1 }
  },
  {
    id: "badge-2",
    name: "Amante della Natura",
    description: "Hai piantato 5 alberi!",
    image: "/badges/forest-guardian.svg",
    requirement: { type: "trees", count: 5 }
  },
  {
    id: "badge-3",
    name: "Guardiano della Foresta",
    description: "Hai piantato 10 alberi!",
    image: "/badges/planet-protector.svg",
    requirement: { type: "trees", count: 10 }
  },
  {
    id: "badge-4",
    name: "Eroe della Foresta",
    description: "Hai piantato 20 alberi!",
    image: "/badges/earth-hero.svg",
    requirement: { type: "trees", count: 20 }
  }
];

export const useBadgeStore = create<BadgeState>((set, get) => ({
  badges: [],
  unlockedBadges: [],
  loading: false,
  error: null,

  fetchBadges: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, we would call an API here
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      set({ 
        badges: mockBadges,
        loading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  checkBadgeUnlocks: async (trees: Tree[]) => {
    const { badges } = get();
    
    if (badges.length === 0) {
      await get().fetchBadges();
    }
    
    const treeCount = trees.length;
    
    // Check which badges should be unlocked
    const unlocked = get().badges.filter(badge => {
      if (badge.requirement.type === 'trees') {
        return treeCount >= badge.requirement.count;
      }
      return false;
    });
    
    // Find newly unlocked badges (not in unlockedBadges yet)
    const currentlyUnlocked = get().unlockedBadges.map(b => b.id);
    const newlyUnlocked = unlocked.filter(
      badge => !currentlyUnlocked.includes(badge.id)
    );
    
    // If there are new badges, show notifications
    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(badge => {
        toast.success(`Nuovo badge sbloccato: ${badge.name}!`, {
          description: badge.description,
          duration: 5000
        });
      });
    }
    
    // Update the unlocked badges with timestamps
    const unlockedWithTimestamps = unlocked.map(badge => ({
      ...badge,
      unlockedAt: get().unlockedBadges.find(b => b.id === badge.id)?.unlockedAt || new Date().toISOString()
    }));
    
    set({ unlockedBadges: unlockedWithTimestamps });
  }
}));
