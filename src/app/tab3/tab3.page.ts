import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ConsultaProdutosService } from '../api/consulta-produtos.service';
import { ModalController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public name: string;
  public historicoCompras: any = [];
  constructor(
    public authServe: AuthService,
    public social: SocialSharing,
    public alerta: AlertController,
    public modalContro:ModalController,
    public consultaprodutos: ConsultaProdutosService,
    public contaUser: AuthService) {
    this.getHistorico();
    }
 
  ngOnInit(){
    this.name = this.contaUser.getAuth().currentUser.displayName,
    console.log(this.name);
  }
  logOff(){
    this.authServe.afAuth.auth.signOut();
  }
  ionViewWillEnter() {
    this.consultaprodutos.getCartBuys().then(data => {
      var AnyData = <any> data;
      console.log(AnyData);
      if(AnyData!=null){
        this.historicoCompras = <any> data;
      }
    })
  }

  async transformJsonInText(index){
    console.log(this.historicoCompras[index]);
    var cabecalho = 'Valor Total Compra:'+this.historicoCompras[index].valorNota+'\n\n';
    var anydata = this.historicoCompras[index].notasFiscais;
    var prod = '';
    anydata.forEach(element => {
      prod += '\nNome: '+element.nome+'\nValor: '+element.valor+'\n\n';
    });
    var texto = cabecalho + prod;

    console.log(texto);
    const alertaInfo = await this.alerta.create({
      header: 'Sua Nota',
      message: texto,
      buttons: [{text: 'Compartilhar', handler: ()=>{
        this.social.share(texto,'Sua Nota Fiscal',null,'https://github.com/DouglasSM747').then(data=>{
          console.log('Compartilhado');
        });
      }}],
    })
    await alertaInfo.present();
  }

  getHistorico(){
    this.consultaprodutos.getCartBuys().then(data => {
      var Anydata = <any> data;
      if(data!=null){
        Anydata.forEach(element => {
          this.historicoCompras.push(element);
        });
      }
    })
  }

  async addHistorico(valorNota: number, notasFiscais){
    this.historicoCompras.push({valorNota,notasFiscais});
    await this.consultaprodutos.setCartBuys(this.historicoCompras).then(data=>{
      console.log('Nota Salva no Historico');
    })
  }
}
