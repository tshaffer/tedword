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
const PuzzleSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String },
    author: { type: String },
    copyright: { type: String },
    note: { type: String },
    width: { type: Number },
    height: { type: Number },
    clues: { type: [String] },
    solution: { type: String },
    state: { type: String },
    hasState: { type: Boolean },
    parsedClues: [{
            col: { type: Number },
            isAcross: { type: Boolean },
            length: { type: Number },
            number: { type: Number },
            row: { type: Number },
            solution: { type: String },
            state: { type: String },
            text: { type: String },
        }],
});
exports.default = mongoose.model('Puzzle', PuzzleSchema);
//# sourceMappingURL=Puzzle.js.map