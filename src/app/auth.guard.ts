import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getTokenJwt()) {
    return true; // Autorisé
  } else {
    router.navigate(['/auth']);
    //router navigateByUrl('/auth');
    return false; // Bloqué, redirigé vers la page de connexion
  }
};
