import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule,RouterModule.forRoot(routes)),
    CookieService,
  ],
}).catch((err) => console.error(err));
