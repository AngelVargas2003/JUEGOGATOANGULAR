import { TestBed } from '@angular/core/testing';

import { JuegogatoService } from './juegogato.service';

describe('JuegogatoService', () => {
  let service: JuegogatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegogatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
