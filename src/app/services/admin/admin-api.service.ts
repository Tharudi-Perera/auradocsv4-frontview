import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GET_MST_TEMPLATE, GET_MST_TEMPLATES, GET_TEMPLATE_FILES, POST_MASKING, POST_MST_TEMPLATE } from '../apis.path';
import { USERNAME } from 'src/app/utility/constants.utility';
import {MstTemplate} from "../../models/Mst-template.model";
import {Masking} from "../../models/Masking.model";

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private httpClient: HttpClient) { }

  saveMstTemplate(requestBody: MstTemplate) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + POST_MST_TEMPLATE, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  getTemplateData(operation: string, templateId: number) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_MST_TEMPLATE + `/${templateId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username:  'admin', //localStorage.getItem(USERNAME)
        operation: operation
      }
    })
  }

  getTemplates(operation: string) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_MST_TEMPLATES, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username:  'admin', //localStorage.getItem(USERNAME)
        operation: operation
      }
    })
  }

  getTemplateRelatedFiles(templateId: number) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_TEMPLATE_FILES, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: 'admin', // localStorage.getItem(USERNAME),
        template_id: templateId
      }
    })
  }

  saveMasking(masking: Masking) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + POST_MASKING, masking, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        params: {
          username: localStorage.getItem(USERNAME)
        }
      }
    )
  }
}
