"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const starterRouter = (0, express_1.Router)();
starterRouter.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = starterRouter;
