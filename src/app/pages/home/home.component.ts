import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CryptoHandlerService } from 'src/app/services/crypto-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  subscriptions:Subscription[] = [];
  fiatCurrs:any;
  cryptoCurrs:any[] = [];
  selectedCryptoCurr:any;
  controlFiatCurr = new FormControl('valid', [Validators.pattern('valid')]);
  selectedFiatCurr:string='USD';
  isCryptoCurrsLoading:boolean = false;

  constructor(private cryptoHandlerService:CryptoHandlerService) { }
  
  ngOnInit(): void {
    this.getFiatCurrs();
    this.getCryptoCurrs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb=>sb.unsubscribe());
  }

  getFiatCurrs(){
    this.subscriptions.push(this.cryptoHandlerService._fiatCurrList.subscribe(data=> {
      this.fiatCurrs = data;
    }));
  }

  getCryptoCurrs(){
    this.subscriptions.push(this.cryptoHandlerService._selectedFiatCurr.subscribe(data=> {
      this.selectedFiatCurr = data;
    }));
    this.subscriptions.push(this.cryptoHandlerService._isCryptoArrLoading.subscribe(data=> {
      this.isCryptoCurrsLoading = data;
    }));
    this.subscriptions.push(this.cryptoHandlerService._cryptoArray.subscribe(data=> {
      this.cryptoCurrs = data;
      this.isCryptoCurrsLoading = false;
      if(this.cryptoCurrs && this.cryptoCurrs.length > 0 && this.selectedCryptoCurr) {
        const selectedSymbol = this.selectedCryptoCurr.symbol;
        this.selectedCryptoCurr = this.cryptoCurrs.filter(item=>item.symbol === selectedSymbol)[0];
      }
    }));
  }

  itemSelectedForDetails(data:any){
    this.selectedCryptoCurr = data;
  }

  fiatCurrSelected(data:any){
    this.selectedFiatCurr = data.value;
    this.cryptoHandlerService.setSelectedFiatCurr(this.selectedFiatCurr);
  }

}
