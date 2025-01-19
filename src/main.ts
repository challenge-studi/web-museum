import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

const appConfig = {
  providers: [provideRouter(routes)],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
