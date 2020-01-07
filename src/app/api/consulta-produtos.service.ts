import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalkeyService } from '../global/globalkey.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaProdutosService {

  constructor(
    private all: GlobalkeyService,
    public storage: Storage,
    public http: HttpClient) { }


  buscarListaProduto(msg: string) {
    return this.http.get('https://api.bestbuy.com/v1/products(name=' + msg + '*%7Csku=7619002)?show=sku,thumbnailImage,salePrice,name&pageSize=40&page=5&apiKey='+this.all.GlobalKeys.best_buy_key+'&format=json');
  }

  getProdutoByCode(codigoProd) {
    return this.http.get('https://api.bestbuy.com/v1/products/' + codigoProd + '.json?show=sku,image,name,shortDescription,releaseDate,preowned,largeFrontImage,modelNumber,longDescription,salePrice&apiKey='+this.all.GlobalKeys.best_buy_key+'');
  }

  async setProdutInModal(infoProd) {
    return this.storage.set('detalhesProd', infoProd);
  }

  async getDetalheProd(){
    return this.storage.get('detalhesProd');
  }

  getCart() {
    return this.storage.get('produtosCart');
  }

  async setCart(arrayProds) {
    return this.storage.set('produtosCart', arrayProds);
  }

  getCartBuys() {
    return this.storage.get('buys');
  }

  async setCartBuys(arrayProds) {
    return this.storage.set('buys', arrayProds);
  }

}