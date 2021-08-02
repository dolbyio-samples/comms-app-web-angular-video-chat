import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ConferenceService } from '../conference.service';

import { ConferenceComponent } from './conference.component';

const activatedRouteStub = {
    snapshot: {
        paramMap: new Map()
    }
};
activatedRouteStub.snapshot.paramMap.set('id', '123');
activatedRouteStub.snapshot.paramMap.set('name', 'test');

describe('ConferenceComponent', () => {
    let component: ConferenceComponent;
    let service: ConferenceService;
    let activatedRoute: ActivatedRoute;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConferenceComponent,
                { provide: ConferenceService, useValue: { join: (id, name, obs) => Promise.resolve({ id, name, obs }), me: {} } },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Router, useValue: { navigate: () => {} } }
            ],
        });
    });

    beforeEach(() => {
        component = TestBed.inject(ConferenceComponent);
        service = TestBed.inject(ConferenceService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();

        await component.ngOnInit();

        expect(component.conference.id).toEqual('123');
    });
});
