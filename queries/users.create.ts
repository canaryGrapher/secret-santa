import User from "../models/user.model";
import { UserDetails } from "../types/santaGenerated";

const createUser = async (user: UserDetails) => {
    const { email, id, name, team, username } = user;
    const newUser = new User({
        name: name,
        username: username,
        email: email,
        team: team,
        id: id,
    });
    await newUser.save();
}

export default createUser;