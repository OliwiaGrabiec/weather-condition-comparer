import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ErrorMessageHandlerService {
  private static readonly DURATION_TIME = 2000;
  private readonly errorMessageStore$ = new BehaviorSubject<string>("");

  constructor() {}

  public get errorMessage$() {
    return this.errorMessageStore$.asObservable();
  }

  public set errorMessage(message: string) {
    this.errorMessageStore$.next(message);

    setTimeout(
      () => this.errorMessageStore$.next(""),
      ErrorMessageHandlerService.DURATION_TIME
    );
  }
}
