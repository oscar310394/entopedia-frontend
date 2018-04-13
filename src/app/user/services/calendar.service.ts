import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { CalendarEventDB } from '../../event';

@Injectable()
export class CalendarService {
  baseUrl: string = "http://localhost:3000/entopedia/calendar";

  constructor(private http: HttpClient) { }

  getCalendar() {
    return this.http.get<CalendarEventDB[]>(`${this.baseUrl}`)
      .map(calendar => calendar);
  }

  addCalendar(newEvent: CalendarEventDB) {
    return this.http.post<CalendarEventDB>(`${this.baseUrl}`, newEvent)
      .map(calendar => calendar);
  }

  updateCalendar(newEvent: CalendarEventDB) {
    return this.http.put(`${this.baseUrl}/${newEvent.id}`, newEvent)
      .map(res => res);
  }

  deleteCalendar(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .map(res => res);
  }

}
