import { Injectable } from "@angular/core";
import { Nullable } from "@app/models/generic.model";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private static readonly DEFAULT_PREFIX: string = "—";
  private currentPrefix: string = StorageService.DEFAULT_PREFIX;

  constructor() {}

  public usePrefix(prefix: string): void {
    this.currentPrefix = prefix ?? StorageService.DEFAULT_PREFIX;
  }

  public set(
    name: string,
    value: unknown,
    storage: "local" | "session" = "local",
    options: { ignorePrefix: boolean } = { ignorePrefix: true }
  ): void {
    const keyName: string = options?.ignorePrefix
      ? name
      : this.getPrefixedName(name);
    storage === "local"
      ? localStorage.setItem(keyName, JSON.stringify(value))
      : sessionStorage.setItem(keyName, JSON.stringify(value));
  }

  public get<TData>(
    name: string,
    storage: "local" | "session" = "local",
    options: { ignorePrefix: boolean } = { ignorePrefix: true }
  ): Nullable<TData> {
    const keyName: string = options?.ignorePrefix
      ? name
      : this.getPrefixedName(name);
    const value: string | null =
      storage === "local"
        ? localStorage.getItem(keyName)
        : sessionStorage.getItem(keyName);

    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  public remove(name: string, storage: "local" | "session" = "local"): void {
    storage === "local"
      ? localStorage.removeItem(name)
      : sessionStorage.removeItem(name);
  }

  public clearAll(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  private getPrefixedName(name: string): string {
    return `${this.currentPrefix}_${name}`;
  }
}
