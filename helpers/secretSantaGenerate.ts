import { UserDetails, santaDetails } from "../types/santaGenerated"

function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generateSecretSanta = (data: UserDetails[]): santaDetails[] => {
    // do stuff
    const numberOfPlayers: number = data.length;
    const secretSanta: santaDetails[] = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        // @ts-ignore
        const santa: UserDetails = data[i];
        let receiver: any = data[getRndInteger(0, numberOfPlayers)];
        // check if both santa and receiver are same and they are not gifting to each other
        while (receiver.id === santa.id || secretSanta.some((pair_up) => pair_up.receiver.id === receiver.id)) {
            receiver = data[getRndInteger(0, numberOfPlayers)];
        }
        secretSanta.push({ santa: santa, receiver: receiver });
    }
    return secretSanta;
}

export default generateSecretSanta;