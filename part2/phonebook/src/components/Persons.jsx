const Persons = ({ allPersons, searchTerm, onDelete }) => {
  const filteredPersons = () => {
    return allPersons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );
  };
  const persons =
    searchTerm.trim().length === 0 ? allPersons : filteredPersons();
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
