import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

export abstract class ApiService {
  private static readonly PREFIX = !environment.production
    ? "/api"
    : environment.rootUrl;

  constructor(protected readonly http: HttpClient) {}

  protected get$<TData extends object>(
    url: string,
    params?: object
  ): Observable<TData> {
    return this.http.get<TData>(`${ApiService.PREFIX}/${url}`, params);
  }
}
