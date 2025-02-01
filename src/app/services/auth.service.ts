import { Injectable } from '@angular/core';
import User from '../models/UserInterface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenJWT: string | undefined = undefined;
  public observableTest$;
  public connected$;

  constructor(private readonly http: HttpClient) {
    this.observableTest$ = new Observable<boolean>((subscriber) => {
      subscriber.next(false);
      subscriber.next(true);
      subscriber.next(false);
      subscriber.next(true);
    });
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
            // Connexion Réussi:
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

  //TODO: implémenter un Observable user
}
