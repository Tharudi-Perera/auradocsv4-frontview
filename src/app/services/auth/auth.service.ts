import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {JWT, KEYCLOCK_UUID} from 'src/app/utility/constants.utility';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  passwordBody = {
    "type": "password",
    "temporary": false,
    "value": "Janitha@1996"
  }

  //THIS IS A ADMIN API CALL, THEREFORE USER MUST HAVE A REALM MANAGEMENT NAMED AS MANAGE USER IF NOT FORBIDDEN ERROR WILL COME
  resetUserPassword() {
    let realm = 'auraDOCS';
    let customerId=localStorage.getItem(KEYCLOCK_UUID)
    let token =localStorage.getItem(JWT) ;
    return this.httpClient.put(
      environment.keycloakUrl + `/admin/realms/${realm}/users/${customerId}/reset-password`,
      this.passwordBody,
      {
        headers:{'Authorization': `${token}`}
      }
    )
  }
}
