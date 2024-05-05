import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { InputComponent } from "@app/components/input/input.component";
import { Observable, of, tap } from "rxjs";
import {
  CityWeather,
  CityWeatherStoreService,
} from "../../services/city-weather-store.service";
import { CoordsStoreService } from "../../services/coords-store.service";
import { WeatherCardComponent } from "./weather-card/weather-card.component";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { RangeSliderCompnent } from "./range-slider/range-slider.component";
import { SortButtonCompnent } from "./sort-button/sort-button.component";
import { ToggleButtonCompnent } from "./toggle-button/toggle-button.component";

@Component({
  selector: "app-landing-view",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RangeSliderCompnent,
    SortButtonCompnent,
    ToggleButtonCompnent,
    MatSliderModule,
    ReactiveFormsModule,
    WeatherCardComponent,
    InputComponent,
    FormsModule,
  ],
  templateUrl: "./landing-view.component.html",
  styleUrl: "./landing-view.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingViewCompnent {
  protected isCel: boolean = true;
  protected readonly cityNameControl = new FormControl<string>("", {
    nonNullable: true,
    validators: [Validators.required],
  });
  protected cityWeatherList$: Observable<CityWeather[]>;

  constructor(
    private readonly coordsStore: CoordsStoreService,
    private readonly cityWeatherStore: CityWeatherStoreService
  ) {
    this.cityWeatherList$ = this.cityWeatherStore.cityWeatherList$;
  }
  protected changeUnit(cel: boolean): void {
    this.isCel = cel;
  }
  protected save(): void {
    if (this.cityNameControl.status === "INVALID") {
      this.cityNameControl.markAsTouched();
      return;
    }

    this.coordsStore
      .setCoordBy$(this.cityNameControl.value)
      .subscribe(() => this.cityNameControl.reset(""));
  }
}
