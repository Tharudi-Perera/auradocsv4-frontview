import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ACCESS_REQUEST } from '../apis.path';
import { USERNAME } from 'src/app/utility/constants.utility';

@Injectable({
  providedIn: 'root',
})
export class DocRequestService {
  constructor(private httpClient: HttpClient) {}

  postAccessRequest(documentId: number, message: string) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + ACCESS_REQUEST,
      {
        documentId: documentId,
        requestMessage: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: {
          username: localStorage.getItem(USERNAME),
        },
      }
    );
  }

  updateAccessRequest(
    documentId: number,
    isAllowed: boolean,
    reqByUser: string
  ) {
    return this.httpClient.put<any>(
      environment.apiBaseURL + ACCESS_REQUEST,
      {
        documentId: documentId,
        isAllowed: isAllowed,
        reqByUser: reqByUser,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: {
          username: localStorage.getItem(USERNAME),
        },
      }
    );
  }

  deleteAccessRequest(documentId: number, removeUser: string) {
    return this.httpClient.delete<any>(
      environment.apiBaseURL + ACCESS_REQUEST,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: {
          username: localStorage.getItem(USERNAME),
        },
        body: {
          documentId: documentId,
          removeUser: removeUser,
        },
      }
    );
  }
}
