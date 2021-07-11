import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    cellTextColorPartnerBoard: { type: String, required: true },
    // historical board times
    // board history
  },
);

export default mongoose.model('User', UserSchema);
