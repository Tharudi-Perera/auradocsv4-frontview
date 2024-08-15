export interface ShareDocLink {
  username: string;
  docId: number;
  withOtp: boolean;
  validTimeInMinute: number;
  mobile: number;
  sessionId: string;
  templateName: string;
}
