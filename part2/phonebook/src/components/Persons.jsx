const Persons = ({ persons, searchTerm, onDelete }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((person) => (
      <div key={person.id}>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        <button onClick={() => onDelete(person.id)}>Delete</button>
      </div>
    ));
};

export default Persons;
