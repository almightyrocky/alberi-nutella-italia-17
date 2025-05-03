
import { create } from 'zustand';
import { Tree, TreeCode } from '@/types';
import { toast } from 'sonner';

interface TreeState {
  trees: Tree[];
  loading: boolean;
  error: string | null;
  
  fetchUserTrees: (userId: string) => Promise<void>;
  adoptTree: (code: string, name: string, userId: string) => Promise<boolean>;
  validateCode: (code: string) => Promise<TreeCode>;
}

// Mock data for development
const mockTrees: Tree[] = [
  {
    id: "tree-1",
    name: "Il Guardiano",
    species: "Quercia",
    location: {
      latitude: 41.9028,
      longitude: 12.4964,
      country: "Italia"
    },
    adoptedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    code: "NUTELLA123",
    userId: "1",
    metrics: {
      co2Absorbed: 25,
      oxygenProduced: 15,
      waterSaved: 450,
      habitatCreated: 12
    }
  }
];

export const useTreeStore = create<TreeState>((set, get) => ({
  trees: [],
  loading: false,
  error: null,

  fetchUserTrees: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, we would call an API here
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({ trees: mockTrees, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  adoptTree: async (code: string, name: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      // First validate the code
      const validationResult = await get().validateCode(code);
      
      if (!validationResult.valid || validationResult.used) {
        toast.error(validationResult.used ? "Questo codice è già stato utilizzato" : "Codice non valido");
        set({ loading: false });
        return false;
      }

      // In a real app, we would call an API here to register the adoption
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newTree: Tree = {
        id: `tree-${Date.now()}`,
        name,
        species: "Pino Mediterraneo",
        location: {
          latitude: 43.7696,
          longitude: 11.2558,
          country: "Italia"
        },
        adoptedAt: new Date().toISOString(),
        code,
        userId,
        metrics: {
          co2Absorbed: 0,
          oxygenProduced: 0,
          waterSaved: 0,
          habitatCreated: 0
        }
      };

      set(state => ({ 
        trees: [...state.trees, newTree],
        loading: false 
      }));
      
      toast.success("Albero adottato con successo!");
      return true;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      toast.error("Errore durante l'adozione dell'albero");
      return false;
    }
  },

  validateCode: async (code: string): Promise<TreeCode> => {
    try {
      // In a real app, we would call an API here
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // For demo purposes, only specific codes are valid
      if (code === "NUTELLA2023" || code === "ALBERO2023") {
        return {
          code,
          valid: true,
          used: false,
          species: "Pino Mediterraneo"
        };
      } else if (code === "NUTELLA123") {
        return {
          code,
          valid: true,
          used: true,
          treeId: "tree-1",
          species: "Quercia"
        };
      }
      
      return {
        code,
        valid: false,
        used: false
      };
    } catch (error) {
      console.error("Error validating code:", error);
      throw error;
    }
  }
}));
