import { Injectable } from '@angular/core';
import { PriceWithCount } from '../models/PriceInterface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Commande, {
  CommandApi,
  QuantityPerPrice,
  ResponseApiCommand,
} from '../models/CommandInterface';
import { Exposition } from '../models/ExpositionInterface';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  commands: Commande[] = [];
  current_command: QuantityPerPrice[] = [];
  selectedExposition: Exposition | null = null;

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

  sendCommandToApi(
    choiceTickets: QuantityPerPrice[],
    selectedExposition: Exposition,
  ): Observable<CommandApi> {
    if (!this.auth.getUser()) {
      throw new Error("L'utilisateur n'est pas connecté");
    }

    //pour faire persister les datas
    this.current_command = choiceTickets;
    this.selectedExposition = selectedExposition;

    return this.http.post<CommandApi>('/api/send-command', choiceTickets).pipe(
      map((response) => {
        console.log('Nous allons traiter votre commande', response);
        return response;
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
