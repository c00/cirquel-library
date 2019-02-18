import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ApiService } from '../services/api';
import { DialogService } from '../services/dialog-service';
import { ItemService } from '../services/item-service';
import { MetaService } from '../services/meta-service';
import { ResourceService } from '../services/resource-service';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BgImageDirective } from './bg-image.directive';
import { BackgroundComponent } from './components/background/background.component';
import { DownloadCtaComponent } from './components/download-cta/download-cta.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ImagePipe } from './image.pipe';
import { DownloadModalComponent } from './modals/download-modal/download-modal.component';
import { MessageModalComponent } from './modals/message-modal/message-modal.component';
import { GuidelinesComponent } from './pages/guidelines/guidelines.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ShirtsPromoComponent } from './pages/shirts-promo/shirts-promo.component';
import { ImageModalComponent } from './modals/image-modal/image-modal.component';

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
    DownloadModalComponent,
    MessageModalComponent,
    GuidelinesComponent,
    FooterComponent,
    MosaicComponent,
    PasswordResetComponent,
    ConfirmEmailComponent,
    ShirtsPromoComponent,
    ImageModalComponent,
  ],
  entryComponents: [
    DownloadModalComponent,
    MessageModalComponent,
    ImageModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'cirquel-library'}),
    RouterModule.forRoot(appRoutes, {anchorScrolling: 'enabled'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    InlineSVGModule.forRoot({ baseUrl: '/assets/svg/' }),
    TransferHttpCacheModule,
  ],
  providers: [
    ApiService,
    ItemService,
    ResourceService,
    MetaService,
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
