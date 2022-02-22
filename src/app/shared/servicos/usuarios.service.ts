import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modelo/user';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url= 'http://localhost:8080/usuarios'
  constructor(private httpClient: HttpClient) { }

  listar(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.url);
  }

  add(User:User): Observable<User>{
    return this.httpClient.post<User>(this.url,User);
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  pesquisarPorId(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  atualizar(User: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${User.id}`, User);
  }
}
