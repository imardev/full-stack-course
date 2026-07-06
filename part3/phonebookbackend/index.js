const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const Person = require("./modules/persons");

const app = express();
const PORT = process.env.PORT;
const allowedOrigins = [
  "http://localhost:5173",
  "https://full-stack-course-wfst.onrender.com",
];
app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.static("dist"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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

// Endpoint para añadir datos con validación de datos vacios o duplicados
app.post("/api/persons", (request, response) => {
  // Obtener datos de la petición
  let datos = request.body;
  const { name, number } = datos;

  if (!name && !number) {
    return response.status(400).json({ error: "Content missing" });
  }

  const newPerson = new Person({
    name: name,
    number: number,
  });
  // Declaramos el objeto de la persona para identificar los datos que se añadiran posteriormente
  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuhando en el puerto ${PORT}`);
});
