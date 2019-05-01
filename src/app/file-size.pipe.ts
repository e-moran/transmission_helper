import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(bytes: number): any {
    const representations = [
      'B',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB'
    ];
    let unit = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }

    return bytes.toFixed(2) + representations[unit];
  }

}
