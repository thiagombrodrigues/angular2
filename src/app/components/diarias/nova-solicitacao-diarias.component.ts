import { Component, Input, OnDestroy } from '@angular/core';
import { MissionService } from '../../services/diarias/diarias.service';
import { Subscription }   from 'rxjs/Subscription';


export class MensagemEvento
{
  tipo: string;
  aplicacao: string;
}


@Component({
  selector: 'my-astronaut',
  template: `
    <p>
      {{astronaut}}: <strong>{{mission}}</strong>
      <button
        (click)="confirm()">
        Confirm
      </button>
    </p>
  `
})
export class NovaSolicitacaoDiariasComponent implements OnDestroy {
  
  //@Input() astronaut: string;
  //mission = '<no mission announced>';
  //confirmed = false;
  //announced = false;
  
  subscription: Subscription;

  constructor(private missionService: MissionService)
  {
    this.subscription = missionService.evento_pai_filho_emitido$.subscribe(
      (mensagem_evento: MensagemEvento) => {
        /*this.mission = mission;
        this.announced = true;
        this.confirmed = false;*/

        console.log(mensagem_evento);
    });
  }

  confirm() {
    //this.confirmed = true;

    let mission = new MensagemEvento();
    mission.tipo = 'TIPO 2';
    mission.aplicacao = 'APLICACAO 2';
    
    this.missionService.emitirEventoFilhoPai(mission);
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
