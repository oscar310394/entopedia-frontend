import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Arthropod } from '../../arthropod';

@Injectable()
export class ArthropodService {

  baseUrl: string = "http://localhost:3000/entopedia/arthropod";

  constructor(private http: HttpClient) { }

  getArthropod() {
    return this.http.get<Arthropod[]>(`${this.baseUrl}`)
      .map(arthropod => arthropod);
  }

  addArthropod(newUser: Arthropod) {
    return this.http.post<Arthropod>(`${this.baseUrl}`, newUser)
      .map(arthropod => arthropod);
  }

  updateArthropod(newUser: Arthropod) {
    return this.http.put(`${this.baseUrl}/${newUser.id}`, newUser)
      .map(res => res);
  }

  deleteArthropod(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .map(res => res);
  }
}
