import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';

export class MensagemEvento
{
  tipo: string;
  aplicacao: string;

  constructor(tipo: string, aplicacao: string)
  {
    this.tipo = tipo;
    this.aplicacao = aplicacao;
  }
}

@Injectable()
export class EventoCompartilhadoService
{
  private eventoPaiFilho = new Subject<MensagemEvento>();
  private eventoFilhoPai = new Subject<MensagemEvento>();

  evento_pai_filho_emitido$ = this.eventoPaiFilho.asObservable();
  evento_filho_pai_emitido$ = this.eventoFilhoPai.asObservable();

  emitirEventoPaiFilho(mensagem_evento: MensagemEvento)
  {
    this.eventoPaiFilho.next(mensagem_evento);
  }
  
  emitirEventoFilhoPai(mensagem_evento: MensagemEvento)
  {
    this.eventoFilhoPai.next(mensagem_evento);
  }
}
