import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Contato } from "../entity/contato";

@Injectable({
    providedIn: 'root'
})
export class DadosContatoAtivo {
    dadosContato: ReplaySubject<Contato> = new ReplaySubject();
    dadosContato$: Observable<Contato> = this.dadosContato.asObservable();

    constructor(){}
}