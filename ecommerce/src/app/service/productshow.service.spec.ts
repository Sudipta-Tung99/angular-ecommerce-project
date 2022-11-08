import { TestBed } from '@angular/core/testing';

import { ProductshowService } from './productshow.service';

describe('ProductshowService', () => {
  let service: ProductshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
