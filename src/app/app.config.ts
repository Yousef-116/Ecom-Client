import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loaderInterceptor } from './core/Interceptor/loader.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './core/Interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 1500,
      extendedTimeOut: 1000,
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      disableTimeOut: false,
    }),

    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loaderInterceptor, AuthInterceptor])),
    provideAnimationsAsync(),
  ],
};
