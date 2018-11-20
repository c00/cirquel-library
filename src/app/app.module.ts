import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ItemService } from 'src/services/item-service';

import { ApiService } from '../services/api';
import { ResourceService } from '../services/resource-service';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ImagePipe } from './image.pipe';
import { BackgroundComponent } from './components/background/background.component';
import { DownloadCtaComponent } from './components/download-cta/download-cta.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoaderComponent } from './components/loader/loader.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BgImageDirective } from './bg-image.directive';

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
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    InlineSVGModule.forRoot({ baseUrl: '/assets/svg/' }),
  ],
  providers: [
    ApiService,
    ItemService,
    ResourceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
