import { Injectable } from '@angular/core';
import * as moment from 'moment';

export type FormatDate = 'DD/MM/YYYY'|'YYYY/MM/DD'|'YYYY, MM, DD'|'YYYY-MM-DD'

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() { }

  now(): string{
    return moment().utc(true).toISOString();
 }

  nowWithFormat(format: FormatDate){
    return moment(this.now()).format(format);
 }
}
