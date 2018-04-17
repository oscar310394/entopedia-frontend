import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Photo } from '../../photo';

@Injectable()
export class PhotoService {

  baseUrl: string = "http://localhost:3000/photo/artropodo";

  constructor(private http: Http) { }

  savePhoto(newPhoto: Photo) {
    return this.http.post(`${this.baseUrl}`, newPhoto);
  }

}
