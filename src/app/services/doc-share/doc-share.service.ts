import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShareDocumentToUser } from 'src/app/models/ShareDocumentToUser.dto';
import { environment } from 'src/environments/environment';
import {
  POST_SHAREDOC_EMAIL,
  POST_SHAREDOC_LINK,
  POST_SHAREDOC_USER
} from '../apis.path';
import { ShareDocumentEmail } from 'src/app/models/ShareDocumentEmail.dto';
import { ShareDocLink } from 'src/app/models/ShareDocLink.dto';

@Injectable({
  providedIn: 'root',
})
export class DocShareService {
  constructor(private httpClient: HttpClient) {}

  shareDocumentToUser(dto: ShareDocumentToUser) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + POST_SHAREDOC_USER,
      dto,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  shareDocumentByEmail(dto: ShareDocumentEmail) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + POST_SHAREDOC_EMAIL,
      dto,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  shareDocumentByLink(dto: ShareDocLink) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + POST_SHAREDOC_LINK,
      dto,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }
}
