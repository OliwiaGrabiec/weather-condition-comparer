import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  CityWeatherResponse,
  CoordinatesDirectByCityNameResponse,
} from "@app/models/weather.model";
import { Coord } from "@app/services/coords-store.service";
import { environment } from "../../enviroments/environment";
import { ApiService } from "./api.service";

@Injectable({ providedIn: "root" })
export class WeatherApiService extends ApiService {
  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  public getCoordinatesOf$(cityName: string) {
    return this.get$<[CoordinatesDirectByCityNameResponse]>(
      `geo/1.0/direct?q=${cityName}&limit=1&appid=${environment.token}`
    );
  }

  public getWeatherOf$({ lat, lon }: Coord) {
    return this.get$<CityWeatherResponse>(
      `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.token}`
    );
  }
}
