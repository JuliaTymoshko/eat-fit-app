export interface User {
  id: string;
  authToken: string;
  userName: string;
  email: string;
  height: number;
  weight: number;
  charachteristics: Charachteristics;
}

export interface Charachteristics {
  chest: number;
  waist: number;
  hips: number;
}
