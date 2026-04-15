// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn:'root'
// })
// export class credentialsInterceptor implements HttpInterceptor {
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//    request =request.clone({
//     withCredentials:true
//    })
//     return next.handle(request);
//   }
// }
import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    withCredentials: true,
  });

  return next(modifiedReq);
};
