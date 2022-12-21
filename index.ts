import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';

// importing routes
import starterRouter from './routes/start';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "20kb", strict: true, type: "application/json" }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! Server is live');
});

app.use("/start", starterRouter)

app.listen(port, async () => {
    // connect to database
    await connect(`${process.env.DATABASE_URL}`).then(() => {
        mongoose.set('strictQuery', true)
        console.log("Connected to database");
    }).catch((err) => {
        console.log(err);
    });

    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});