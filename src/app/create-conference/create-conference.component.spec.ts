import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateConferenceComponent } from './create-conference.component';

describe('CreateConferenceComponent', () => {
    let component: CreateConferenceComponent;
    let fixture: ComponentFixture<CreateConferenceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateConferenceComponent],
            providers: [
                FormBuilder,
                { provide: Router, useValue: { navigate: () => {} } }
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateConferenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
