"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secretSantaGenerate_1 = __importDefault(require("../helpers/secretSantaGenerate"));
const generatePassword_1 = __importDefault(require("../helpers/generatePassword"));
const starterRouter = (0, express_1.Router)();
starterRouter.post('/', (req, res) => {
    const { authorization } = req.headers;
    const data = req.body.data;
    if (authorization === process.env.INIT_TOKEN) {
        if (data) {
            const secretSanta = (0, secretSantaGenerate_1.default)(data);
            res.status(200).json({ message: 'User data received', secretSantaData: secretSanta, password: (0, generatePassword_1.default)(data.length * 2) });
        }
        else {
            res.status(400).json({ message: 'Bad Request: No data of users available' });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.default = starterRouter;
