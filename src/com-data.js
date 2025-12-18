import { getData } from "./export/export.js";
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config({ path: '.env' });

const comData = await getData(process.env.URL_COM);

const comSchema = new mongoose.Schema({
  post_id: Number,
  user_id:Number,
  name: String,
  email: String,
  description: String
});

const comments = mongoose.model('comments', comSchema);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
  console.log("connecté");
  
for ( let data of comData) {
  const comfetch = new comments({post_id: data.postId,
    user_id: data.id, 
    name: data.name, 
    email: data.email,
    description: data.body
  })
  await comfetch.save();
}
mongoose.connection.close();
console.log("Fetch réussi ! déconnecté");
}