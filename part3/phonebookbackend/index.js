const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3001;
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

// Endpoint para añadir datos con validación de datos vacios o duplicados
app.post("/api/persons", (request, response) => {
  // Obtener datos de la petición
  let datos = request.body;

  // Generar id aleatorio
  let id = Math.random();
  id = id * 1000000000;
  id = Math.round(id);

  // Declarar una variable para los elementos duplicados
  let duplicated = false;

  // Declarar una variable para los elementos vacios
  let vacio = false;

  // Declaramos el objeto de la persona para identificar los datos que se añadiran posteriormente
  const newPerson = {
    id: id,
    name: datos.name,
    number: datos.number,
  };

  // Creamos una variable para la condicion basada en lso datos originales pasandola a texto
  let dataNumber = String(newPerson.number);

  // condicional de verificacion que tenga contenido
  if (newPerson.name.trim() === "" || dataNumber.trim() === "") {
    console.error("Both name and phone number are required.");
    vacio = true;
  }

  // Recorre la lista de persona y si encuentra una con el mismo nombre de la petición devuelve un error y el true en la variable correspoendiente
  persons.forEach((persona) => {
    if (persona.name === newPerson.name) {
      console.error("name must be unique");
      duplicated = true;
    }
  });

  // Si no es duplicad y no esta vacio añade la persona
  if (!duplicated === true && !vacio === true) {
    console.log("Contact added successfully.");
    persons.push(newPerson);
  }
  response.status(201).json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Servidor escuhando en el puerto ${PORT}`);
});
