import {
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoadingService } from '../loading.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Show loader
  loadingService.loading();

  return next(req).pipe(
    //delay(500), // optional minimum display time
    finalize(() => loadingService.hideLoader()),
  );
};
