import { getData } from "./export/export.js";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' });

const comData = await getData(process.env.URL_COM);
console.log(comData);