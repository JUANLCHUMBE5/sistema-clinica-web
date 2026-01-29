"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailValide = isEmailValide;
function isEmailValide(email) {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    return patron.test(email);
}
