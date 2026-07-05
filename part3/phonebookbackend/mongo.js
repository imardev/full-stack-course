const mongoose = require("mongoose");

// Verificamos que se pase como argumento la contraseña, el usuario de la base de datos
if (process.argv.length < 4) {
  console.log("Usage: node mongo.js <user> <password>");
  process.exit(1);
}

const user = process.argv[2];
const password = process.argv[3];

// Guardamos en constantes los datos pasados al comando
const name = process.argv[4];
const number = process.argv[5];

// constante de la url de la Base de datos
// const url = `mongodb+srv://${user}:${password}@fullstackopen.yh2bwxz.mongodb.net/?appName=fullstackopen`;
const url = `mongodb://${user}:${password}@ac-nskrbrb-shard-00-00.yh2bwxz.mongodb.net:27017,ac-nskrbrb-shard-00-01.yh2bwxz.mongodb.net:27017,ac-nskrbrb-shard-00-02.yh2bwxz.mongodb.net:27017/?ssl=true&replicaSet=atlas-4ol8fs-shard-0&authSource=admin&appName=fullstackopen`;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

const contact = new Contact({
  name: name,
  number: number,
});

if (process.argv.length === 4) {
  Contact.find({}).then((contacts) => {
    console.log("phonebook:");
    contacts.forEach((contact) => {
      console.log(contact.name, contact.number);
    });
    mongoose.connection.close();
  });
} else {
  contact.save().then((result) => {
    console.log(`${name} saved!`);
    mongoose.connection.close();
  });
}
