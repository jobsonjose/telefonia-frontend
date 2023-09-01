import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contato } from "../entity/contato";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeletarContatoService {
    private url = 'http://localhost:8080/telefonia/';

    constructor(private http: HttpClient){}

    deletarContato(id: number): Observable<any> {
        return this.http.delete(this.url + ""+id);
    }
}