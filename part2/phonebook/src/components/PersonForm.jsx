import { handleChange } from "../utils";

const PersonForm = (props) => {
  const { onSubmit, newName, setNewName, newNumber, setNewNumber } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleChange(setNewName)} />
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleChange(setNewNumber)} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
