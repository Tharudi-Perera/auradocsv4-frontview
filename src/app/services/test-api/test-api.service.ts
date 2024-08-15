import { Injectable } from '@angular/core';
import { GET_TESTED } from '../apis.path';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  constructor(private httpClient: HttpClient) { }

  testApi() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_TESTED, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }
}
