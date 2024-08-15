import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SEARCH_ALL, SEARCH_ALL_DB, SEARCH_BY_KEYWORD, VIEW_ALL_DOCUMENTS_DB, VIEW_DOCUMENT, VIEW_DOCUMENT_IMAGE, VIEW_SELECTED_DOCUMENTS_DB } from '../apis.path';
import { SESSION_ID, USERNAME } from 'src/app/utility/constants.utility';
import { SearchOperation } from 'src/app/enum/search-operation.enum';

@Injectable({
  providedIn: 'root',
})
export class DocSearchService {
  constructor(private httpClient: HttpClient) { }

  advancedSearch(
    page: number,
    size: number,
    anyword: string,
    allwords: string,
    documentStart: number,
    documentEnd: number,
    dateStart: string,
    dateEnd: string,
    template: string,
    isPrivateDocument: boolean,
    isInTrash: boolean
  ) {
    if (environment.searchSource === 'DB') {
      return this.searchAll(page, size, anyword);
    } else {
      return this.httpClient.get<any>(
        environment.apiBaseURL + SEARCH_BY_KEYWORD,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          params: {
            username: localStorage.getItem(USERNAME),
            page: page,
            size: size,
            anyword: anyword,
            allwords: allwords,
            documentStart: documentStart,
            documentEnd: documentEnd,
            dateStart: dateStart,
            dateEnd: dateEnd,
            template: template,
            isPrivateDocument: isPrivateDocument,
            isInTrash: isInTrash,
          },
        }
      );
    }
  }

  searchAll(page: number, size: number, keyword: string) {
    if (environment.searchSource === 'DB') {
      return this.httpClient.get<any>(
        environment.apiBaseURL + SEARCH_ALL_DB + '/' + page,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          params: {
            size: size,
            username: localStorage.getItem(USERNAME),
            keyword: keyword
          },
        }
      );
    } else {
      return this.httpClient.get<any>(
        environment.apiBaseURL + SEARCH_ALL + '/' + page,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          params: {
            size: size,
            username: localStorage.getItem(USERNAME),
            keyword: keyword
          },
        }
      );
    }
  }

  getDocument(docId: number, operation: SearchOperation) {
    if (environment.searchSource === 'DB') {
      return this.httpClient.get<any>(environment.apiBaseURL + VIEW_DOCUMENT_IMAGE + `/${operation.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        params: {
          docId: docId,
          username: localStorage.getItem(USERNAME),
          sessionId: localStorage.getItem(SESSION_ID),
        }
      });
    } else {
      return this.httpClient.get<any>(environment.apiBaseURL + VIEW_DOCUMENT + `/${operation.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        params: {
          docId: docId,
          sessionId: localStorage.getItem(SESSION_ID),
          username: localStorage.getItem(USERNAME),
        },
      });
    }
  }

  viewAllDocuments(page: number, size: number, keyword: string) {
    return this.httpClient.get<any>(environment.apiBaseURL + VIEW_ALL_DOCUMENTS_DB, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        page: page,
        size: size,
        username: localStorage.getItem(USERNAME),
        keyword: keyword
      },
    });
  }

  viewSelectedDocuments(docIds: number[]) {
    return this.httpClient.get<any>(environment.apiBaseURL + VIEW_SELECTED_DOCUMENTS_DB, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: localStorage.getItem(USERNAME),
        docId: docIds
      },
    });
  }
}
