const express = require("express");

const app = express();
const PORT = 3001;

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

app.get("/info", (request, response) => {
  const fecha = new Date();
  const total = persons.length;
  response.send(`
    <h2>PhoneBook has info for ${total} persons</h2>
    <h3>${fecha}<h3>
    `);
});

app.listen(PORT, () => {
  console.log(`Servidor escuhando en el puerto ${PORT}`);
});
