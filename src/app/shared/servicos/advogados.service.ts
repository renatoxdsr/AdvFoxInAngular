import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advogado } from '../modelo/advogado';

@Injectable({
  providedIn: 'root'
})

export class AdvogadosService {
  url= 'http://localhost:8080/advogados'
  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Advogado[]>{
    return this.httpClient.get<Advogado[]>(this.url);
  }

  add(advogado:Advogado): Observable<Advogado>{
    return this.httpClient.post<Advogado>(this.url,advogado);
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Advogado> {
    return this.httpClient.get<Advogado>(`${this.url}/${id}`);
  }

  atualizar(advogado: Advogado): Observable<Advogado> {
    return this.httpClient.put<Advogado>(`${this.url}/${advogado.id}`, advogado);
  }
}
