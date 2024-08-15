import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(boolVal: any,modalName:string) {
    this.emitChangeSource.next({boolVal,modalName});
  }
  emitChangeWithDocId(boolVal: any,modalName:string,id:number,isViewSelectedOrViewAll:boolean) { //this is for sending doc id in search page to open MoreMetaData form
    this.emitChangeSource.next({boolVal,modalName,id,isViewSelectedOrViewAll});
  }
}
