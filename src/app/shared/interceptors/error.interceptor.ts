import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const messageService = inject(MessageService)
 console.log('request', req);
  return next(req).pipe(
    tap(() => {
      console.log('responce', req);
    }),
    catchError((err) => {
      console.log('err', err);
      messageService.add({severity: 'error', summary: err?.message});
      return throwError(() => err);
    })
  );
};
