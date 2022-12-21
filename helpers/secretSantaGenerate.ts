import { UserDetails, santaDetails, santaIdentifiers } from "../types/santaGenerated"
import createUser from "../queries/users.create";
import createSanta from "../queries/santa.create"
import { hash } from "argon2"
//@ts-ignore
import sendMailer from '../helpers/intimate';

function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generateSecretSanta = async (data: UserDetails[]): Promise<santaDetails[]> => {
    // do stuff
    const numberOfPlayers: number = data.length;
    const secretSanta: santaDetails[] = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        // @ts-ignore
        const santa: UserDetails = data[i];
        await createUser(santa);
        let receiver: any = data[getRndInteger(0, numberOfPlayers)];
        // check if both santa and receiver are same and they are not gifting to each other
        while (receiver.id === santa.id || secretSanta.some((pair_up) => pair_up.receiver.id === receiver.id)) {
            receiver = data[getRndInteger(0, numberOfPlayers)];
        }

        await sendMailer({
            santaName: santa.name,
            receiverName: receiver.name,
            santaUsername: santa.username,
            santaEmail: santa.email,
            receiverEmail: receiver.email,
            receiverUsername: receiver.username,
            receiverDepartment: receiver.team
        }
        );
        await addUserToSantaList({ santa: santa.username, receiver: receiver.username });
        secretSanta.push({ santa: santa, receiver: receiver });
    }
    return secretSanta;
}

const addUserToSantaList = async (data: santaIdentifiers): Promise<number> => {
    await createSanta({
        santa: await hash(data.santa),
        receiver: await hash(data.receiver)
    });
    return 0;
}

export default generateSecretSanta;