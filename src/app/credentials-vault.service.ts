import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CredentialsVaultService {
    constructor() {}

    getCredentials() : Promise<any> {
        return Promise.resolve({
            key: 'AocrLmFwH3_3QWw5H2a-SA==',
            secret: 'JV9ranRSxiezp88AQe3JiuSbB2LG10DcfwBt-1L_1N8=',
        });
    }
}
