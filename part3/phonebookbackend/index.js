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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// controlador de solicitudes con endpoint desconocido
// app.use(unknownEndpoint);

// Utilizar frontend
app.use(express.static("dist"));

// Politicas de acceso al backend
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

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuhando en el puerto ${PORT}`);
});
