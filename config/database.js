import { config as configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv()


const dbConnect = () => mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log('db Connected successfully' );
})
.catch((err) => {
    console.log("Error while connecting DB : ",err);
    console.log('db Connected Unsuccessfully' );
})

export default dbConnect