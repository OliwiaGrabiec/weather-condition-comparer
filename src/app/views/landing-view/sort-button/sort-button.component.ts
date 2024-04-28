import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from "@angular/core";
import { CityWeatherStoreService } from "@app/services/city-weather-store.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-sort-button",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./sort-button.component.html",
  styleUrl: "./sort-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortButtonCompnent {
  protected ascending: boolean = true;

  @HostListener("click") onClick(): void {
    this.ascending = !this.ascending;
    this.cityWeatherStore.sortWeatherByTemp(this.ascending);
  }

  constructor(private readonly cityWeatherStore: CityWeatherStoreService) {}
}
