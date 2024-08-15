import { Injectable } from '@angular/core';
import { GET_DOCUMENT, GET_FOLDER_DOCUMENTS, GET_USER_FOLDER, POST_DOCUMENTS, POST_INDEX_DOCUMENT } from '../apis.path';
import { HttpClient } from '@angular/common/http';
import { DocumentIndex } from 'src/app/models/IndexDocument.model';
import { environment } from 'src/environments/environment';
import { SESSION_ID, USERNAME } from 'src/app/utility/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {

  constructor(private httpClient: HttpClient) { }

  uploadDocuments(file: any) {
    return this.httpClient.post(
      environment.apiBaseURL + POST_DOCUMENTS, file,
      {
        reportProgress: true,
        observe: "events"
      });
  }

  getDocument(filePath: string) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_DOCUMENT, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: localStorage.getItem(USERNAME),
        filepath: filePath
      }
    });
  }

  getDocumentsInFolder(filepath: string) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_FOLDER_DOCUMENTS, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        filepath: filepath,
        username: localStorage.getItem(USERNAME)
      }
    });
  }

  getFolderItems(path: string) {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_USER_FOLDER, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        base: path,
        username: localStorage.getItem(USERNAME)
      }
    });
  }

  indexDocument(indexFormData: DocumentIndex[]) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + POST_INDEX_DOCUMENT,
      indexFormData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: localStorage.getItem(USERNAME),
        sessionId: localStorage.getItem(SESSION_ID)
      }
    });
  }

  private startTime: number;
  private endTime: number;

  startTimer() {
    this.startTime = new Date().getTime();
  }

  stopTimer() {
    this.endTime = new Date().getTime();
  }

  getUploadSpeed(bytesUploaded: number): number {
    const elapsedTimeInSeconds = (this.endTime - this.startTime) / 1000;
    return bytesUploaded / elapsedTimeInSeconds;
  }
}
