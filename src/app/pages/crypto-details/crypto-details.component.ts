import { Component, Input, OnInit } from '@angular/core';
import { CryptoHandlerService } from 'src/app/services/crypto-handler.service';

@Component({
  selector: 'crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.scss']
})
export class CryptoDetailsComponent implements OnInit {
  
  @Input()
  selectedItem:any | undefined;

  @Input()
  selectedFiatCurr:string | undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

}
