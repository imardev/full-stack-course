import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonService from "./services/Services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener los contactos del backend al cargar el componente
  useEffect(() => {
    PersonService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((e) => {
        console.error("Error fetching data:", e);
      });
  }, []);

  // Función para agregar un nuevo contacto
  const addPerson = (event) => {
    event.preventDefault();
    // Objeto del nuevo contacto
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // Verificar si el nombre ya existe en la lista de contactos
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");

    // Agregar el nuevo contacto al backend
    PersonService.create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      })
      .catch((e) => {
        console.error("Error adding person:", e);
      });
  };

  // Función para eliminar contacto con boton
  const handleDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id)?.name}?`,
      )
    ) {
      PersonService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((e) => {
          console.error("Error deleting person:", e);
        });
    }
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
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
