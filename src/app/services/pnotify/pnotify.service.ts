import { Injectable } from '@angular/core';
import { notice, error, success, alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import * as Confirm from "@pnotify/confirm";
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { ModuleEntry } from '@pnotify/core';
import { alertProps } from 'src/app/models/Alert.model';
import { ALERT, OPERATION_FAILED, OPERATION_INFO, OPERATION_NOTICE, OPERATION_SUCCESSFUL } from 'src/app/utility/message-alerts.utility';

defaultModules.set(PNotifyMobile, {});

@Injectable({
  providedIn: 'root',

})
export class PnotifyService {

  constructor() { }

  alert(alertProps: alertProps) {
    return alert({
      title: alertProps.title || ALERT,
      text:
        alertProps.message,
      modules: alertProps.hasConfirm ? new Map([
        [
          Confirm,
          {
            confirm: true,
            buttons: [
              {
                text: alertProps.confirmMessage || 'OK',
                primary: true,
                click: notice => {
                  notice.close();
                }
              }
            ]
          }
        ] as ModuleEntry<typeof Confirm>
      ]) : new Map()
    });
  }

  success(alert: alertProps) {
    return success({
      title: alert.title || OPERATION_SUCCESSFUL,
      text:
        alert.message,
      modules: alert.hasConfirm ? new Map([
        [
          Confirm,
          {
            confirm: true,
            buttons: [
              {
                text: alert.confirmMessage || 'OK',
                primary: true,
                click: notice => {
                  notice.close();
                }
              }
            ]
          }
        ] as ModuleEntry<typeof Confirm>
      ]) : new Map()
    });
  }

  error(alert: alertProps) {
    return error({
      title: alert.title || OPERATION_FAILED,
      text:
        alert.message,
      modules: alert.hasConfirm ? new Map([
        [
          Confirm,
          {
            confirm: true,
            buttons: [
              {
                text: alert.confirmMessage || 'OK',
                primary: true,
                click: notice => {
                  notice.close();
                }
              }
            ]
          }
        ] as ModuleEntry<typeof Confirm>
      ]) : new Map()
    });
  }

  notice(alert: alertProps) {
    return notice({
      title: alert.title || OPERATION_NOTICE,
      text:
        alert.message,
      modules: alert.hasConfirm ? new Map([
        [
          Confirm,
          {
            confirm: true,
            buttons: [
              {
                text: alert.confirmMessage || 'OK',
                primary: true,
                click: notice => {
                  notice.close();
                }
              }
            ]
          }
        ] as ModuleEntry<typeof Confirm>
      ]) : new Map()
    });
  }

  info(alert: alertProps) {
    return notice({
      title: alert.title || OPERATION_INFO,
      text:
        alert.message,
      modules: alert.hasConfirm ? new Map([
        [
          Confirm,
          {
            confirm: true,
            buttons: [
              {
                text: alert.confirmMessage || 'OK',
                primary: true,
                click: notice => {
                  notice.close();
                }
              }
            ]
          }
        ] as ModuleEntry<typeof Confirm>
      ]) : new Map()
    });
  }


}


