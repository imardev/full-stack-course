const express = require("express");

const app = express();
const PORT = 3001;
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id_param = request.params;
  const id = Number(id_param.id);
  let personaEncontrada = false;
  persons.forEach((person) => {
    if (person.id === id) {
      response.json(person);
      personaEncontrada = true;
    }
  });

  if (personaEncontrada === false) {
    response.sendStatus(404);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id_param = request.params;
  const id = Number(id_param.id);
  persons = persons.filter((person) => person.id !== id);
});

app.get("/info", (request, response) => {
  const fecha = new Date();
  const total = persons.length;
  response.send(`
    <p>PhoneBook has info for ${total} persons</p>
    <p>${fecha}<p>
    `);
});

app.post("/api/persons", (request, response) => {
  let datos = request.body;
  let id = Math.random();
  id = id * 1000000000;
  id = Math.round(id);
  const newPerson = {
    id: id,
    name: datos.name,
    number: datos.number,
  };
  persons.push(newPerson);
});

app.listen(PORT, () => {
  console.log(`Servidor escuhando en el puerto ${PORT}`);
});
