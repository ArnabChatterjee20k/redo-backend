import express, { urlencoded, } from "express";
import { config as configDotenv } from "dotenv";
import dbConnect from "./config/database.js";
import router    from "./router/route.js";
import cors from 'cors'
import user from "./model/user.js";
const app = express();
app.use(cors())
app.use(urlencoded())
app.use(express.json());
configDotenv();

dbConnect();
const port = process.env.PORT || 4000;


app.use('/api/v1', router);

// Define the '/' route before starting the server  
app.get('/', async(req, res) => {
    const users = await user.find({location:{$near:{$geometry:{type:"Point",coordinates:[50,-10]}}}})
    res.json(users)
});


app.listen(port, () => console.log("Server started at port:", port));