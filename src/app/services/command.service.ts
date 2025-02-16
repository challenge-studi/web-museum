import { Injectable } from '@angular/core';
import { PriceWithCount } from '../models/PriceInterface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  Commande,
  isCommandApi,
  QuantityPerPrice,
  ResponseApiCommand,
  DetailCommand,
} from '../models/CommandInterface';
import { Exposition } from '../models/ExpositionInterface';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  commands: Commande[] = [];
  quantityPerPrice: QuantityPerPrice[] = [];
  detailCommand: DetailCommand[] = [];
  currentCommand: Commande | undefined = undefined;
  selectedExposition: Exposition | null = null;
  current_command_totalPrice: number = -1;

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService,
  ) {}

  validateCommand(choiceTickets: PriceWithCount[], idExposition: number) {
    //TODO: faire la request HTTP sur la route de prise de commande ( pas encore implémenter );

    console.log(choiceTickets);
    console.log(idExposition);

    // requete HTTP pour l'envoi sur Api (Besoin de faire le controleur );

    // en construction
    return true;
  }

  setDetailCommand(detailCommand: DetailCommand[]) {
    this.detailCommand = detailCommand;
    return this;
  }

  getDetailCommand() {
    return this.detailCommand;
  }

  sendCommandToApi(choiceTickets: QuantityPerPrice[]): Observable<Commande> {
    if (!this.auth.getUser()) {
      throw new Error("L'utilisateur n'est pas connecté");
    }

    //pour faire persister les datas
    this.quantityPerPrice = choiceTickets; //modifier

    return this.http.post('/api/send-command', choiceTickets).pipe(
      map((response) => {
        // vérification du type
        if (!isCommandApi(response)) throw new Error('Data invalid');

        // retourner la commande version local

        const newCommand: Commande = {
          id: response.id,
          documentId: response.documentId,
          total_price: response.total_price,
          order_date: new Date(response.order_date),
          status: response.etat,
        };
        this.currentCommand = newCommand;
        return newCommand;
      }),
    );
  }

  getCommands(): Observable<Commande[]> {
    if (!this.auth.getUser())
      throw new Error("L'utilisateur n'est pas connecté");

    return this.http.get('/api/commandes?populate=*').pipe(
      map((response) => {
        console.log("Map de l'observable");
        let listCommand: Commande[] = [];

        if (!this.isResponseCommandeValide(response))
          throw new Error('data reçu invalide');

        listCommand = response.data.map((commandeApi) => {
          const command: Commande = {
            id: commandeApi.id,
            documentId: commandeApi.documentId,
            total_price: commandeApi.total_price,
            order_date: new Date(commandeApi.order_date),
            status: commandeApi.etat,
          };
          return command;
        });

        return listCommand;
      }),
    );
  }

  isResponseCommandeValide(dataApi: any): dataApi is ResponseApiCommand {
    if (
      typeof dataApi === 'object' &&
      'data' in dataApi &&
      Array.isArray(dataApi.data)
    )
      return true;
    else return false;

    //TODO: vérification très lègere, à voir si on utilise Zod
  }
}
