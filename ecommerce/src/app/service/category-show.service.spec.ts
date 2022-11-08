import { TestBed } from '@angular/core/testing';

import { CategoryShowService } from './category-show.service';

describe('CategoryShowService', () => {
  let service: CategoryShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
