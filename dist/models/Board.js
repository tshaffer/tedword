"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
// of: mongoose.SchemaTypes.Mixed
const BoardSchema = new Schema({
    id: { type: String, required: true },
    puzzleId: { type: String, required: true },
    title: { type: String },
    users: { type: [String] },
    cellContents: {
        type: Map,
        of: String
    },
    startDateTime: { type: Date, required: true },
    lastPlayedDateTime: { type: Date, required: true },
    elapsedTime: { type: Number },
    solved: { type: Boolean, default: true },
    difficulty: { type: Number },
});
exports.default = mongoose.model('Board', BoardSchema);
//# sourceMappingURL=Board.js.map