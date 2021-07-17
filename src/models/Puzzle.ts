import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PuzzleSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String },
    author: { type: String },
    puzData: { type: Buffer, required: true },
  },
);

export default mongoose.model('Puzzle', PuzzleSchema);
