import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Advogado } from 'src/app/shared/modelo/advogado';
import { User } from 'src/app/shared/modelo/user';
import { AdvogadosFirestoreService } from 'src/app/shared/servicos/advogados-firestore.service';
import { AdvogadosService } from 'src/app/shared/servicos/advogados.service';
import { UsuariosFirestoreService } from 'src/app/shared/servicos/usuario-firestore.service';
import { UsuarioService } from 'src/app/shared/servicos/usuarios.service';

interface Perfil {
  value: string;
  viewValue: string;
}

interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  closeResult = '';
  NewAdvogado: Advogado
  NewUser: User
  advogados: Array<Advogado>
  users: Array<User>

  senhaUser: string
  confirme_senhaUser: string
  emailUser: string
  nameUser: string
  dataUser: string
  typeUser: string
  areaUser: string
  descricaoAdv: string

  Perfis: Perfil[] = [
    {value: 'user', viewValue: 'User'},
    {value: 'advogado', viewValue: 'Advogado'},
  ];

  areas: Area[] = [
    {value: 'Direito Civil', viewValue: 'Direito Civil'},
    {value: 'Direito do Consumidor', viewValue: 'Direito do Consumidor'},
    {value: 'Direito Empresarial', viewValue: 'Direito Empresarial'}
  ];

  constructor(private modalService: NgbModal, private advogadoService: AdvogadosService,
              private userService: UsuarioService) {
    this.NewAdvogado = new Advogado()
    this.NewUser = new User()
   }

  ngOnInit(): void {
    this.advogadoService.listar().subscribe(advogados => this.advogados = advogados);
    this.userService.listar().subscribe(users => this.users = users);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.addNewUsers()
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private insertDataUser(data: User){
    data.nome = this.nameUser
    data.email = this.emailUser
    data.senha = this.senhaUser
    data.data_nascimento = this.dataUser
    return data
  }
  private insertDataAdvogado(data: Advogado){
    data.nome = this.nameUser
    data.email = this.emailUser
    data.data_nascimento = this.dataUser
    data.area = this.areaUser
    data.senha = this.senhaUser
    data.descricao = this.descricaoAdv
    return data
  }

  addNewUsers() {
    if(this.senhaUser === this.confirme_senhaUser){
      if(this.typeUser === this.Perfis[0].value){
        this.NewUser = this.insertDataUser(this.NewUser)
        this.inserirUsuario()
        console.log(this.NewUser)
        this.NewUser = new User()
      }else{

        this.NewAdvogado = this.insertDataAdvogado(this.NewAdvogado)
        this.inserirAdvogado()
        this.NewAdvogado = new Advogado()
      }

    }else{
      const warning = document.querySelector('.warning')
      warning.innerHTML = "Confirm the Password"
    }
  }

  insertTypeArea(){
    console.log(this.typeUser)
    if(this.typeUser === this.Perfis[1].value){
      document.getElementById('area').style.display='block'
      document.getElementById('descricao').style.display='block'
    }else{
      document.getElementById('area').style.display='none'
      document.getElementById('descricao').style.display='none'
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  inserirAdvogado(): void {
    if (this.NewAdvogado.id) {
      this.advogadoService.atualizar(this.NewAdvogado).subscribe(
        adivogadoAlterado => {
          console.log(adivogadoAlterado);
        }
      );
    } else {
      this.advogadoService.add(this.NewAdvogado).subscribe(
        advogadoInserido => {
          console.log(advogadoInserido);
        }
      );
    }
  }

  inserirUsuario(): void {
    if (this.NewUser.id) {
      this.userService.atualizar(this.NewUser).subscribe(
        userAlterado => {
          console.log(userAlterado);
        }
      );
    } else {
      this.userService.add(this.NewUser).subscribe(
        userAlterado => {
          console.log(userAlterado);
        }
      );
    }
  }

}
