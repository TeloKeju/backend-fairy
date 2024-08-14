import 'dotenv/config'
import express from "express";
import cors from "cors";
import route from "./routes/api.js";
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(fileupload({
    createParentPath: true
}))
app.use(express.static("public"));

app.use(route)

app.listen(5000, () => console.log('listening on port 5000'))