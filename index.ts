// @ts-ignore
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import billRoute from "./Routes/billRoute";
import addressRoute from "./Routes/addressRoute";
import billrowRoute from "./Routes/billrowRoute";
import productRoute from "./Routes/productRoute";
import categoryRoute from "./Routes/categoryRoute";
import clientRoute from "./Routes/clientRoute";
import contactsRoute from "./Routes/contactsRoute";
import paymentRoute from "./Routes/paymentRoute";
import jobapplicationRoute from "./Routes/jobapplicationRoute";
import cors from "cors";



mongoose.connect("mongodb+srv://ronaldandero:oR2k0mlnerzHkjsJ@tsorm.swtx3xo.mongodb.net/pood");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app: Express = express();

// use cors all roots
app.use(cors());

app.use(express.json());
app.use("/", billRoute);
app.use("/", addressRoute);
app.use("/", billrowRoute);
app.use("/", productRoute);
app.use("/", categoryRoute);
app.use("/", clientRoute);
app.use("/", contactsRoute);
app.use("/", paymentRoute);
app.use("/", jobapplicationRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Your web app is running');
});


app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});