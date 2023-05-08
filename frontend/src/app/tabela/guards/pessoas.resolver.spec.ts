import { TestBed } from '@angular/core/testing';

import { PessoasResolver } from './pessoas.resolver';

describe('PessoasResolver', () => {
  let resolver: PessoasResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PessoasResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
