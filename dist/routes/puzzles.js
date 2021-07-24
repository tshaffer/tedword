"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puzzlesRouter = express_1.default.Router();
const testEndpoints_1 = require("../controllers/testEndpoints");
// test endpoints
puzzlesRouter.get('/loadPuzzle/:puzzlePath', testEndpoints_1.loadPuzzle);
exports.default = puzzlesRouter;
//# sourceMappingURL=puzzles.js.map