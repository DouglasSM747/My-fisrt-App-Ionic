import { Component } from '@angular/core';
import { ConsultaProdutosService } from '../api/consulta-produtos.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalprodComponent } from '../modalprod/modalprod.component';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  produtos: any = [];
  textMsg: any;
  title: string;
  detalhesProduto: any;
  constructor(
    private changeRef: ChangeDetectorRef,
    public authServe: AuthService,
    public controlModal: ModalController,
    public alertCtrl: AlertController,
    public consultaProdutos: ConsultaProdutosService) {
    this.title = '',
    this.consultaProdutos.buscarListaProduto('samsung').subscribe(data => {
      this.produtos = <any>data;
      this.changeRef.detectChanges();
    })
  }

  logOff() {
    this.authServe.afAuth.auth.signOut();
  }
  
  async showModalProd(codigoProd: string) {
    const modal = await this.controlModal.create({
      component: ModalprodComponent
    });
    //busca o produto, mostra na Modal e salva no Storage
    this.consultaProdutos.getProdutoByCode(codigoProd).subscribe(data => {
      var Anydata = <any>data;
      this.consultaProdutos.setProdutInModal({
        nome: Anydata.name,
        image: Anydata.largeFrontImage,
        image2: Anydata.image,
        numeroModelo: Anydata.modelNumber,
        descricao: Anydata.longDescription,
        valor: Anydata.salePrice,
        data_divulgacao: Anydata.releaseDate,
        sku: Anydata.sku,
        descricaoCurta: Anydata.shortDescription,
      }).then(res => {
        if (res)
          modal.present();
        else
          this.alertCtrl.create({
            header: 'Alerta',
            message: 'Falha ao Buscar o produto, Tente Novamente !',
            buttons: ['OK']
          })
      })
    });

  }
  handleMsgProdValue() {
    //se msg passada for vazia
    if (this.title.length == 0)
      this.presentAlert();
    else
      this.consultaProdutos.buscarListaProduto(this.title).subscribe(data => {
        this.produtos = <any>data;
        console.log(this.produtos);
        this.changeRef.detectChanges();
      })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Necessario adicionar um produto a ser buscado',
      buttons: ['OK']
    });

    await alert.present();
  }
}
