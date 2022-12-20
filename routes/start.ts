import { Router, Request, Response } from 'express';
import generateSecretSanta from '../helpers/secretSantaGenerate';
import generatePassword from "../helpers/generatePassword"

import { UserDetails } from "../types/santaGenerated"

const starterRouter = Router();

/**
 * @route /start
 * * @method POST
 * @description This route takes input as a JSON file and matches everyone with a secret santa and uploads on the database
 * @access Private - requires initialization token
 */
starterRouter.post('/', (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const data: UserDetails[] = req.body.data;
    if (authorization === process.env.INIT_TOKEN) {
        // do stuff
        if (data) {
            // do stuff
            const secretSanta = generateSecretSanta(data);

            res.status(200).json({ message: 'User data received', secretSantaData: secretSanta, password: generatePassword(data.length * 2) });
        } else {
            res.status(400).json({ message: 'Bad Request: No data of users available' });
        }
        // res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

export default starterRouter;