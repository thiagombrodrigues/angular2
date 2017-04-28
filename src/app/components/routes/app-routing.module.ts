import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatrimonioComponent } from '../patrimonio/patrimonio.component';

import { DiariasComponent } from '../diarias/diarias.component';
import { NovaSolicitacaoDiariasComponent } from '../diarias/nova-solicitacao-diarias.component';

import { SolicitacaoAlmoxarifadoComponent } from '../almoxarifado/solicitacao-almoxarifado.component';
import { NovaSolicitacaoAlmoxarifadoComponent } from '../almoxarifado/nova-solicitacao-almoxarifado.component';
import { EditarSolicitacaoAlmoxarifadoComponent } from '../almoxarifado/editar-solicitacao-almoxarifado.component';

import { SimulacaoComponent } from '../planejamento/simulacao.component';

const routes: Routes = [
    
    { path: 'patrimonio', component: PatrimonioComponent },
    {
        path: 'diarias',
        component: DiariasComponent,
        children: [
            {
                path: 'nova-solicitacao',
                component: NovaSolicitacaoDiariasComponent,
                outlet: 'outlet-modal'
            }
        ]
    },
    {
        path: 'solicitacao-almoxarifado',
        component: SolicitacaoAlmoxarifadoComponent,
        children: [
            {
                path: 'nova-solicitacao',
                component: NovaSolicitacaoAlmoxarifadoComponent,
                outlet: 'outlet-modal'
            },
            {
                path: ':id',
                component: EditarSolicitacaoAlmoxarifadoComponent,
                outlet: 'outlet-modal'
            }
        ]
    },

    { path: 'simulacao', component: SimulacaoComponent },
    




    /*{
        path: 'teste',
        component: EditarSolicitacaoAlmoxarifadoComponent,
        outlet: 'outlet-modal'
    },*/



    /*
    {
        path: 'diarias',
        component: DiariasComponent,
        outlet: 'modulo'
    },
    {
        path: 'patrimonio',
        component: PatrimonioComponent,
        outlet: 'modulo'
    },
    */



    //{ path: 'detail/:id', component: HeroDetailComponent },
    //{ path: 'heroes',     component: HeroesComponent }



    //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}



//import { Router }                 from '@angular/router';
//constructor(private router: Router) {}
//this.router.navigate([{ outlets: { modulo: ['patrimonio'] }}]);