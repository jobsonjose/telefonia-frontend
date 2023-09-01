import { Component } from "@angular/core";
import { MenuItem } from 'primeng/api';
import { FiltroContatosMenu } from "src/core/service/filtro-contatos-menu.observable";

@Component({
    selector: 'cp-menu-contatos',
    templateUrl: 'menu-contatos.component.html',
    styleUrls: ['menu-contatos.component.css'],
})
export class MenuContatosComponente {
    itensMenu: MenuItem[];
    menuAtivo: MenuItem;
    visibilidadeCadastroContato: boolean = false;

    constructor(public serviceFiltroContatos: FiltroContatosMenu){
        this.itensMenu = [
            { label: 'Contatos', icon: 'pi pi-fw pi-user', command: event => {
                this.obterMenuAtivo('Contatos');
            } },
            { label: 'Favoritos', icon: 'pi pi-fw pi-star', command: event => {
                this.obterMenuAtivo("Favoritos");
            }},
            { label: 'Inativos', icon: 'pi pi-fw pi-user-minus', command: event => {
                this.obterMenuAtivo('Inativos');
              } },
        ]
        this.menuAtivo = this.itensMenu[0];
    }

    obterMenuAtivo(event: string): void {
        if(event) {
            this.serviceFiltroContatos.filtroContatos.next(event);
        }
    }
}