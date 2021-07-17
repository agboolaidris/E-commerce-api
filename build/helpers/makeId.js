"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeId = void 0;
function makeId(length) {
    var result = [];
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("");
}
exports.makeId = makeId;
//# sourceMappingURL=makeId.js.map