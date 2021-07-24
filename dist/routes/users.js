"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
const testEndpoints_1 = require("../controllers/testEndpoints");
// test endpoints
usersRouter.post('/user', testEndpoints_1.createUser);
// usersRouter.patch('/user/:id', updateUser);
exports.default = usersRouter;
//# sourceMappingURL=users.js.map