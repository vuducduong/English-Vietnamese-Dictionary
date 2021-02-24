import { TestBed } from '@angular/core/testing';

import { VietnameseServiceService } from './vietnamese-service.service';

describe('VietnameseServiceService', () => {
  let service: VietnameseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VietnameseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
