import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffect } from './effect/auth.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducer';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [AppComponent, AuthComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffect]),
    StoreModule.forRoot({authState : authReducer}),
    GoogleSigninButtonModule
  ],
  providers :[
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue:{
        autoLogin : false,
        providers : [
          {
            id : GoogleLoginProvider.PROVIDER_ID,
            provider : new GoogleLoginProvider('<Google client ID here>')
          }
        ],
        onError: (error) =>{
          console.error("social auth error", error)
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
