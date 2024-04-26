import { Coord } from "@app/services/coords-store.service";

export interface CoordinatesDirectByCityNameResponse extends Coord {
  country: string;
  local_names: Record<string, string>;
  name: string;
  state: string;
}

export interface CityWeatherResponse {
  base: string;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: CityWeatherMainData;
  name: string;
  sys: Record<string, number | string>;
  timezone: number;
  visibility: number;
  weather: [CityWeatherIcon];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface CityWeatherMainData {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}
export interface CityWeatherIcon {
  id: number;
  main: string;
  description: string;
  icon: string;
}
