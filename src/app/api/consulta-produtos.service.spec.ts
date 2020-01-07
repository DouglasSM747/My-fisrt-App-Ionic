import { TestBed } from '@angular/core/testing';

import { ConsultaProdutosService } from './consulta-produtos.service';

describe('ConsultaProdutosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaProdutosService = TestBed.get(ConsultaProdutosService);
    expect(service).toBeTruthy();
  });
});
