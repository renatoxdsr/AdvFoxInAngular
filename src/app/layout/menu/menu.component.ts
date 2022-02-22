import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/shared/modelo/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: User;
  constructor( private userPrimary: AppComponent) {
    this.user = userPrimary.usuario
    console.log(this.user)
   }

  ngOnInit(): void {

  }

}
