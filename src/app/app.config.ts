import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 2000, // Increased slightly for readability
      extendedTimeOut: 1000,
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      disableTimeOut: false,
    }),

    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loaderInterceptor,
        // AuthInterceptor,
        authInterceptor,
        credentialsInterceptor,
      ]),
    ),
    provideAnimationsAsync(),
  ],
};
