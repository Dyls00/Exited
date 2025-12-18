import { getData } from "./export/export.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const userData = await getData(process.env.URL_USER);

const paysData = await getData(process.env.URL_PAYS);

const paysSchema = new mongoose.Schema({
    name: String
});

const country = mongoose.model('country', paysSchema);
 export const listPays = paysData.variables[1].valueTexts;

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  username: String,
  email: String,
  adresse: {
    street: String,
    pays: String
  },
  phone: String,
  website: String,
  company: Object
});

const User = mongoose.model("users", userSchema);

main();
paysList();

async function paysList() {
  await mongoose.connect(process.env.DB);
  console.log("connecté");
    for ( let data of listPays) {

    
    const paysfetch = new country({
    name: data
  })
  await paysfetch.save();
}
console.log("Fetch pays réussi !");
}

async function main() {
  try {
    await mongoose.connect(process.env.DB);

    for (const data of userData) {
      const user = new User({
        _id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        adresse: {
          street: data.address.street,
          pays: listPays[Math.floor(Math.random() * listPays.length)]
        },
        phone: data.phone,
        website: data.website,
        company: data.company
      });
      await user.save();
    }
  } catch (error) {
    console.error("Erreur :", error);
  } finally {
    await mongoose.connection.close();
    console.log("Fetch users réussi ! déconnecté");
  }
}
