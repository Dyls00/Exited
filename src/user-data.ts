import { getData } from "./export/export.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config({ path: '.env' });

const userData = await getData(process.env.URL_USER);

const userSchema = new mongoose.Schema({
  id: String,
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

for ( let data of userData) {
  console.log( data.name)
}

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Exited');
  console.log("connecté");

}
