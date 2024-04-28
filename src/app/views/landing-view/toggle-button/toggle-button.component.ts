import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

@Component({
  selector: "app-toggle-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./toggle-button.component.html",
  styleUrl: "./toggle-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonCompnent {
  protected isCel: boolean = true;
  @Output() isCelChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected isCelc(): void {
    this.isCel = true;
    this.emitIsCel();
  }
  protected isFahs(): void {
    this.isCel = false;
    this.emitIsCel();
  }

  protected emitIsCel(): void {
    this.isCelChange.emit(this.isCel);
  }
}
