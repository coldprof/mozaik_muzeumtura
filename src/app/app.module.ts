import { GamePage } from './../pages/game/game';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { HttpModule } from '@angular/http';
import { NewsPage } from '../pages/news/news';
import { OrderByPipe } from '../pipes/orderBy';
import { SearchFilterPipe } from '../pipes/searchfilter';
import { ReplacePipe } from '../pipes/strreplace';
import { MuseumsPage } from '../pages/museums/museums';
import { TabsPage } from '../pages/tabs/tabs';
import { NewsService } from '../services/new.service';
import { Network } from '@ionic-native/network';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { GameService } from '../services/game.service';
import { MuseumsService } from '../services/museum.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MuseumModalComponent } from '../components/museum-modal/museum-modal';
import { CategoryModalComponent } from '../components/category-modal/category-modal';
import { LoginModalComponent } from '../components/login-modal/login-modal';
import { TruncateCharactersPipe } from '../pipes/truncatePipe';
import { SafePipe } from '../pipes/safePipe';
import { Geolocation } from '@ionic-native/geolocation';
import { NewsModalComponent } from '../components/news-modal/news-modal';
import { CongratModalComponent } from '../components/congrat-modal/congrat-modal';



@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    MuseumsPage,
    GamePage,
    TabsPage,
    MuseumModalComponent,
    CategoryModalComponent,
    LoginModalComponent,
    NewsModalComponent,
    CongratModalComponent,
    OrderByPipe,
    SearchFilterPipe,
    SafePipe,
    ReplacePipe,
    TruncateCharactersPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    TabsPage,
    GamePage,
    MuseumsPage,
    MuseumModalComponent,
    CategoryModalComponent,
    CongratModalComponent,
    LoginModalComponent,
    NewsModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OrderByPipe,
    SearchFilterPipe,
    ReplacePipe,
    TruncateCharactersPipe,
    SafePipe,
    NewsService,
    Network,
    FileTransfer,
    FileTransferObject,
    GameService,
    MuseumsService,
    BarcodeScanner,
    MuseumModalComponent,
    CategoryModalComponent,
    LoginModalComponent,
    NewsModalComponent,
    CongratModalComponent,
    LoadingController,
    Geolocation,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
