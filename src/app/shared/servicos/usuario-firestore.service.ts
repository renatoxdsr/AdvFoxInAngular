import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from '../modelo/user';
import{AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFirestoreService {

  colecaoUsuarios: AngularFirestoreCollection<User>
  NOME_COLECAO = 'usuarios';
  constructor(private afs: AngularFirestore) {
   this.colecaoUsuarios = afs.collection(this.NOME_COLECAO);
  }

  listar (): Observable<User[]> {
    return this.colecaoUsuarios.valueChanges({idField:'id'});
  }

  inserir(usuario : User): Observable<object> {
    return from(this.colecaoUsuarios.add(Object.assign({}, usuario)));
  }

  atualizar(usuario: User): Observable<void> {
    const id= `${usuario.id}`;
    delete usuario.id;

    return from(this.colecaoUsuarios.doc(id).update(Object.assign({}, usuario)));
  }
}
