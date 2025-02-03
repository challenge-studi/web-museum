import { Injectable } from '@angular/core';
import User from '../models/UserInterface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

type ResponseApiLogin = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    birtday: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenJWT: string | undefined = undefined;
  private user: User | undefined = undefined;

  constructor(private readonly http: HttpClient) {}

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
            birthday: response.user.birtday,
          };

          this.tokenJWT = response.jwt;
          this.user = user;

          return user;
        }),
      );

    return observable;
  }

  logout() {
    this.tokenJWT = undefined;
    this.user = undefined;

    //TODO suppresion du localStorage ou du cookie et crée et mise a jour de observable User
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
            birthday: response.user.birtday,
          };

          this.tokenJWT = response.jwt;
          this.user = user;

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
    //TODO: implémenter la méthode pour récuperer user depuis API si token déja valide. /users/me
    if (!this.tokenJWT) throw new Error('Jeton JWT absent');
  }

  isResponseApiValide(dataApi: any): dataApi is ResponseApiLogin {
    // Vérification du type guard
    if ('jwt' in dataApi && typeof dataApi.jwt === 'string') {
      return true;
    } else return false;
  }
}
