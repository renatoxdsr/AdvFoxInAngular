import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Advogado } from 'src/app/shared/modelo/advogado';
import { User } from 'src/app/shared/modelo/user';
import { AdvogadosFirestoreService } from 'src/app/shared/servicos/advogados-firestore.service';
import { AdvogadosService } from 'src/app/shared/servicos/advogados.service';
import { UsuariosFirestoreService } from 'src/app/shared/servicos/usuario-firestore.service';
import { UsuarioService } from 'src/app/shared/servicos/usuarios.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Newuser: User;
  advogados: Array<Advogado>;
  users: Array<User>;
  emailLogin: string;
  senhaLogin: string;
  constructor(private userService: UsuarioService, private advogadoService: AdvogadosService,
    private userPrimary: AppComponent, private rota: Router) {
    this.Newuser = new User();
    this.emailLogin = '';
    this.senhaLogin = ''
  }

  ngOnInit(): void {
    this.advogadoService.listar().subscribe(advogados => this.advogados = advogados);
    this.userService.listar().subscribe(users => this.users = users);
  }

  verification(){
    console.log(this.users);
    this.users.forEach(user => {
      if(user.email === this.emailLogin || user.nome === this.emailLogin &&
        user.senha === this.senhaLogin){
        console.log(user);
        this.userPrimary.insertUser(user)
        this.rota.navigate(['home'])
      }else{
        const aviso = document.querySelector('.aviso')
        aviso.innerHTML = 'Invalid password or non-existent user'
      }
    })
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
