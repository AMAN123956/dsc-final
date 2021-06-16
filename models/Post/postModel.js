var mongoose = require('mongoose');

var userPostSchema = new mongoose.Schema({
    // REFERENCE TO USER POSTING THE CONTENT
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: { type: String, lowercase: true, },
    email:{ type:String, lowercase:true},
    date: { type: Date, default: Date.now },
    imageUrl: { type: String },
    videoUrl: { type: String },
    textPost: { type: String },
    location: {},
    likes: [{

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        commenterName: { type: String, trim: true },
        commentText: { type: String, trim: true, required: true },
        date: { type: Date, default: Date.now },
        commenterImg: { type: String },
        likes: [{

            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        }],
    }
    ]
}, { timestamps: true });

const Post = mongoose.model('post', userPostSchema);
module.exports = Post