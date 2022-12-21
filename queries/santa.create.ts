import Santa from "../models/santa.model";
import { santaIdentifiers } from "../types/santaGenerated";

const createSanta = async (pairs: santaIdentifiers) => {
    const newSanta = new Santa({
        EncryptedSender: pairs.santa,
        EncryptedReceiver: pairs.receiver
    });
    await newSanta.save();
}

export default createSanta;