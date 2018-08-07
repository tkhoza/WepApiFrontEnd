import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.apiURL + '/api/WepApiData');
  }

  create(data) {
    return this.http.post(this.apiURL + '/api/WepApiData', data);
  }

  update(data) {
    return this.http.put(this.apiURL + '/api/WepApiData', data);
  }

  delete(data) {
    return this.http.delete(this.apiURL + '/api/WepApiData/' + data.Id);
  }

}
