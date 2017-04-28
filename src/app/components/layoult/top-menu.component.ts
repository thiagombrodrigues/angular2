import { Component, ElementRef , ChangeDetectorRef, AfterViewChecked} from '@angular/core';

import { Router } from '@angular/router';

import { EventoCompartilhadoService, MensagemEvento } from '../../services/core/evento-compartilhado.service';

@Component({
    moduleId: module.id,
    selector: 'top-menu',
    templateUrl: '/app/templates/layoult/top-menu.component.html',
    providers: [ EventoCompartilhadoService ]
})

/**
 * Componente para gestão do menu superior e controle de abas de navegação
 * @class components.layoult.TopMenuComponent
*/
export class TopMenuComponent implements AfterViewChecked {

    private ultima_url: string;
    private aba_selecionada:any = null;
    private carregando_url: boolean = false;
    private ultima_aba_adicionada:any = null;
    private abas_disponiveis: any[] = [{title: 'Nova aba', active: true, app: null}];

    constructor(private roteador: Router, private referencia_dom:ElementRef,  private change_detector: ChangeDetectorRef, private evento_compartilhado_service: EventoCompartilhadoService)
    {
      roteador.events.subscribe((url:any) => {

          // Mantém referência à ultima url acionada
          this.carregando_url = false;
          let paths = url.url.split('/');
          if(paths.length >= 2) this.ultima_url = `/${paths[1]}`;

          // Define o titulo e a aplicacao da aba ativa
          if(this.aba_selecionada != null)
          {
            this.aba_selecionada.app = this.ultima_url;
            this.aba_selecionada.title = this.ultima_url.substr(1).substr(0, 10) || 'Nova aba';
          }
        }
      );
    }

    ngAfterViewChecked()
    {
      this.change_detector.detectChanges();
    }

    /**
     * Método para ativar abas especificas.
     * @method setActiveTab
     * @param {number} index
    */
    public setActiveTab(index: number): void
    {
      this.abas_disponiveis[index].active = true;
    }

    /**
     * Método para gerenciar a lista de abas apos eventos de remoção.
     * @method removeTabHandler
     * @param {any} tab
    */
    public removeTabHandler(tab: any): void
    {
      var index:number = this.abas_disponiveis.indexOf(tab);
      this.abas_disponiveis.splice(index, 1);
      if(this.abas_disponiveis.length == 0)
      {
        this.ultima_url = null;
        this.aba_selecionada = null;
        this.ultima_aba_adicionada = null;
      }
    }

    /**
     * Método para adicionar novas abas.
     * @method addTab
     * @param {String} title
    */
    public addTab(title?: string): any
    {
      for(var item of this.abas_disponiveis)
      {
          item.active = false;
      }
      var item:any = {
        title: title ? title : 'Nova aba',
        active: true,
        app: null
      };
      this.abas_disponiveis.push(item);
      this.ultima_aba_adicionada = item;
      return item;
    }

    /**
     * Método para notificar evento de atualização para a atual aba selecionada.
     * @method refreshTab
    */
    public refreshTab(): void
    {
      this.evento_compartilhado_service.emitirEventoFilhoPai(new MensagemEvento('REFRESH', this.aba_selecionada.app));
    }

    /**
     * Método para atualizar a referência à atual aba ativa após eventos de seleção.
     * @method tabSelected
     * @param {any} tab
    */
    public tabSelected(tab: any): void
    {
      //this.aba_selecionada = this.abas_disponiveis.indexOf(tab);
      this.aba_selecionada = tab;
    }

    /**
     * Método para executar roteamento de apps para as abas
     * @method changeRoute
     * @param {String} path
    */
    public changeRoute(path: String): void
    {
      // Ativa spinner de carregamento
      this.carregando_url = true;

      // Verifica se a nota rota é equivalente à ultima acionada
      if(this.ultima_url == path)
      {
        var $this = this;
        var rotas_repetidas: any = this.abas_disponiveis.filter( function(element, index, array) { return (element.app == $this.ultima_url); });

        // Ativa a aba contendo a rota acionada
        if(rotas_repetidas.length) rotas_repetidas.pop().active = true;
        this.carregando_url = false;
        return;
      }

      // Cria uma nova aba caso nao exista nenhuma diponivel
      if(this.abas_disponiveis.length == 0)
      {
          this.addTab(path.substr(1).substr(0, 10));
      }

      // Verifica se a aba selecionada atualmente é a ultima criada
      else if(this.aba_selecionada != this.ultima_aba_adicionada)
      {
        // Fecha a atual aba selecionada, pois não contem a referencia ao router-outlet
        this.referencia_dom.nativeElement.querySelector('.nav-link.active').lastElementChild.lastElementChild.click();

        // Cria uma nova aba para conter a referencia ao router-outlet
        this.addTab(path.substr(1).substr(0, 10));

        // Aguarda o $apply para executar a navegação
        setTimeout(() => { this.roteador.navigate([path]); }, 500);
        return;
      }

      // Aguarda o $apply para executar a navegação
      this.roteador.navigate([path]);
    }
}
