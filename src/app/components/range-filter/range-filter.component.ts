import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-range-filter",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./range-filter.component.html",
  styleUrl: "./range-filter.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeFilterComponent {}
