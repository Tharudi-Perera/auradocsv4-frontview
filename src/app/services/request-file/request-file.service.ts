import { Injectable } from '@angular/core';
import { GET_FILE_AS_PDF, GET_REQUEST_FILE, GET_TEMPLATE_FORM, GET_USER_TEMPLATES } from '../apis.path';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  OFFICE,
  IMAGE,
  PNG,
  JPEG,
  JPG,
  USERNAME,
  MP3,
  MP4,
  TIF,
  GIF,
} from 'src/app/utility/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class RequestFileService {

  constructor(private httpClient: HttpClient) { }

  getRequestedFile(filePath: string) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_REQUEST_FILE, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        filePath: filePath,
        username: localStorage.getItem(USERNAME)
      }
    });
  }

  getTemplates() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_USER_TEMPLATES + `/indikak`, {  // ${localStorage.getItem(USERNAME)}
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  getTemplateForm(id: number) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_TEMPLATE_FORM + `/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

}
