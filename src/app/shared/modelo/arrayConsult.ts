import { Advogado } from "./advogado";

export class arrayConsult{
  listConsult: Advogado[]
  constructor(){
    this.listConsult = new Array<Advogado>();
  }

  insertAdvogado(advogado: Advogado){
    this.listConsult.push(advogado)
  }

  listar(){
    return this.listConsult
  }
}
