"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authError = (error, request, response, next) => {
    if (error.status === 401) {
        return response.status(401).json({ message: 'Unauthorized' });
    }
    return next();
};
exports.default = authError;
//# sourceMappingURL=authError.js.map