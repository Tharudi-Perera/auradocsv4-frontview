export interface MstTemplate {
  name: string;
  zoomYn: boolean;
  indexingYn: boolean;
  emailYn: boolean;
  downloadYn: boolean;
  watermarkYn: boolean;
  encryptYn: boolean;
  docAlertSMS: boolean;
  docAlertEmail: boolean;
  printYn: boolean;
  folderIndex: boolean;
  blockchain: boolean;
  annotation: boolean;
  confirmYn: boolean;
  workflowYn: boolean;
  retentionDays: number;
  folderPath: string;
  fields: any[];
}
