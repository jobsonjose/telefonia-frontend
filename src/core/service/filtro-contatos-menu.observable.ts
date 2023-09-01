import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FiltroContatosMenu {
    filtroContatos: ReplaySubject<string> = new ReplaySubject();
    filtroContatos$: Observable<string> = this.filtroContatos.asObservable();
}