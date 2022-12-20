import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// importing routes
import starterRouter from './routes/start';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use("/start", starterRouter)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});