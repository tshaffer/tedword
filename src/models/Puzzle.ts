import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PuzzleSchema = new Schema(
  {
    id: { type: String, required: true },
    sourceFileName: { type: String, required: true },
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
  },
);

export default mongoose.model('Puzzle', PuzzleSchema);
