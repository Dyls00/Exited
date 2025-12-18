import { getData } from "./export/export.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config({ path: '.env' });

const userData = await getData(process.env.URL_USER);

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  username: String,
  email: String,
  adresse : Array,
  phone: String,
  website: String,
  company: Array
});

const users = mongoose.model('users', userSchema);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
  console.log("connecté");
  
for ( let data of userData) {
  const userfetch = new users({_id: data.id, name: data.name, username: data.username, email: data.email,
    adresse: data.address.street,
    phone: data.phone,
    website: data.website,
    company: data.company
  })
  await userfetch.save();
}
mongoose.connection.close();
console.log("Fetch réussi ! déconnecté");
}
