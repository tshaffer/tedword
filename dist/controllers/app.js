"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = void 0;
const version_1 = require("../version");
exports.getVersion = (request, response, next) => {
    console.log('getVersion');
    const data = {
        serverVersion: version_1.version,
    };
    response.json(data);
};
//# sourceMappingURL=app.js.map