import { Schema, model } from "mongoose";

interface IUser {
    name: string;
    username: string;
    email: string;
    team: string;
    id: number;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    team: { type: String, required: true },
    id: { type: Number, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;