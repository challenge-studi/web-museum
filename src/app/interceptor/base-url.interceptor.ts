import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getTokenJwt();
  const baseUrl = environment.apiUrl;

  const newReq = req.clone({
    headers: authToken
      ? req.headers.append('Authorization', `Bearer ${authToken}`)
      : undefined,
    url: req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`,
  });

  return next(newReq);
};
