import { TestBed } from '@angular/core/testing';

import { KurecService } from './kurec.service';

describe('KurecService', () => {
  let service: KurecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KurecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
