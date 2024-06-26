import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Self,
  ViewChild,
} from "@angular/core";
import { NgControl } from "@angular/forms";
import { ValueAccessorBase } from "@app/abstract/value-accesor.base";

@Component({
  selector: "app-input",
  templateUrl: "input.component.html",
  styleUrl: "input.component.scss",
  standalone: true,
  imports: [CommonModule],
})
export class InputComponent extends ValueAccessorBase<string> {
  @ViewChild("input") protected readonly inputElement: ElementRef;
  @Output() protected readonly onIconClick = new EventEmitter<Event>();

  constructor(@Self() ngControl: NgControl) {
    super(ngControl);
  }

  protected focusInput(): void {
    this.inputElement.nativeElement.focus();
  }

  protected onValueChange(value: string): void {
    this.value = value;
  }
}
