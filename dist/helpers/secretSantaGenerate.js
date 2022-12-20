"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const generateSecretSanta = (data) => {
    const numberOfPlayers = data.length;
    const secretSanta = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        const santa = data[i];
        let receiver = data[getRndInteger(0, numberOfPlayers)];
        while (receiver.id === santa.id || secretSanta.some((pair_up) => pair_up.receiver.id === receiver.id)) {
            receiver = data[getRndInteger(0, numberOfPlayers)];
        }
        secretSanta.push({ santa: santa, receiver: receiver });
    }
    return secretSanta;
};
exports.default = generateSecretSanta;
