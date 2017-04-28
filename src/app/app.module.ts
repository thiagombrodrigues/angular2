import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule }     from './components/routes/app-routing.module';

import { TabsModule, TooltipModule, ModalModule } from 'ngx-bootstrap';

import { AppComponent }  from './app.component';
import { TopAreaComponent } from './components/layoult/top-area.component';
import { TopMenuComponent } from './components/layoult/top-menu.component';

import { SolicitacaoAlmoxarifadoComponent } from './components/almoxarifado/solicitacao-almoxarifado.component';
import { NovaSolicitacaoAlmoxarifadoComponent } from './components/almoxarifado/nova-solicitacao-almoxarifado.component';
import { EditarSolicitacaoAlmoxarifadoComponent } from './components/almoxarifado/editar-solicitacao-almoxarifado.component';
import { ModalAdicionarItemSolicitacao } from './components/almoxarifado/modal-adicionar-item-solicitacao.component';

import { PatrimonioComponent } from './components/patrimonio/patrimonio.component';

import { DiariasComponent } from './components/diarias/diarias.component';
import { NovaSolicitacaoDiariasComponent } from './components/diarias/nova-solicitacao-diarias.component';

import { SimulacaoComponent } from './components/planejamento/simulacao.component';

import { OutletModalComponent } from './components/core/outlet-modal.component';

import { CKEditorModule } from 'ng2-ckeditor';

import {SelectModule} from 'ng-select';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        CKEditorModule,
        SelectModule
    ],
    declarations: [
        AppComponent,
        TopAreaComponent,
        TopMenuComponent,
        OutletModalComponent,
        SolicitacaoAlmoxarifadoComponent,
        NovaSolicitacaoAlmoxarifadoComponent,
        EditarSolicitacaoAlmoxarifadoComponent,
        ModalAdicionarItemSolicitacao,
        PatrimonioComponent,
        DiariasComponent,
        NovaSolicitacaoDiariasComponent,
        SimulacaoComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
