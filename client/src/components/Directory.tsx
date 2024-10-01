import axios from "axios";
import ContactLIst from "./ContactList";
import DirectoryForm from "./Directory-Form";
import { getContactsResponse } from "../interface/ApiResponse";
import { useEffect, useState } from "react";
import { Contact } from "../interface/contacts";

const Directory: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  //  fetch contacts from API
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

  // functio to handle add user
  const handleAddUser = async (name: string, phone: number) => {
    const newContact: Contact = {
      name,
      phone,
    };
    const response = await axios.post(
      "http://localhost:8000/api/contacts",
      newContact
    );
    ``;
    console.log("response", response.data.data);

    setContacts((prevContact) => [...prevContact, response.data.data]);
    //clear input
    setName("");
    setPhone(0);
  };

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
        Contact Counter: <span id="conntact-counter">{}</span>
      </h2>
      {/* form here  */}
      <DirectoryForm handleAddUser={handleAddUser} />
      {/* contact list here */}
      <ContactLIst contacts={contacts} />
    </div>
  );
};
export default Directory;
