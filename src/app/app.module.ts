import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Utils } from 'src/utils';
import { DatabaseService } from './database/database.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { IslandEffects } from './domains/island/island.effects';
import { reducers, metaReducers } from './app.state';
import { TodoEffects } from './domains/todo/todo.effects';
import { ChoresEffects } from './domains/chores/chores.effects';
import { CritterpediaEffects } from './domains/critterpedia/critterpedia.effects';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({mode: 'md'}), AppRoutingModule, StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    }
  }), !environment.production ? StoreDevtoolsModule.instrument() : [], EffectsModule.forRoot([IslandEffects, TodoEffects, ChoresEffects, CritterpediaEffects]), ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    Utils,
    DatabaseService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
