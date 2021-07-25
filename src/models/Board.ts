import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CellContentsSchema = new Schema(
  {
    row: { type: Number, required: true },
    column: { type: Number, required: true }
  },
);

// of: mongoose.SchemaTypes.Mixed

const BoardSchema = new Schema(
  {
    id: { type: String, required: true },
    puzzleId: { type: String, required: true },
    title: { type: String },
    users: { type: [String] },
    cellContents: {
      type: Map, 
      of: CellContentsSchema
    },
    startDateTime: { type: Date, required: true },
    lastPlayedDateTime: { type: Date, required: true },
    elapsedTime: { type: Number },
    solved: { type: Boolean, default: true },
    difficulty: { type: Number },
  },
);

export default mongoose.model('Board', BoardSchema);
