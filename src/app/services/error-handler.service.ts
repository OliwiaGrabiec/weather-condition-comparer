import { ErrorHandler, NgZone, inject } from "@angular/core";
import { ErrorMessageHandlerService } from "./error-message-handler.servce";

type ErrorType = "DEV" | "USER";

export class CustomError {
  constructor(
    public readonly type: ErrorType,
    public readonly message: string
  ) {}
}

export class ErrorHandlerService implements ErrorHandler {
  private readonly messageHandler = inject(ErrorMessageHandlerService);
  private readonly ngZone = inject(NgZone);

  handleError(error: CustomError) {
    this.ngZone.runTask(() => this.procedures(error));
  }

  private procedures(error: CustomError): void {
    if (!(error instanceof CustomError)) {
      console.log(`Error`, error);
      this.messageHandler.errorMessage = "Błąd serwera";
      return;
    }

    switch (error.type) {
      case "DEV": {
        console.error(`Dev error: ${error.message}`);
        break;
      }

      case "USER": {
        console.error(`User error: ${error.message}`);
        this.messageHandler.errorMessage = error.message;
        break;
      }
    }
    // do something with the exception
  }
}
