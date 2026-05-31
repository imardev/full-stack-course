import { useState, UseEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  UseEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/imardev/full-stack-course/notes",
      )
      .then((response) => {
        setPersons(response.data);
      });
  }, []);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.max(...persons.map((p) => p.id)) + 1,
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <Filter
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <Form
        onSubmit={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
