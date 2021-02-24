import { TestBed } from '@angular/core/testing';

import { VietnameseService } from './vietnamese.service';

describe('VietnameseService', () => {
  let service: VietnameseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VietnameseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
