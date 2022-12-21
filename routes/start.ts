import { Router, Request, Response } from 'express';
import generateSecretSanta from '../helpers/secretSantaGenerate';
// import generatePassword from "../helpers/generatePassword"
import { encryptFile, decryptFile } from "../helpers/encryption";
import intimateKeepers from "../helpers/passwordSharing";
import { UserDetails } from "../types/santaGenerated"
import generatePassword from '../helpers/generatePassword';

import shuffleArray from '../helpers/randomizeArray';

const starterRouter = Router();

/**
 * @route /start
 * @method POST
 * @description This route takes input as a JSON file ,and matches everyone with a secret santa and uploads on the database
 * @access Private - requires initialization token
 */
starterRouter.post('/', async (req: Request, res: Response) => {
    const PASSWORD = generatePassword(32);
    console.log(PASSWORD)
    // const keepersOfPassword = ["depally.kumar@icicibank.com", "sahithi.reddy@icicibank.com", "vijal.shah@icicibank.com", "mohd.qureshi@icicibank.com", "kesav.kilambi@icicibank.com", "varun.patel@icicibank.com", "fasee.rahmankhan@icicibank.com", "yash.aryan@icicibank.com"]
    const keepersOfPassword = req.body.keepers;
    const shuffledKeepers = shuffleArray(keepersOfPassword);
    const PasswordIn8Parts = PASSWORD.match(/.{1,8}/g);
    const keyOfPasswordAndKeepers = shuffledKeepers.map((keeper, index) => {
        return {
            key_part: index + 1,
            keeper: keeper,
            // @ts-ignore
            key: PasswordIn8Parts[index]
        }
    })
    // letting password custodians know about their passphrases
    for (let i = 0; i < keyOfPasswordAndKeepers.length; i++) {
        await intimateKeepers(keyOfPasswordAndKeepers[i]);
    }
    console.log(keyOfPasswordAndKeepers)
    const { authorization } = req.headers;
    const data: UserDetails[] = req.body.data;
    if (authorization === process.env.INIT_TOKEN) {
        // do stuff
        const aes_iv = process.env.AES_IV || "test";
        if (data) {
            // do stuff
            const secretSanta = await generateSecretSanta(data);
            const dataForEncryption = JSON.stringify({ data: secretSanta });
            const encryptedData = encryptFile(dataForEncryption, PASSWORD, aes_iv);
            res.status(200).json({ message: 'Success', encryptedData: encryptedData });
        } else {
            res.status(400).json({ message: 'Bad Request: No data of users available' });
        }
        // res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});


/**
 * @route /start/decrypt
 * @method POST
 * @description This route takes the encrypted data and decrypts it
 * @access Private - requires initialization token
 */
starterRouter.post('/decrypt', async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { encryptedData, password } = req.body;
    const aes_iv = process.env.AES_IV || "test";
    if (authorization === process.env.INIT_TOKEN) {
        // do stuff
        if (encryptedData) {
            // do stuff
            const decryptedData = decryptFile(encryptedData, password, aes_iv);
            res.status(200).json({ message: 'Success', decryptedData: JSON.parse(decryptedData) });
        } else {
            res.status(400).json({ message: 'Bad Request: No data of users available' });
        }
        // res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});


export default starterRouter;