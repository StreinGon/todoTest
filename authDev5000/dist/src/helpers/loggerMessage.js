"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerServices = require("@src/services/loggerServices");
const loggerConstants_1 = require("@src/constants/loggerConstants");
exports.loggerMessage = (req, payload, error) => {
    if (!error) {
        const message = loggerConstants_1.mapped.get(`${req.method} ${req.baseUrl}`);
        const part = `${req.method} ${req.baseUrl}${message}`;
        loggerServices
            .createLog({ act: `${part}${payload ? payload : ''}`, user: req.user })
            .then(() => { }).catch((err) => err);
    }
    else {
        loggerServices
            .createLog({ act: `${req.method} ${req.baseUrl} ${error}`, user: req.user })
            .then(() => { }).catch((err) => err);
    }
};
//# sourceMappingURL=loggerMessage.js.map