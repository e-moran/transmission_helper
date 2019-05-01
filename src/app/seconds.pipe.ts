import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seconds'
})
export class SecondsPipe implements PipeTransform {

  static pad(val: number): string {
    let res: string = '' + val;
    if (res.length === 1) {
      res = '0' + res;
    }
    return res;
  }
  transform(value: number): string {
    let timeString = '';
    let remainingTime = value;
    if (value >= 86400) {
      const days: number = Math.floor(remainingTime / 86400);
      timeString += SecondsPipe.pad(days) + ':';
      remainingTime -= days * 86400;
    }
    if (value >= 3600) {
      const hours: number = Math.floor(remainingTime / 3600);
      timeString += SecondsPipe.pad(hours) + ':';
      remainingTime -= hours * 3600;
    }
    if (value >= 60) {
      const minutes: number = Math.floor( remainingTime / 60);
      timeString += SecondsPipe.pad(minutes) + ':';
      remainingTime -= minutes * 60;
    }
    timeString += SecondsPipe.pad(remainingTime);
    return timeString;
  }

}
