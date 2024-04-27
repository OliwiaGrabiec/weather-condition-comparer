import { Injectable } from "@angular/core";
import { WeatherApiService } from "@app/api/weather-api.service";
import {
  CityWeatherIcon,
  CityWeatherMainData,
} from "@app/models/weather.model";
import { BehaviorSubject, forkJoin, mergeMap, take, tap } from "rxjs";
import { CoordStore, CoordsStoreService } from "./coords-store.service";

export interface CityWeather extends CityWeatherMainData {
  id: number;
  name: string;
  // weather: CityWeatherIcon[];
  icon: CityWeatherIcon["icon"];
}

@Injectable({ providedIn: "root" })
export class CityWeatherStoreService {
  private readonly cityWeatherStore$ = new BehaviorSubject<CityWeather[]>([]);

  constructor(
    private readonly coordsStore: CoordsStoreService,
    private readonly api: WeatherApiService
  ) {
    this.init$().subscribe();
    this.addCoordEventDetector$().subscribe();
    this.removeCoordEventDetector$().subscribe();
  }

  private init$() {
    return this.coordsStore.coords$.pipe(
      take(1),
      mergeMap((coords) =>
        forkJoin(coords.map((coord) => this.setCityWeatherBy$(coord)))
      )
    );
  }

  private addCoordEventDetector$() {
    return this.coordsStore.addCoordEventObserver$.pipe(
      mergeMap((coord) => this.setCityWeatherBy$(coord))
    );
  }

  private setCityWeatherBy$(coord: CoordStore) {
    return this.api.getWeatherOf$(coord).pipe(
      tap(({ name, main, weather }) => {
        this.cityWeather = {
          name,
          id: coord.id,
          icon: weather[0].icon,
          ...main,
        };
      })
    );
  }

  private removeCoordEventDetector$() {
    return this.coordsStore.removeCoordEventObserver$.pipe(
      tap((id) => {
        const cityWeatherIndex = this.cityWeatherStore$.value.findIndex(
          (cityWeather) => cityWeather.id === id
        );
        if (cityWeatherIndex === -1) {
          console.error(`Cant find weather city with id: ${id}`);
          return;
        }

        this.cityWeatherStore$.value.splice(cityWeatherIndex, 1);
      })
    );
  }

  public sortWeatherByTemp(ascending: boolean): void {
    const soredtab = this.cityWeatherStore$.value.sort((a, b) => {
      return ascending ? a.temp - b.temp : b.temp - a.temp;
    });
    console.log(this.cityWeatherStore$.value);
    this.cityWeatherStore$.next([...this.cityWeatherStore$.value]);
  }

  public set cityWeather(cityWeather: CityWeather) {
    this.cityWeatherStore$.next([...this.cityWeatherStore$.value, cityWeather]);
  }

  public get cityWeatherList$() {
    return this.cityWeatherStore$.asObservable();
  }
}
