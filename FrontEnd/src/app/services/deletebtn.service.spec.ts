import { TestBed } from '@angular/core/testing';

import { DeletebtnService } from './deletebtn.service';

describe('DeletebtnService', () => {
  let service: DeletebtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletebtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
