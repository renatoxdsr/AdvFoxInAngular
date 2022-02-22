import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Advogado } from 'src/app/shared/modelo/advogado';
import { User } from 'src/app/shared/modelo/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User
  consultas: Array<Advogado>
  constructor(private userPrimary: AppComponent) {
    this.user = userPrimary.usuario
    this.consultas = userPrimary.arrayConsulta
  }



  ngOnInit(): void {

  }

}
