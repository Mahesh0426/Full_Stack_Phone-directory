import { Contact } from "../interface/contacts";

interface ContactItemProps {
  contact: Contact;
}

const ContactItem = (props: ContactItemProps) => {
  const { contact } = props;

  return (
    <>
      <li>
        {contact.name}-{contact.phone}
        <button className="edit" onClick={() => {}}>
          edit
        </button>
        <button className="delete" onClick={() => {}}>
          delete
        </button>
      </li>
    </>
  );
};

export default ContactItem;
