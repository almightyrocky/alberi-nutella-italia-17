
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

// Mockup vuoto iniziale senza alberi predefiniti
const mockTrees: Tree[] = [];

// Lista di codici validi per l'adozione
const validCodes = [
  "NUTELLA2023", 
  "ALBERO2023", 
  "FORESTA2023", 
  "NATURA2023", 
  "VERDE2023",
  "PIANTA2023",
  "ECO2023",
  "VITA2023",
  "TERRA2023",
  "BOSCO2023",
  "NUTELLA2021" // Aggiunto il nuovo codice richiesto
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
      set({ trees: get().trees.filter(tree => tree.userId === userId), loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  adoptTree: async (code: string, name: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      // First validate the code
      const validationResult = await get().validateCode(code);
      
      if (!validationResult.valid) {
        toast.error("Codice non valido");
        set({ loading: false });
        return false;
      }

      if (validationResult.used) {
        toast.error("Questo codice è già stato utilizzato");
        set({ loading: false });
        return false;
      }

      // In a real app, we would call an API here to register the adoption
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Genera posizioni casuali in Italia
      const latitudeItaly = 41.9 + (Math.random() * 2 - 1);
      const longitudeItaly = 12.5 + (Math.random() * 2 - 1);

      const speciesOptions = ["Pino Mediterraneo", "Quercia", "Ulivo", "Leccio", "Abete"];
      const randomSpecies = validationResult.species || speciesOptions[Math.floor(Math.random() * speciesOptions.length)];
      
      const newTree: Tree = {
        id: `tree-${Date.now()}`,
        name,
        species: randomSpecies,
        location: {
          latitude: latitudeItaly,
          longitude: longitudeItaly,
          country: "Italia"
        },
        adoptedAt: new Date().toISOString(),
        code,
        userId,
        metrics: {
          co2Absorbed: Math.floor(Math.random() * 5),
          oxygenProduced: Math.floor(Math.random() * 3),
          waterSaved: Math.floor(Math.random() * 100),
          habitatCreated: Math.floor(Math.random() * 5)
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
      
      // Controlla se il codice è già stato utilizzato
      const isUsed = get().trees.some(tree => tree.code.toLowerCase() === code.toLowerCase());
      
      // Controlla se il codice è nella lista dei codici validi
      const isValid = validCodes.some(validCode => 
        validCode.toLowerCase() === code.toLowerCase()
      );
      
      if (isValid) {
        return {
          code,
          valid: true,
          used: isUsed,
          species: ["Pino Mediterraneo", "Quercia", "Ulivo"][Math.floor(Math.random() * 3)]
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
