import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ResumeServiceService {
  baseURL = global.baseURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  addImg(profileImage:File):Observable<any> {
      let formData:any = new FormData();
      formData.append("avatar", profileImage);

      return this.http.post<any>(`${this.baseURL}/img`, formData, {
        reportProgress: true,
        observe: 'events'
      })
  }
}
