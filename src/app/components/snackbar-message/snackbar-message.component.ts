import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { ErrorMessageHandlerService } from "@app/services/error-message-handler.servce";
import { Observable, tap } from "rxjs";

@Component({
  selector: "app-snackbar-message",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "snackbar-message.component.html",
  styleUrl: "./snackbar-message.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarMessageComponent {
  protected readonly errorMessage$: Observable<string>;

  constructor(
    private readonly snackbarMessage: ErrorMessageHandlerService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.errorMessage$ = this.snackbarMessage.errorMessage$.pipe(
      tap((com) => console.log("called", com))
    );
  }
}
