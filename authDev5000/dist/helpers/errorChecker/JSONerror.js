"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JSONerrorChecker = (error, request, response, next) => {
    if (error instanceof SyntaxError) {
        return response.status(400).json({ message: 'Invalid json' });
    }
    return next();
};
exports.JSONerrorChecker = JSONerrorChecker;
//# sourceMappingURL=JSONerror.js.map