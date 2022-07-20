import { User } from './User.types';

export interface AuthContextType {
  // це змінна у яку запишемо відповідь з бекенду про юзера
  user: User | null;
  signin: (token: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
