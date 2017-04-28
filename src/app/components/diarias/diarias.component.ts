import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { MissionService } from '../../services/diarias/diarias.service';



export class MensagemEvento
{
  tipo: string;
  aplicacao: string;
}


@Component({
  selector: 'mission-control',
  templateUrl: '/app/templates/diarias/diarias.component.html',
  providers: [MissionService]
})

export class DiariasComponent {
  
  /*astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  nextMission = 0;*/
  
  constructor(private missionService: MissionService, private router: Router)
  {
    missionService.evento_filho_pai_emitido$.subscribe(
      (mensagem_evento: MensagemEvento) => {
        //this.history.push(`${astronaut} confirmed the mission`);
        console.log(mensagem_evento);
      });
  }

  announce()
  {
    let mission = new MensagemEvento();
    mission.tipo = 'TIPO 1';
    mission.aplicacao = 'APLICACAO 1';
    
    
    this.missionService.emitirEventoPaiFilho(mission);
    


    //this.history.push(`Mission "${mission}" announced`);
    //if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
  }


  
    public abrirLink(): void
    {        
        this.router.navigate(['/diarias', {outlets: {'outlet-modal': ['nova-solicitacao']}}]);
        
        //this.router.navigate(['/almoxarifado', {outlets: {'outlet-modal': [50]}}]);

        //this.router.navigate([rota, {outlets: outlet }]);
    }



}
