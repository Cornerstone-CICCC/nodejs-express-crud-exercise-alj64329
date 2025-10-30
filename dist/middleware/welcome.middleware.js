"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = void 0;
const welcome = (req, res, next) => {
    console.log(`Visitor is arrived in ${req.url}`);
    next();
};
exports.welcome = welcome;
