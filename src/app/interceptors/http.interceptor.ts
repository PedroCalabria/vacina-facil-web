import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notification/notification.service';
import { ApiError } from '../type/error';
import { LoadingService } from '../services/loading/loading.service';

const urlIgnore = ['/api/Authentication/login', '/api/Patient/InsertPatient'];

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const loading = inject(LoadingService);

  const token = tokenService.getToken();

  loading.show();

  if (urlIgnore.includes(req.url)) {
    return next(req).pipe(
      tap((value) => {
        if (value instanceof HttpResponse) {
          const apiError = value.body as ApiError;
          if (apiError.HttpStatus && apiError.HttpStatus !== 200) {
            throw apiError;
          }
        }
      }),
      catchError((error) => {
        if (error.HttpStatus === 500){
          const messageError =  'Email e/ou senha inválido';
          notificationService.showNotification(messageError);
          throw messageError;
        }

        const messageError = error?.Messages
          ? error.Messages[0]
          : 'Ocorreu um erro, tente novamente mais tarde';

        notificationService.showNotification(messageError);

        throw {
          status: error.HttpStatus,
          message: messageError,
        };
      }),
      finalize(() => loading.hide())
    );
  }

  const bearerToken = `Bearer ${token}`;
  const newRequest = req.clone({
    setHeaders: {
      Authorization: bearerToken,
    },
  });

  return next(newRequest).pipe(
    tap((value) => {
      notificationService.hideNotification();
      if (value instanceof HttpResponse) {
        const apiError = value.body as ApiError;
        if (apiError.HttpStatus && apiError.HttpStatus !== 200) {
          throw apiError;
        }
      }
    }),
    catchError((error) => {
      if (error.status === 401) {
        tokenService.logout();
        const messageError =  'Usuário não autenticado';
        notificationService.showNotification(messageError);
        throw messageError;
      }

      const messageError = error?.Messages
        ? error.Messages[0]
        : 'Ocorreu um erro, tente novamente mais tarde';

      notificationService.showNotification(messageError);

      throw {
        status: error.HttpStatus,
        message: messageError,
      };
    }),
    finalize(() => loading.hide())
  );
};
