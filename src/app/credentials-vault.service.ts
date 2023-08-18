import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CredentialsVaultService {
    constructor() {}

    getCredentials() : Promise<any> {
        return Promise.resolve({
            key: 'APP_KEY',
            secret: 'APP_SECRET',
        });
    }
}
