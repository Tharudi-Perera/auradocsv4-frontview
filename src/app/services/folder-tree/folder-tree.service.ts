import { Injectable } from '@angular/core';
import { DELETE_FILE, FORWARD_DOC_TO_USER, GET_FILE_EXPLORER_TREE, GET_FOLDER_TREE, MOVE_FILE, RENAME_FILE } from '../apis.path';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FolderTree } from 'src/app/models/FolderTree.model';
import { environment } from 'src/environments/environment';
import { USERNAME } from 'src/app/utility/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class FolderTreeService {

  constructor(private httpClient: HttpClient) { }

  getFolderTree(): Observable<FolderTree[]> {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_FOLDER_TREE, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        username: localStorage.getItem(USERNAME)
      }
    });
  }

  moveFile(nodeId: string, parentId: string) {
    const requestBody = {
      username: localStorage.getItem(USERNAME),
      parentId: parentId,
      nodeId: nodeId
    }
    return this.httpClient.put(
      environment.apiBaseURL + MOVE_FILE, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  fileRename(filePath: string, rename: string) {
    const requestBody = {
      filepath: filePath,
      renameto: rename,
      username: localStorage.getItem(USERNAME)
    }
    return this.httpClient.put(
      environment.apiBaseURL + RENAME_FILE, JSON.stringify(requestBody),
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  }

  deleteFile(filePath: string) {
    const requestBody = {
      filepath: filePath,
      username: localStorage.getItem(USERNAME)
    }
    return this.httpClient.delete(
      environment.apiBaseURL + DELETE_FILE, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
  }

  getFileExplorerTree() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_FILE_EXPLORER_TREE + `?username=indikak`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // params: {
      //   username: localStorage.getItem(USERNAME)
      // }
    });
  }

  getMyDocumentsTree() {
    return this.httpClient.get<any>(
      environment.apiBaseURL + GET_FILE_EXPLORER_TREE + `?username=indikak`, { // + `?username=${localStorage.getItem(USERNAME)}`
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // params: {
      //   username: localStorage.getItem(USERNAME)
      // }
    });
  }

  forwardToUser(toUser: string, docpath: string[]) {
    return this.httpClient.post<any>(
      environment.apiBaseURL + FORWARD_DOC_TO_USER,
      {
        "toUser": toUser,
        "docpath": docpath
      },
      {
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
