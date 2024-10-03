import { useState } from "react";
import { Contact } from "../interface/contacts";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

interface ContactItemProps {
  contact: Contact;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string, newPhone: number) => void;
}

const ContactItem = ({ contact, onDelete, onEdit }: ContactItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(contact.name);
  const [newPhone, setNewPhone] = useState(contact.phone);

  const handleSave = () => {
    if (newName && newPhone) {
      onEdit(contact._id!, newName, newPhone);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          {" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="input-no-border"
            autoFocus
          />
          <input
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(Number(e.target.value))}
            className="input-no-border"
          />
          <button className="edit" onClick={handleSave}>
            <IoSaveOutline />
          </button>
        </>
      ) : (
        <>
          {contact.name} - {contact.phone}
          <button className="edit" onClick={() => setIsEditing(true)}>
            <CiEdit />
          </button>
          <button className="delete" onClick={() => onDelete(contact._id!)}>
            <MdOutlineDelete />
          </button>
        </>
      )}
    </li>
  );
};

export default ContactItem;
