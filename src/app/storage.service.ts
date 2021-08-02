import { Injectable } from '@angular/core';
import { ConferenceOptions } from './models/conferenceOptions';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    save(conferenceOptions): Promise<boolean> {
        // TODO: save conference defaults to a storage
        return new Promise((resolve) => resolve(true));
    }

    load(conferenceId: string): Promise<ConferenceOptions> {
        return new Promise((resolve) =>
            resolve({
                id: conferenceId,
                options: {
                    alias: conferenceId,
                    pinCode: '',
                    dolbyVoice: true,
                    liveRecording: false,
                    rtcpMode: 'average',
                    videoCodec: 'H264',
                },
            })
        );
    }
}
