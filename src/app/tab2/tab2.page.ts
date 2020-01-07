import { Component } from '@angular/core';
import { ConsultaProdutosService } from '../api/consulta-produtos.service';
import { Tab3Page } from '../tab3/tab3.page';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { FirebaseAuth } from '@angular/fire';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public produtosCart: any = [];
  valorCompra: number;
  constructor(
    private authServe: AuthService,
    private alerta: AlertController,
    private tab3: Tab3Page,
    private consultaprods: ConsultaProdutosService) {
    this.valorCompra = 0;
    this.valorCompra.toFixed(2);
    this.produtosCart = [];
    this.getAnotacoes();
  }
  logOff() {
    this.authServe.afAuth.auth.signOut();
  }
  //busca os produtos somente uma vez e da um push na lista
  getAnotacoes() {
    this.consultaprods.getCart().then(data => {
      var Anydata = <any>data;
      if (Anydata != null) {
        Anydata.forEach(element => {
          this.produtosCart.push(element);
          this.valorCompra += parseFloat(element.valor);
        });
      }
    })
  }
  //toda vez que entram na pagina o array de produtos no Cart atualiza
  ionViewWillEnter() {
    console.log(this.produtosCart);
    this.valorCompra = 0;
    this.consultaprods.getCart().then(data => {
      console.log(data);
      var AnyData = <any>data;
      if (AnyData != null) {
        this.produtosCart = <any>data;
        this.produtosCart.forEach(element => {
          this.valorCompra += parseFloat(element.valor);
        });
      }
    })
  }

  //remove todos produtos do Cart
  removeToArrayCart(index) {
    this.valorCompra -= parseFloat(this.produtosCart[index].valor);
    this.produtosCart.splice(index, 1);
    console.log(this.produtosCart);
    this.consultaprods.setCart(this.produtosCart).then(data => {
      console.log('Produto Apagado');
    });
  }

  //realizar a compra e apagar o carrinho de itens 
  async RealizarCompra() {
    if (this.produtosCart.length > 0) {
      this.valorCompra.toFixed(2);
      this.tab3.addHistorico(this.valorCompra, this.produtosCart).then(data => {
        this.produtosCart = [];
        this.valorCompra = 0;
        this.consultaprods.setCart(this.produtosCart).then(data => {
          console.log('Carrinho Apagado com Sucesso');
        })
      })
      const alertaInfo = await this.alerta.create({
        header: 'Compra Realizada',
        message: '[Carrinho Esvaziado] - Pode consultar seu historico de compras no Perfil',
        buttons: [{
          text: 'Ok', handler: () => {
            console.log('Ok');
          }
        }]
      })
      await alertaInfo.present();
    }
  }

  //Adiciona o produto no card 
  addToArrayCart(detalheProduto) {
    //pego a quantidade atual no storage e coloco o novo produto
    this.consultaprods.getCart().then(data => {
      var anydata = <any>data;
      if (anydata != null) {
        this.produtosCart = anydata;
      }
      this.consultaprods.getDetalheProd().then(res => {
        var anydata2 = <any>res;
        console.log('AnyData2: ' + anydata2.nome);
        if (anydata2) {
          this.produtosCart.unshift(anydata2);
          this.consultaprods.setCart(this.produtosCart).then(data => {
            console.log('Produto Adicionado No Cart');
          });
        } else {
          console.log('Detalhes Do Produto: '+detalheProduto);
          this.produtosCart.unshift(detalheProduto);
          this.consultaprods.setCart(this.produtosCart).then(data => {
            console.log('Produto Adicionado No Cart');
          });
        }
      })
    })
  }
}
