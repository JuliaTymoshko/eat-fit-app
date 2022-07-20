import { User } from './../interfaces/User.types';
import Cookies from 'js-cookie';
import axios, { AxiosResponse } from 'axios';

const UserDataService = {
  isAuthenticated: false,
  lsAuthToken: 'authToken',
  cAuthToken: 'AuthToken',

  getAuthToken(): string | undefined {
    return Cookies.get(UserDataService.cAuthToken);
  },

  signin(token: string, callback?: (user: User) => void) {
    UserDataService.isAuthenticated = true;

    Cookies.set(UserDataService.cAuthToken, token, { expires: 90 });
    localStorage.setItem(UserDataService.lsAuthToken, token);

    axios
      .get('https://eat-fit-app.herokuapp.com/api/users', {
        headers: {
          Authorization: token,
        },
      })
      .then((response: AxiosResponse) => {
        let userData = response.data.user;

        let user: User = {
          id: userData.id,
          userName: userData.userName,
          email: userData.email,
          height: userData.height,
          weight: userData.weight,
          authToken: '',
          charachteristics: {
            chest: userData.charachteristics.chest,
            hips: userData.charachteristics.hips,
            waist: userData.charachteristics.waist,
          },
        };

        if (typeof callback === 'function') {
          callback(user);
        }
      });
  },

  signout(callback: VoidFunction) {
    UserDataService.isAuthenticated = false;

    Cookies.remove(UserDataService.cAuthToken, { path: '' });
    localStorage.removeItem(UserDataService.lsAuthToken);

    if (typeof callback === 'function') {
      callback();
    }
  },
};

export { UserDataService };
