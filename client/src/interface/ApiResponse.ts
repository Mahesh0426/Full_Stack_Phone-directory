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

// delete a contact
export interface deleteContactResponse {
  status: boolean;
  message: string;
  data: Contact;
}
