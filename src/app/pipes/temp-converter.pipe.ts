import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "tempConventer", standalone: true })
export class TempConventerPipe implements PipeTransform {
  transform(temp: number, isCel: boolean): string {
    if (isCel) {
      return temp.toFixed(0) + "°C";
    }
    return ((temp * 9) / 5 + 32).toFixed(0) + "°F";
  }
}
