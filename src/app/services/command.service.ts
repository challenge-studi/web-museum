import { Injectable } from '@angular/core';
import Ticket from '../models/TicketInterface';
import User from '../models/UserInterface';
import Price, { PriceWithCount } from '../models/PriceInterface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Commande from '../models/CommandInterface';

type ResponseApiCommand = {
  data: CommandApi[];
  meta: Object; // meta qui contient la pagination si beaucoup de commande
};

type CommandApi = {
  id: number;
  documentId: string;
  total_price: number;
  order_date: string;
  etat: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tickets: Object[]; //TODO: à préciser plus tard
};

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  commands: Commande[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService,
  ) {}

  validateCommand(choiceTickets: PriceWithCount, idExposition: number) {
    //TODO: faire la request HTTP sur la route de prise de commande ( pas encore implémenter );

    console.log(choiceTickets);
    console.log(idExposition);

    // requete HTTP pour l'envoi sur Api (Besoin de faire le controleur );
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
    if ('data' in dataApi && Array.isArray(dataApi.data)) return true;
    else return false;

    //TODO: vérification très lègere, à voir si on utilise Zod
  }
}
