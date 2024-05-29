import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../../component/home/home.component';
import { HomeService } from '../../service/home.service';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffect } from '../../effect/home.effect';
import { StoreModule } from '@ngrx/store';
import { homeSelector } from '../../selector/home.selector';
import { homeReducer } from '../../reducers/home.reducer';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    EffectsModule.forFeature([HomeEffect]),
    StoreModule.forFeature('homeState', homeReducer)
  ],
  providers:[HomeService]
})
export class HomeModule { }
