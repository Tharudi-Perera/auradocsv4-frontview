export interface ShareDocumentEmail {
  docId: number;
  shareToEmail: string[];
  username: string;
  asAttachment: boolean;
  sessionId: string;
  message: string;
  templateName: string; 
}
