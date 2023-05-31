import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './material.module';
import { IAuthService } from './interfaces/i-auth-service';
import { AuthService } from './services/auth.service';
import { INotificationService } from './interfaces/i-notification-service';
import { NotificationService } from './services/notification.service';
import { IModalService } from './interfaces/i-modal-service';
import { ModalService } from './services/modal.service';
import { IUserService } from './interfaces/i-user-service';
import { UserService } from './services/user.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    MaterialModule,
    PagesModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'})
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: IAuthService, useClass: AuthService},
    {provide: INotificationService, useClass: NotificationService},
    {provide: IModalService, useClass: ModalService},
    {provide: IUserService, useClass: UserService},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
