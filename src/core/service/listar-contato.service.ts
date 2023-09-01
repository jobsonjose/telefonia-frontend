import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contato } from "../entity/contato";
import { Observable } from "rxjs";
import { IListarContatos } from "../interface/listar-contatos.interface";

@Injectable({
    providedIn: 'root'
})
export class ListarContatoService {
    private url = 'http://localhost:8080/telefonia/';

    constructor(private http: HttpClient){}

    listarContato(): Observable<Contato[]> {
        return this.http.get<Contato[]>(this.url + 'contatos')
    }
}