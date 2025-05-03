
import { create } from 'zustand';
import { User } from '@/types';
import { toast } from 'sonner';

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
};

// Mock data for development
const mockUser: User = {
  id: '1',
  email: 'utente@esempio.it',
  name: 'Mario Rossi',
  createdAt: new Date().toISOString(),
  trees: []
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, we would call an API here
      // For now, simulate a network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ user: mockUser, isAuthenticated: true, loading: false });
      toast.success("Accesso effettuato con successo!");
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      toast.error("Errore durante l'accesso");
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, we would call an API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ 
        user: { ...mockUser, email, name },
        isAuthenticated: true, 
        loading: false 
      });
      toast.success("Registrazione completata con successo!");
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      toast.error("Errore durante la registrazione");
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    toast.info("Hai effettuato il logout");
  },

  resetPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, we would call an API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false });
      toast.success("Email di reset password inviata!");
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      toast.error("Errore durante l'invio dell'email");
    }
  }
}));
