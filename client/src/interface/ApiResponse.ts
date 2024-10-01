import { Contact } from "./contacts";

export interface getContactsResponse {
  status: boolean;
  message: string;
  data: Contact[];
}

export interface createContactResponse {
  status: boolean;
  message: string;
  data: Contact;
}
