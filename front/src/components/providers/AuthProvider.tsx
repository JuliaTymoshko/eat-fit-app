import * as React from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { UserDataService } from 'service/UserDataService';
import { User } from 'interfaces/User.types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    let initToken: string | undefined = UserDataService.getAuthToken();

    if (initToken) {
      signin(initToken);
    }
  }, []);

  const signin = (authToken: string, callback?: VoidFunction) => {
    return UserDataService.signin(authToken, (user: User) => {
      setUser(user);

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  const signout = (callback?: VoidFunction) => {
    return UserDataService.signout(() => {
      setUser(null);

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
