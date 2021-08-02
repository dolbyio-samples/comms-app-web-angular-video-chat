import { TestBed } from '@angular/core/testing';

import { CredentialsVaultService } from './credentials-vault.service';

describe('CredentialsVaultService', () => {
  let service: CredentialsVaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialsVaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
