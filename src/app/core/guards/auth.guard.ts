// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { catchError, map, of } from 'rxjs';
// import { IdentityService } from '../../identity/identity.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(IdentityService);
//   const router = inject(Router);

//   console.log('Auth Guard: Checking authentication status...'); // Debug log

//   return authService.isAuthenticated().pipe(
//     map(() => true), // if 200 OK → user is authenticated
//     catchError(() => {
//       router.navigate(['/account/login'], {
//         queryParams: { returnUrl: state.url },
//       });
//       return of(false);
//     }),
//   );
// };
