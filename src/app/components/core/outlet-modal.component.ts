import { Component, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'outlet-modal',
  templateUrl: '/app/templates/core/outlet-modal.component.html'
})

/**
 * Componente base para gestão de modals
 * @class components.core.OutletModalComponent
*/
export class OutletModalComponent
{
  private titulo_modal: String;

  @ViewChild('modal_principal') public modal_principal:ModalDirective;

  constructor(private router: Router, private route: ActivatedRoute) {}

  public show(titulo?: String, rota?: String, outlet?: any): void
  {
    this.titulo_modal = titulo ? titulo : '';
    if(rota && outlet) this.router.navigate([rota, {outlets: outlet }]);
    this.modal_principal.show();
  }

  public hide(): void
  {
    this.modal_principal.hide();
  }  
}
