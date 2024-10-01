import { useState } from "react";

interface DirectoryFormProps {
  handleAddUser: (name: string, phone: number) => void;
}

const DirectoryForm: React.FC<DirectoryFormProps> = (props) => {
  const { handleAddUser } = props;

  // State for form inputs
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);

  // Handle form submission event
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && phone) {
      handleAddUser(name, phone);
      setName("");
      setPhone(0);
    }
  };

  return (
    <form className="directory-form" onSubmit={onSubmit}>
      <div className="directory-input">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <input
          type="number"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(Number(e.target.value));
          }}
          required
        />
      </div>
      <div className="directory-submit">
        <button type="submit" className="update">
          Add
        </button>
        <button
          type="button"
          className="reset"
          onClick={() => {
            setName("");
            setPhone(0);
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default DirectoryForm;
