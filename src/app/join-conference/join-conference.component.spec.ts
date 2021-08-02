import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { JoinConferenceComponent } from './join-conference.component';

const activatedRouteStub = {
    snapshot: {
        paramMap: new Map()
    }
};
activatedRouteStub.snapshot.paramMap.set('id', '123');

describe('JoinConferenceComponent', () => {
    let component: JoinConferenceComponent;
    let fixture: ComponentFixture<JoinConferenceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JoinConferenceComponent],
            providers: [
                FormBuilder,
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Router, useValue: { navigate: () => {} } }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinConferenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
