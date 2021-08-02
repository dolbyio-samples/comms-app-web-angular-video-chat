import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { MediaStreamWithType } from '@voxeet/voxeet-web-sdk/types/models/MediaStream';
import { Participant } from '@voxeet/voxeet-web-sdk/types/models/Participant';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { VideoPanelDirective } from './video-panel.directive';

@Component({
    selector: 'app-video-panel',
    templateUrl: './video-panel.component.html',
    styleUrls: ['./video-panel.component.css'],
})
export class VideoPanelComponent implements OnInit {
    @ViewChild(VideoPanelDirective, { static: true }) videoHost!: VideoPanelDirective;

    private children: Map<string, VideoPlayerComponent> = new Map();

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit(): void {
    }

    addParticipant(peer: Participant, stream: MediaStreamWithType): void {
        // get compenent factory for VideoPlayerComponent
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoPlayerComponent);
        // get reference to a container
        const viewContainerRef = this.videoHost.viewContainerRef;
        // create VideoPlayerComponent
        const componentRef = viewContainerRef.createComponent<VideoPlayerComponent>(componentFactory);
        // set component data
        componentRef.instance.stream = stream;
        // store VideoPlayerComponent reference for future use
        this.children.set(peer.id, componentRef.instance);
    }

    updateParticipant(peer: Participant, stream: MediaStreamWithType): void {
        if (this.children.has(peer.id)) {
            // participant already exist, just update a stream
            this.children.get(peer.id).stream = stream;
        } else {
            // add new participant
            this.addParticipant(peer, stream);
        }
    }

    removeParticipant(peer: Participant): void {
        this.children.delete(peer.id);
    }
}
