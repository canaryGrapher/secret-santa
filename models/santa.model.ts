import { Schema, model } from "mongoose";

interface ISanta {
    EncryptedSender: string;
    EncryptedReceiver: string;
    tries: number;
    guessed: boolean;
    viewed: boolean;
}

const santaSchema = new Schema<ISanta>({
    EncryptedSender: { type: String, required: true },
    EncryptedReceiver: { type: String, required: true },
    tries: { type: Number, required: true, default: 0 },
    guessed: { type: Boolean, required: true, default: false },
    viewed: { type: Boolean, required: true, default: false }
});

const Santa = model<ISanta>("Santa", santaSchema);

export default Santa;