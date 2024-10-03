import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { ConfigService } from './_base/services/ConfigService';
import { JwtInterceptor } from './_base/_helpers/jwt.interceptor';
import { AngularDateHttpInterceptor } from './_base/_helpers/AngularDateHttpInterceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ErrorInterceptor } from './_base/_helpers/ErrorInterceptor';
import { SharedService } from './_base/services/SharedSvc.service';
// #fake-end#

// function appInitializer(authService: AuthService) {
//   return () => {
//     return new Promise((resolve) => {
//       //@ts-ignore
//       authService.getUserByToken().subscribe().add(resolve);
//     });
//   };
// }
export const appInitializer = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [ConfigService],
      multi: true,
    },
    SharedService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
