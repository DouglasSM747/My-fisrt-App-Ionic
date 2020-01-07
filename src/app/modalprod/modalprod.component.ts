import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Tab2Page } from '../tab2/tab2.page';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-modalprod',
  templateUrl: './modalprod.component.html',
  styleUrls: ['./modalprod.component.scss'],
})
export class ModalprodComponent implements OnInit {
  detalhesProduto: any;
  constructor(
    public alerta: AlertController,
    public storage: Storage,
    private controlModal: ModalController,
    private tab2: Tab2Page
    ) { }

  ngOnInit() {
    //busca as informacoes do produto no Storage
    this.detalhesProduto = this.storage.get('detalhesProd').then(data=>{
      this.detalhesProduto = data;
    });
  }

  async popUpVerificarAddCart(){
    const alertaControl = await this.alerta.create({
      header: 'Produto Adicionado',
      message: 'Acesse o Carinho Para Ver Os Produtos',
      buttons:[{text:'Ok',handler: ()=>{
        this.storage.get('detalhesProd').then(data=>{
          this.detalhesProduto = data;
          this.tab2.addToArrayCart(this.detalhesProduto);
        });
      }},{text:'Cancel'}]
    })
    this.close();
    await alertaControl.present();
  }
  close() {
    this.controlModal.dismiss();
  }
}
