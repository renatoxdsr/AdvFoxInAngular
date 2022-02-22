import { Component } from '@angular/core';
import { Advogado } from './shared/modelo/advogado';
import { User } from './shared/modelo/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'FOX';

  successAlert = false;
  usuario: User
  teste: Advogado
  arrayConsulta : Array<Advogado>

  constructor(){
    this.arrayConsulta = new Array<Advogado>();
    this.teste1()
  }

  copyToClipboard(value: string): void {
    const tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    this.successAlert = true;

    setTimeout(() => {
      this.successAlert = false;
    }, 900);
  }

  teste1() {
    this.teste = new Advogado()
    this.teste.id = 7
    this.teste.nome = 'raissa'
    this.teste.email = 'raissa@gmail.com'
    this.teste.data_nascimento = '14/05/2002'
    this.teste.senha = '12345'
    this.teste.area = 'Direito Civil'
    this.inserirConsulta(this.teste)
  }


  insertUser(user: User) {
    this.usuario =  user
  }

  inserirConsulta(consulta: Advogado){
    this.arrayConsulta.push(consulta);
  }
}
