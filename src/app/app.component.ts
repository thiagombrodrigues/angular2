import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '/app/templates/layoult/app.component.html'
})

export class AppComponent implements OnInit {

    constructor(private roteador: Router) {}

    ngOnInit()
    {
        this.roteador.navigate(['/']);
    }    
}
