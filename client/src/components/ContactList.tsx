import { Contact } from "../interface/contacts";
import ContactItem from "./ContactItem";

interface ContactListProps {
  contacts: Contact[];
}
const ContactLIst = (props: ContactListProps) => {
  const { contacts } = props;
  return (
    <div className="directory-list">
      <ul id="contact-list">
        {/* {contacts.map((contact, index) => {
          return <ContactItem key={index} contact={contact} />;
        })} */}
        {contacts.map((contact, index) => (
          <ContactItem key={index} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactLIst;
