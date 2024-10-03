import axios from "axios";
import ContactList from "./ContactList";
import DirectoryForm from "./Directory-Form";
import {
  createContactResponse,
  getContactsResponse,
} from "../interface/ApiResponse";
import { useEffect, useState } from "react";
import { Contact } from "../interface/contacts";

const Directory = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Fetch contacts from API
  const fetchContact = async () => {
    const response = await axios.get<getContactsResponse>(
      "http://localhost:8000/api/contacts"
    );
    console.log(response.data);
    setContacts(response.data.data);
  };

  // useEffect hook to fetch contacts when component mounts
  useEffect(() => {
    fetchContact();
  }, []);

  // Function to handle add user
  const handleAddUser = async (name: string, phone: number) => {
    const newContact: Contact = {
      name,
      phone,
    };
    const response = await axios.post<createContactResponse>(
      "http://localhost:8000/api/contacts",
      newContact
    );
    console.log("response", response.data.data);

    setContacts((prevContact) => [...prevContact, response.data.data]);
  };

  //to save in local storage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  //to fetch from local storage
  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    if (contacts && contacts.length > 0) {
      setContacts(localContacts);
    }
  }, []);

  return (
    <div className="directory-container">
      <h1>
        <img
          src="https://icon-library.com/images/contacts-icon-png/contacts-icon-png-21.jpg"
          alt="phone directory logo"
          style={{ height: "10%", width: "10%", marginTop: "10px" }}
        />
        Phone Directory
      </h1>
      <h2>
        Contact Counter: <span id="contact-counter">{contacts.length}</span>
      </h2>
      {/* Form here */}
      <DirectoryForm handleAddUser={handleAddUser} />
      {/* Contact list here */}
      <ContactList contacts={contacts} fetchContact={fetchContact} />
    </div>
  );
};

export default Directory;
