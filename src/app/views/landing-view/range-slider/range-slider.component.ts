import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { CityWeatherStoreService } from "@app/services/city-weather-store.service";

@Component({
  selector: "app-range-slider",
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule],
  templateUrl: "./range-slider.component.html",
  styleUrl: "./range-slider.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderCompnent {
  protected startTemp: number = -30;
  protected endTemp: number = 50;
  public isCel = input.required<boolean>();

  constructor(private readonly cityWeatherStore: CityWeatherStoreService) {}

  public filterTemp(): void {
    this.cityWeatherStore.filterTemp(this.startTemp, this.endTemp);
  }
}
