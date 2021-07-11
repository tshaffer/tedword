import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BoardSchema = new Schema(
  {
    id: { type: String, required: true },
    puzzleId: { type: String, required: true },
    users: [{
      userIds: { type: String, required: true },
    }],
    cellContents: { type: String, required: true }, // ????
    startDateTime: { type: Date, required: true },
    lastPlayedDateTime: { type: Date, required: true },
    elapsedTime: { type: Number },
    solved: { type: Boolean, default: true },
    difficulty: { type: Number },
  },
);

export default mongoose.model('Board', BoardSchema);
