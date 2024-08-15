import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GET_DASHBOARD_DATA, GET_INDEX_HISTORY, GET_USER_HISTORY } from '../apis.path';
import { USERNAME } from 'src/app/utility/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getIndexHistory() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_INDEX_HISTORY, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: localStorage.getItem(USERNAME)
      }
    })
  }

  getUserHistory() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_USER_HISTORY, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: localStorage.getItem(USERNAME)
      }
    })
  }

  getAllDashboardData() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_DASHBOARD_DATA, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: localStorage.getItem(USERNAME)
      }
    })
  }
}
