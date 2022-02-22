import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MenuComponent } from 'src/app/layout/menu/menu.component';
import { Advogado } from 'src/app/shared/modelo/advogado';
import { arrayConsult } from 'src/app/shared/modelo/arrayConsult';
import { AdvogadosFirestoreService } from 'src/app/shared/servicos/advogados-firestore.service';
import { AdvogadosService } from 'src/app/shared/servicos/advogados.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {
  newConsulta: Advogado
  advogados= new Array<Advogado>();
  arrayAdvogados = new arrayConsult()
  constructor(private advogadoService: AdvogadosService, private user: AppComponent) {
    this.newConsulta = new Advogado()
    console.log(this.advogados)
  }


  ngOnInit(): void {
    this.gerarDados()
  }

  async gerarDados(){
    await this.advogadoService.listar().subscribe(advogados => this.advogados = advogados);
    console.log(this.advogados)
  }

  insertAdvogado(advogado: Advogado): void {
    this.arrayAdvogados.insertAdvogado(advogado)
    console.log(this.advogadoService.listar())
  }

  insertConsulta(advogado){
    console.log('oi')
    this.user.inserirConsulta(advogado)
  }
}
