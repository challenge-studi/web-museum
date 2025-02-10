import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import User from '../models/UserInterface';

type ResponseApiLogin = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenJWT: string | undefined = undefined;
  private user: User | undefined = undefined;
  public connected$;

  constructor(private readonly http: HttpClient) {
    this.connected$ = new BehaviorSubject(false);
  }

  login(identifier: string, password: string): Observable<User> {
    const observable = this.http
      .post('/api/auth/local', {
        identifier: identifier,
        password: password,
      })
      .pipe(
        map((response) => {
          if (!this.isResponseApiValide(response))
            throw new Error('Format Invalid');

          const user: User = {
            firstname: response.user.firstname,
            lastname: response.user.lastname,
            email: response.user.email,
            birthday: response.user.birthday,
          };

          this.tokenJWT = response.jwt;
          this.user = user;
          this.connected$.next(true);

          return user;
        }),
      );

    return observable;
  }

  logout() {
    this.tokenJWT = undefined;
    this.user = undefined;
    localStorage.removeItem('jwt');
    this.connected$.next(false);
    console.log('tla?');
  }

  register(user: User, password: string): Observable<User> {
    const observable = this.http
      .post('/api/auth/local/register', {
        username: user.email,
        email: user.email,
        password: password,
        birthday: user.birthday,
        firstname: user.firstname,
        lastname: user.lastname,
      })
      .pipe(
        map((response) => {
          if (!this.isResponseApiValide(response))
            throw new Error('format invalid');

          const user: User = {
            firstname: response.user.firstname,
            lastname: response.user.lastname,
            email: response.user.email,
            birthday: response.user.birthday,
          };

          this.tokenJWT = response.jwt;
          this.user = user;
          this.connected$.next(true);

          return user;
        }),
      );

    return observable;
  }

  getTokenJwt() {
    return this.tokenJWT;
  }

  getUser() {
    return this.user;
  }

  loadUserFromApi() {
    if (!this.tokenJWT) throw new Error('Jeton JWT absent');
  }

  isResponseApiValide(dataApi: any): dataApi is ResponseApiLogin {
    // Vérification du type guard
    if ('jwt' in dataApi && typeof dataApi.jwt === 'string') {
      return true;
    } else return false;
  }
  saveToken() {
    if (this.tokenJWT) {
      localStorage.setItem('jwt', this.tokenJWT);
    }
  }

  loadToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.tokenJWT = token;
      this.connected$.next(true);
    }
  }

  changePassword(
    currentPassword: string,
    newPassword: string,
    passwordConfirmation: string,
  ): Observable<User> {
    if (!this.tokenJWT) {
      throw new Error('Utilisateur non authentifié');
    }

    return this.http
      .post('/api/auth/change-password', {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: passwordConfirmation,
      })
      .pipe(
        map((response: any) => {
          if (!this.isResponseApiValide(response)) {
            throw new Error('Format de réponse invalide');
          }

          // Met à jour l'utilisateur et le token JWT si nécessaire
          const user: User = {
            firstname: response.user.firstname,
            lastname: response.user.lastname,
            email: response.user.email,
            birthday: response.user.birthday,
          };

          this.tokenJWT = response.jwt;
          this.user = user;
          this.connected$.next(true);
          this.saveToken(); // Sauvegarder le nouveau token JWT dans le localStorage

          return user;
        }),
      );
  }
}
