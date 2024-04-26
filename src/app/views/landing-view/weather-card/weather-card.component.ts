import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CoordsStoreService } from "@app/services/coords-store.service";
import { CityWeather } from "../../../services/city-weather-store.service";

@Component({
  selector: "app-weather-card",
  templateUrl: "weather-card.component.html",
  styleUrl: "weather-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class WeatherCardComponent {
  public cityWeather = input<CityWeather>();
  public index = input<number>();

  constructor(private readonly coordsStore: CoordsStoreService) {}

  protected deleteCity(index: number) {
    this.coordsStore.deleteCoordBy(index);
  }
}
