import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// of: mongoose.SchemaTypes.Mixed

const BoardSchema = new Schema(
  {
    id: { type: String, required: true },
    puzzleId: { type: String, required: true },
    title: { type: String },
    users: { type: [String] },
    cellContents: {
      type: Map, 
      of: new Schema({
        user: String,
        typedChar: String,
      })
    },
    startDateTime: { type: Date, required: true },
    lastPlayedDateTime: { type: Date, required: true },
    elapsedTime: { type: Number },
    solved: { type: Boolean, default: true },
    difficulty: { type: Number },
  },
);

export default mongoose.model('Board', BoardSchema);
