import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Signal } from "@angular/core";
import { ErrorMessageHandlerService } from "@app/services/error-message-handler.servce";
import { Observable } from "rxjs";

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
  protected readonly errorMessage: Signal<string>;

  constructor(private readonly snackbarMessage: ErrorMessageHandlerService) {
    this.errorMessage$ = this.snackbarMessage.errorMessage$;
  }
}
