/**
 * @license
 * Copyright (c) 2019 Jonathan Catmull.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Pipe, PipeTransform } from '@angular/core';

type unit = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
type unitPrecisionMap = {
  [u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
  bytes: 0,
  KB: 0,
  MB: 1,
  GB: 1,
  TB: 2,
  PB: 2
};

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that can be a number or a map for each unit.
 * Usage:
 *   bytes | fileSize:precision
 * @example
 * // returns 1 KB
 * {{ 1500 | fileSize }}
 * @example
 * // returns 2.1 GB
 * {{ 2100000000 | fileSize }}
 * @example
 * // returns 1.46 KB
 * {{ 1500 | fileSize:2 }}
 */
@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  private readonly units: unit[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  transform(bytes: number = 0, precision: number | unitPrecisionMap = defaultPrecisionMap): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];

    if (typeof precision === 'number') {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;
  }
}
// import { Pipe, PipeTransform } from '@angular/core';
//
// const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
// const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];
//
//
// @Pipe({
//   name: 'fileSize'
// })
// export class FileSizePipe implements PipeTransform {
//
//   transform(sizeInBytes: number, longForm: boolean): string {
//     const units = longForm
//       ? FILE_SIZE_UNITS_LONG
//       : FILE_SIZE_UNITS;
//
//     let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
//     power = Math.min(power, units.length - 1);
//
//     const size = sizeInBytes / Math.pow(1024, power); // size in new units
//     const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
//     const unit = units[power];
//
//     return size ? `${formattedSize} ${unit}` : '0';
//   }
//
// }
