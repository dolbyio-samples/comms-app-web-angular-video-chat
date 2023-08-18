import { Injectable } from '@angular/core';
import VoxeetSDK from '@voxeet/voxeet-web-sdk';
import Conference from '@voxeet/voxeet-web-sdk/types/models/Conference';
import { MediaStreamWithType } from '@voxeet/voxeet-web-sdk/types/models/MediaStream';
import { Participant } from '@voxeet/voxeet-web-sdk/types/models/Participant';
import { Observable, Observer } from 'rxjs';
import { CredentialsVaultService } from './credentials-vault.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class ConferenceService {
    private streamObserver: Observer<{ peer: Participant, stream: MediaStreamWithType, eventType: string }>;
    private allowedEvents = ["streamAdded", "streamUpdated", "streamRemoved"];

    constructor(
        private storage: StorageService,
        private credentialsVault: CredentialsVaultService
    ) {
        for (const eventType of this.allowedEvents) {
            VoxeetSDK.conference.on(eventType, (peer: Participant, stream: MediaStreamWithType) => {
                if (this.streamObserver) {
                    this.streamObserver.next({ peer, stream, eventType });
                }
            });
        }
    }

    async initialize() {
        VoxeetSDK.packageUrlPrefix = './';
        const credentials = await this.credentialsVault.getCredentials();
        VoxeetSDK.initialize(credentials.key, credentials.secret);
    }

    async join(alias: string, name: string, observer: Observer<{ peer: Participant, stream: MediaStreamWithType, eventType: string }>): Promise<Conference> {
        this.streamObserver = observer;

        // load conference details and settings from storage
        const conferenceDefaults = await this.storage.load(alias);

        // open session (mandatory)
        await VoxeetSDK.session.open({ name });

        const conferenceOptions = {
            alias: conferenceDefaults.id,
            params: { ...conferenceDefaults.options },
        };
        // create conference
        const conference = await VoxeetSDK.conference.create(conferenceOptions);
        // join to created conference
        return await VoxeetSDK.conference.join(conference, {
            constraints: { audio: true, video: false },
        });
    }

    async leave() {
        this.streamObserver.complete();
        this.streamObserver = null;
        await VoxeetSDK.conference.leave();
    }

    async startAudio() {
        await VoxeetSDK.conference.startAudio(this.me);
    }

    async stopAudio() {
        await VoxeetSDK.conference.stopAudio(this.me);
    }

    async startVideo() {
        const videoConstraints = {
            width: {
                min: '320',
                max: '1280',
            },
            height: {
                min: '240',
                max: '720',
            },
        };
        await VoxeetSDK.conference.startVideo(this.me, videoConstraints);
    }

    async stopVideo() {
        await VoxeetSDK.conference.stopVideo(this.me);
    }

    get me() {
        return VoxeetSDK.session.participant;
    }

    get connected() {
        const all = [...VoxeetSDK.conference.participants].map((val) => val[1]);
        return all.filter((item) => item.status === 'Connected');
    }

    get all() {
        return [...VoxeetSDK.conference.participants].map((val) => val[1]);
    }
}
