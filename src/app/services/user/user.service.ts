import { Injectable } from '@angular/core';
import { GET_ALL_USERS, GET_USER, SAVE_USER, UPDATE_USER } from 'src/app/services/apis.path';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/AppUser.model';
import { environment } from 'src/environments/environment';
import { USER_ID } from 'src/app/utility/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  saveUser(user: User) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + SAVE_USER,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  }

  getCustomer() {
    let customerId = parseInt(localStorage.getItem(USER_ID));
    // let customerId = localStorage.getItem(USER_ID);
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_USER + `/${customerId}`
      ,
      {
        headers: {
          'Accept': 'application/json',
        },

      }
    )
  }

  updateCustomer(user: User) {
    return this.httpClient.put(
      environment.apiBaseURL + UPDATE_USER + `/${localStorage.getItem(USER_ID)}`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
  }

  getAllUsers() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_ALL_USERS,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  }
}


