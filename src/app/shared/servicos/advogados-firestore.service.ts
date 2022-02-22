import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import{AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Advogado } from '../modelo/advogado';

@Injectable({
  providedIn: 'root'
})
export class AdvogadosFirestoreService {

  colecaoAdvogados: AngularFirestoreCollection<Advogado>
  NOME_COLECAO = 'advogados';
  constructor(private afs: AngularFirestore) {
   this.colecaoAdvogados = afs.collection(this.NOME_COLECAO);
  }

  listar (): Observable<Advogado[]> {
    return this.colecaoAdvogados.valueChanges({idField:'id'});
  }

  inserir(usuario : Advogado): Observable<object> {
    return from(this.colecaoAdvogados.add(Object.assign({}, usuario)));
  }

  atualizar(usuario: Advogado): Observable<void> {
    const id= `${usuario.id}`;
    delete usuario.id;

    return from(this.colecaoAdvogados.doc(id).update(Object.assign({}, usuario)));
  }
}
