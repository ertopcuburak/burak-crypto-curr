import { TestBed } from '@angular/core/testing';

import { CryptoHandlerService } from './crypto-handler.service';

describe('CryptoHandlerService', () => {
  let service: CryptoHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
