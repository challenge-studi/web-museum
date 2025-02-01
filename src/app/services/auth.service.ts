import { Injectable } from '@angular/core';
import User from '../models/UserInterface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenJWT: string | undefined = undefined;

  public connected$;

  constructor(private readonly http: HttpClient) {
    this.connected$ = new BehaviorSubject(false);
  }

  login(identifier: string, password: string) {
    const observable = this.http
      .post('/api/auth/local', {
        identifier: identifier,
        password: password,
      })
      .pipe(
        tap((response) => {
          if ('jwt' in response && typeof response.jwt === 'string') {
            // Connexion Réussie:
            this.tokenJWT = response.jwt;
            console.log('Connexion Réussi');
            this.connected$.next(true);
          } else {
            throw new Error('Login Invalid');
          }
        }),
      );

    return observable;
  }

  logout() {
    this.tokenJWT = undefined;
    localStorage.removeItem('jwt');
    this.connected$.next(false);

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

  saveToken() {
    if (this.tokenJWT) {
      localStorage.setItem('jwt', this.tokenJWT);
    }
  }

  loadToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.tokenJWT = token;
    }
  }

  //TODO: implémenter un Observable user
}
