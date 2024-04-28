import { Injectable } from "@angular/core";
import { WeatherApiService } from "@app/api/weather-api.service";
import { StorageService } from "@app/services/storage.service";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { CustomError } from "./error-handler.service";

export interface Coord {
  lat: number;
  lon: number;
}

export interface CoordStore extends Coord {
  id: number;
}

@Injectable({ providedIn: "root" })
export class CoordsStoreService {
  private static readonly STORAGE_KEY = "coords";
  private readonly coordsStore$ = new BehaviorSubject<CoordStore[]>([]);
  private readonly addCoordEventStore$ = new Subject<CoordStore>();
  private readonly removeCoordEventStore$ = new Subject<CoordStore["id"]>();

  constructor(
    private readonly storage: StorageService,
    private readonly api: WeatherApiService
  ) {
    this.init();
  }

  private init(): void {
    try {
      const coords = this.storage.get<CoordStore[]>(
        CoordsStoreService.STORAGE_KEY
      );
      if (coords === null || !Array.isArray(coords)) {
        throw "Wrong type of coords data, or empty storage";
      }

      this.coordsStore$.next(coords);
    } catch (err) {
      // todo: to handle with info for user
      console.error(err);
    }
  }

  public setCoordBy$(cityName: string) {
    return this.api.getCoordinatesOf$(cityName).pipe(
      tap((coords) => {
        if (coords.length < 1) {
          throw new CustomError("USER", "Wpisane miasto nie istnieje");
        }

        // TODO: check duplicates
        this.coords = { lat: coords[0].lat, lon: coords[0].lon };
        console.log(this.coords);
      })
    );
  }

  private set coords(coord: Coord) {
    const newCoord = { ...coord, id: this.generatedId };
    this.coordsStore$.next([...this.coordsStore$.value, newCoord]);
    this.addCoordEventStore$.next(newCoord);
    this.storage.set(CoordsStoreService.STORAGE_KEY, this.coordsStore$.value);
  }

  public deleteCoordBy(id: CoordStore["id"]): void {
    const indexCoordToDelete = this.coordsStore$.value.findIndex(
      (coord) => id === coord.id
    );

    if (indexCoordToDelete === -1) {
      console.error(`Can't find coord with id: ${id}`);
      return;
    }

    this.removeCoordFromStore(indexCoordToDelete);
    console.log(this.coordsStore$);
  }

  private get generatedId(): number {
    return Math.floor(Math.random() * 10000);
  }

  private removeCoordFromStore(indexCoordToDelete: number): void {
    console.log({ indexCoordToDelete });
    this.removeCoordEventStore$.next(
      this.coordsStore$.value[indexCoordToDelete].id
    );
    this.coordsStore$.value.splice(indexCoordToDelete, 1);
    this.coordsStore$.next(this.coordsStore$.value);
    this.storage.set(CoordsStoreService.STORAGE_KEY, this.coordsStore$.value);
  }

  public get addCoordEventObserver$() {
    return this.addCoordEventStore$.asObservable();
  }

  public get removeCoordEventObserver$() {
    return this.removeCoordEventStore$.asObservable();
  }

  public get coords(): CoordStore[] {
    return this.coordsStore$.value;
  }

  public get coords$() {
    return this.coordsStore$.asObservable();
  }
}
