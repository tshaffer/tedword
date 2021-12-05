import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatSessionSchema = new Schema(
  {
    id: { type: String, required: true },
    boardId: { type: String, required: true },
    chatMessages: [{
      sender: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, required: true },
    }],
  },
);

export default mongoose.model('ChatSession', ChatSessionSchema);
