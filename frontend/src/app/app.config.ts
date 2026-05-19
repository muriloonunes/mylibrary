import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {TemaMyLibrary} from '../theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: TemaMyLibrary,
        options: {
          prefix: 'p',
          darkModeSelector: '.app-dark',
        },
      },
    }),
  ],
};
