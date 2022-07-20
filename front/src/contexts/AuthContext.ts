import { AuthContextType } from 'interfaces/AuthContext.types';
import * as React from 'react';

export const AuthContext = React.createContext<AuthContextType>(null!);
