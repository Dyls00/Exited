import { getData } from "./export/export.js";
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config({ path: '.env' });

const paysData = await getData(process.env.URL_PAYS);

const paysSchema = new mongoose.Schema({
    name: String
});

const country = mongoose.model('country', paysSchema);
 export const listPays = paysData.variables[1].valueTexts;


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
  console.log("connecté");
    for ( let data of listPays) {

    
    const paysfetch = new country({
    name: data
  })
  await paysfetch.save();
}
mongoose.connection.close();
console.log("Fetch réussi ! déconnecté");
}