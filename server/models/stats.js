import mongoose from "mongoose";

const statsSchema = mongoose.Schema({
  totalMade: { type: Number, required: true },
});

export default mongoose.model("stats", statsSchema);