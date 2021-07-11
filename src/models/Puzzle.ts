import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PuzzleSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    puzData: { type: String, required: true },
  },
);

export default mongoose.model('Puzzle', PuzzleSchema);
