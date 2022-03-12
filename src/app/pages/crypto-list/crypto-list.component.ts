import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  @Input() 
  list:any[] | undefined;

  @Input()
  selectedFiatCurr:string | undefined;

  @Output()
  cryptoCurrSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showDetails(item:any) {
    this.cryptoCurrSelected.emit(item);
  }

}
