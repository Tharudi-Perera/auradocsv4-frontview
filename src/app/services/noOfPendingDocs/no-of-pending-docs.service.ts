import {Injectable} from '@angular/core';
import {GET_PENDING_DOC_STAT, IN_FOLDER} from "../apis.path";
import {UploadDocumentService} from "../upload-document/upload-document.service";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {USERNAME} from 'src/app/utility/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class NoOfPendingDocsService {
  private documents = new BehaviorSubject<number>(0);
  private nextFolder = new BehaviorSubject<number>(0);

  constructor(
    private httpClient: HttpClient
  ) {

  }

  //findNoOfDocs() will be called in 'app-dashboard-cards'

  findNoOfDocs(): void {
    this.getPendingDocStats().subscribe({
      next: data => {
        this.documents.next(data.data['pending docs']);
        this.nextFolder.next(data.data['next folder']);
      },
      error: () => {
        this.documents.next(0);
        this.nextFolder.next(0);
      }
    })
  }
  getNoOfDocs:Observable<number> = this.documents.asObservable();

  setNoOfDocs(noOfDocs: number): void {
    this.documents.next(noOfDocs);
  }

  getNextFolder = this.nextFolder.asObservable()
  getPendingDocStats() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_PENDING_DOC_STAT, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        params: {
          username: localStorage.getItem(USERNAME)
        }
      });
  }
}
