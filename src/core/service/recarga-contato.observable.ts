import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecargaContato {
    recargaLista: ReplaySubject<void> = new ReplaySubject();
    recargaLista$: Observable<void> = this.recargaLista.asObservable();

    constructor(){}
}