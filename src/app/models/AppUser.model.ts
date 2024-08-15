import { Gender } from "../enum/gender";

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: string[];
  sessionId: string;
  dlNumber?: string;
  mobileNumber?: number;
  gender?: Gender;
  departments?: string[];
  zipcode?: string;
  updatedTime?: string;
}
