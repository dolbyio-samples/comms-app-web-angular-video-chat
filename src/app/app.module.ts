import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { ConferenceService } from './conference.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './top-bar/top-bar.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CreateConferenceComponent } from './create-conference/create-conference.component';
import { JoinConferenceComponent } from './join-conference/join-conference.component';
import { ConferenceComponent } from './conference/conference.component';
import { VideoPanelComponent } from './video-panel/video-panel.component';
import { ParticipantsComponent } from './participants/participants.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPanelDirective } from './video-panel/video-panel.directive';

const Router = RouterModule.forRoot([
  { path: '', component: WelcomePageComponent },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'create-conference', component: CreateConferenceComponent },
  { path: 'join-conference', component: JoinConferenceComponent },
  { path: 'conference', component: ConferenceComponent },
]);
@NgModule({
    declarations: [
      AppComponent,
      TopBarComponent,
      WelcomePageComponent,
      CreateConferenceComponent,
      JoinConferenceComponent,
      ConferenceComponent,
      VideoPanelComponent,
      ParticipantsComponent,
      VideoPlayerComponent,
      VideoPanelDirective,
    ],
    imports: [
      BrowserModule,
      Router,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCheckboxModule,
      MatCardModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [
      ConferenceService,
      {
        provide: APP_INITIALIZER,
        useFactory: (svc: ConferenceService) => () => svc.initialize(),
        deps: [ConferenceService],
        multi: true
      }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
