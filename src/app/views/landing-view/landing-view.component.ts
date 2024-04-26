import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { InputComponent } from "@app/components/input/input.component";
import { Observable } from "rxjs";
import {
  CityWeather,
  CityWeatherStoreService,
} from "../../services/city-weather-store.service";
import { CoordsStoreService } from "../../services/coords-store.service";
import { WeatherCardComponent } from "./weather-card/weather-card.component";

@Component({
  selector: "app-landing-view",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    WeatherCardComponent,
    InputComponent,
  ],
  templateUrl: "./landing-view.component.html",
  styleUrl: "./landing-view.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingViewCompnent {
  protected readonly cityNameControl = new FormControl<string>("", {
    nonNullable: true,
  });
  protected readonly cityWeatherList$: Observable<CityWeather[]>;

  constructor(
    private readonly coordsStore: CoordsStoreService,
    private readonly cityWeatherStore: CityWeatherStoreService
  ) {
    this.cityWeatherList$ = this.cityWeatherStore.cityWeatherList$;
  }

  protected save(): void {
    this.coordsStore
      .setCoordBy$(this.cityNameControl.value)
      .subscribe(() => this.cityNameControl.reset());
  }
  // protected deleteCity(index: number) {
  //   this.coordsStore.deleteCoordBy(index);
  // }
}