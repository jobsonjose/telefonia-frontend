import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contato } from "../entity/contato";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SalvarContatoService {
    private url = 'http://localhost:8080/telefonia/';

    constructor(private http: HttpClient){}

    salvarContato(dados: Contato): Observable<Contato> {
        return this.http.post<Contato>(this.url + "cadastro", dados).pipe((map) => map)
    }
}