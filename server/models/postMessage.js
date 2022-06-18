import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    studentName: String,
    message: String,
    price: Number,
    lessonDate: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    paids: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;