import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonService from "./services/Services";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageStatus, setMessageStatus] = useState("error");

  // Obtener los contactos del backend al cargar el componente
  useEffect(() => {
    PersonService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((e) => {
        console.error(e);
        setMessageStatus("error");
        setErrorMessage(`Error loading data`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  // Función para agregar un nuevo contacto
  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        PersonService.updateNumber(existingPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson,
              ),
            );
            setMessageStatus("success");
            setErrorMessage(`Updated ${newName}'s phone number successfully.`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((e) => {
            console.error(e);
            setMessageStatus("error");
            setErrorMessage(`Error updating number`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }

      return;
    }

    // Funcion para crear contacto
    PersonService.create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessageStatus("success");
        setErrorMessage(`${newName}'s created successfully.`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((e) => {
        console.error(e);
        setMessageStatus("error");
        setErrorMessage(`Error adding person`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
          const person = persons.find((person) => person.id === id);
          const name = person?.name;
          setMessageStatus("success");
          setErrorMessage(`${name}'s deleted successfully.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((e) => {
          console.error(e);
          setMessageStatus("error");
          setErrorMessage(`Error deleting person`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} status={messageStatus} />
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
