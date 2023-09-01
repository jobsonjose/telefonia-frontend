import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contato } from "../entity/contato";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EditarContatoService {
    private url = 'http://localhost:8080/telefonia/';

    constructor(private http: HttpClient){}

    editarContato(id: number, contato: Contato): Observable<Contato> {
        return this.http.put<Contato>(this.url + ""+id, contato).pipe((map) => map);
    }
}