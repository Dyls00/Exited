import { getData } from "./export/export.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { listPays } from "./pays-data.js";

dotenv.config({ path: ".env" });

const userData = await getData(process.env.URL_USER);

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

async function main() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connecté");

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
    console.log("Fetch réussi ! déconnecté");
  }
}
