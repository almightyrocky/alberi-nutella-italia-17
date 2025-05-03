
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  trees: Tree[];
}

export interface Tree {
  id: string;
  name: string;
  species: string;
  location: {
    latitude: number;
    longitude: number;
    country: string;
  };
  adoptedAt: string;
  code: string;
  userId: string;
  metrics: TreeMetrics;
}

export interface TreeMetrics {
  co2Absorbed: number; // in kg
  oxygenProduced: number; // in kg
  waterSaved: number; // in liters
  habitatCreated: number; // in m²
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  unlockedAt?: string;
  requirement: {
    type: 'trees' | 'days' | 'species';
    count: number;
  };
}

export interface TreeCode {
  code: string;
  valid: boolean;
  used: boolean;
  treeId?: string;
  species?: string;
}
