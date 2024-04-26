import { ApplicationConfig, ErrorHandler } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { routes } from "./app.routes";
import { ErrorHandlerService } from "./services/error-handler.service";

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    provideRouter(routes),
    provideHttpClient(),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
