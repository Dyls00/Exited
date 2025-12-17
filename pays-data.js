import { getData } from "./export.js";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' });

const paysData = await getData(process.env.URL_PAYS);
console.log(paysData);