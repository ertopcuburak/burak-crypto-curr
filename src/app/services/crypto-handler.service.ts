import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoHandlerService {

  public _cryptoArray = new BehaviorSubject<any>([]);
  public _fiatCurrList = new BehaviorSubject<any>([]);
  public _selectedFiatCurr = new BehaviorSubject<any>({});
  public _isCryptoArrLoading = new BehaviorSubject<any>({});
  public _hasApiError = new BehaviorSubject<any>({});
  constructor(private http:HttpClient) {
    this.setSelectedFiatCurr('USD');
    this.setFiatCurrList();
    const timeIntevalSeconds = 10;
    setInterval(()=> { this.setCryptoList(this._selectedFiatCurr.value) }, timeIntevalSeconds * 1000);
    //this.setCryptoList(this._selectedFiatCurr.value);
  }

  setCryptoList(currency:string) {
    this._isCryptoArrLoading.next(true);
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency='+currency+'&order=market_cap_desc&per_page=30&page=1';
    this.http.get<any>(apiUrl).subscribe(data=>{
      this._cryptoArray.next(data);
      this._isCryptoArrLoading.next(false);
    },error=> {
      this._isCryptoArrLoading.next(false);
      this._selectedFiatCurr.next('USD');
      alert('Fiat Currency is not valid!');
    });
  }

  getCryptoList(){
    return this._cryptoArray.value;
  }

  setFiatCurrList() {
    const apiUrl = 'https://api.coinbase.com/v2/currencies';
    this.http.get<any>(apiUrl).subscribe(data=>{
      this._fiatCurrList.next(data['data']);
    });
  }

  getFiatCurrList(){
    return this._fiatCurrList.value;
  }

  setSelectedFiatCurr(fiatCurr:string){
    this._selectedFiatCurr.next(fiatCurr);
    this.setCryptoList(this._selectedFiatCurr.value);
  }

}
