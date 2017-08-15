import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'humanTime'
})
export class HumanTimePipe implements PipeTransform {

  transform(value: number): string {
    return moment.unix(value).fromNow();
  }

}
