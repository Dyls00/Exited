import { getData } from "./export.js";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const userData = await getData(process.env.URL_USER);
console.log(userData);
