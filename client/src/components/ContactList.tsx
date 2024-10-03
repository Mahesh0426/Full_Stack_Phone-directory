import { Contact } from "../interface/contacts";
import ContactItem from "./ContactItem";
import axios from "axios";

interface ContactListProps {
  contacts: Contact[];
  fetchContact: () => void;
}
const ContactList = (props: ContactListProps) => {
  const { contacts, fetchContact } = props;

  // function to handle on delete
  const handleOnDelete = async (id: string) => {
    try {
      // Send the delete request to the API
      await axios.delete(`http://localhost:8000/api/contacts/${id}`);
      // Update the contacts state
      fetchContact();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  // function to handle on edit
  const handleOnEdit = async (
    id: string,
    newName: string,
    newPhone: number
  ) => {
    try {
      // Send the PUT request to the API
      await axios.patch(`http://localhost:8000/api/contacts/${id}`, {
        name: newName,
        phone: newPhone,
      });
      // Update the contacts state
      fetchContact();
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };
  return (
    <div className="directory-list">
      <ul id="contact-list">
        {/* {contacts.map((contact, index) => {
          return <ContactItem key={index} contact={contact} />;
        })} */}
        {contacts.map((contact) => (
          <ContactItem
            key={contact._id}
            contact={contact}
            onDelete={handleOnDelete}
            onEdit={handleOnEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
