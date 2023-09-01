import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Contato } from "src/core/entity/contato";

@Component({
    selector: 'cp-listar-contatos',
    templateUrl: 'listar-contatos.component.html',
    styleUrls: ['listar-contatos.component.css']
})
export class ListarContatosComponent {

    @Input() listaContatos: Contato[] = [<Contato>{}];
    @Output() selecionandoContato = new EventEmitter<Contato>();
    contatoSelecionado: Contato = <Contato>{};

    constructor() {}

    obterContatoSelecionado(): void {
        this.selecionandoContato.emit(this.contatoSelecionado)
    }
}