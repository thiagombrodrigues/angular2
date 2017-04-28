import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';


export class MensagemEvento
{
  tipo: string;
  aplicacao: string;
}


@Injectable()
export class MissionService
{
  /*
  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
  */


  // Observable string sources
  private eventoPaiFilho = new Subject<MensagemEvento>();
  private eventoFilhoPai = new Subject<MensagemEvento>();

  // Observable string streams
  evento_pai_filho_emitido$ = this.eventoPaiFilho.asObservable();
  evento_filho_pai_emitido$ = this.eventoFilhoPai.asObservable();

  // Service message commands
  emitirEventoPaiFilho(mensagem_evento: MensagemEvento)
  {
    this.eventoPaiFilho.next(mensagem_evento);
  }
  
  emitirEventoFilhoPai(mensagem_evento: MensagemEvento)
  {
    this.eventoFilhoPai.next(mensagem_evento);
  }

}
