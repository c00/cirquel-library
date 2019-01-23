import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ApiService } from '../services/api';
import { ItemService } from '../services/item-service';
import { ResourceService } from '../services/resource-service';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BgImageDirective } from './bg-image.directive';
import { BackgroundComponent } from './components/background/background.component';
import { DownloadCtaComponent } from './components/download-cta/download-cta.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ImagePipe } from './image.pipe';
import { HomeComponent } from './pages/home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ItemComponent,
    ItemCardComponent,
    ImagePipe,
    BackgroundComponent,
    DownloadCtaComponent,
    LoaderComponent,
    VideoPlayerComponent,
    ProfileComponent,
    BgImageDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'cirquel-library'}),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    InlineSVGModule.forRoot({ baseUrl: '/assets/svg/' }),
    TransferHttpCacheModule,
  ],
  providers: [
    ApiService,
    ItemService,
    ResourceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
