import { Injectable } from '@angular/core';
import User from '../models/UserInterface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenJWT: string | undefined = undefined;

  constructor(private readonly http: HttpClient) {}

  login(identifier: string, password: string) {
    const observable = this.http
      .post('/api/auth/local', {
        identifier: identifier,
        password: password,
      })
      .pipe(
        tap((response) => {
          if ('jwt' in response && typeof response.jwt === 'string') {
            // Connexion Réussi:
            this.tokenJWT = response.jwt;
            console.log('Connexion Réussi');
          } else {
            throw new Error('Login Invalid');
          }
        }),
      );

    return observable;
  }

  logout() {
    this.tokenJWT = undefined;

    //TODO suppresion du localStorage ou du cookie et crée et mise a jour de observable User
  }

  register(user: User) {
    //TODO: implémenter la fonction register
    const observable = this.http.post('/api/auth/local/register', {
      username: user.email,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      firstname: user.firstname,
      lastname: user.lastname,
    });

    return observable;
  }

  getTokenJwt() {
    return this.tokenJWT;
  }

  //TODO: implémenter un Observable user
}
