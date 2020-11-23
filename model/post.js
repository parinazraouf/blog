const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const postsSchema = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  key: { type: Schema.Types.ObjectId },
  content: { type: String },
  attachmentKey: { type: Schema.Types.ObjectId },
  authorKey: { type: Schema.Types.ObjectId },
  likesCount: { type: Number },
  commentsCount: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  user: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  comment: [{ type: Schema.Types.ObjectId, refPath: 'Comments' }],
  counter: [{ type: Schema.Types.ObjectId, ref: 'Counters' }]
});

const Posts = mongoose.model('posts', postsSchema);

/**
  * Create new post
  * @param {Object} data     post data
*/
exports.create = async (data) => {
  const user = new Posts({
    _id: new mongoose.Types.ObjectId()
  });

  const comment = new Posts({
    _id: new mongoose.Types.ObjectId()
  });

  const counter = new Posts({
    _id: new mongoose.Types.ObjectId()
  });

  const createPost = new Posts({
    user: user._id,
    comment: comment._id,
    counter: counter._id,
    ...data

  });

  createPost.save(function (err) {
    if (err) return (err);
  });
};

/**
  * Update post
  * @param {Object} condition
  * @param {Object} data
*/
exports.update = async (condition, data) => {
  Posts.findOne({ condition })
    .then(query => Posts.updateOne({ ...data, updatedAt: Date.now() }));
};

/**
  * Delete post
  * @param {Object} condition
*/
exports.delete = async (condition) => {
  Posts.deleteOne(condition, function (err) {
    if (err) console.log(err);
  });
};

/**
  * Get post by key
  * @param {String} key
  * @param {Object} projection
*/
exports.getByKey = async (key, projection) => {
  Posts.findOne(key, projection)
    .then(res => {
      console.log(res);
    });
};

/**
  * Get all posts by user key
  * @param {String} authorKey
  * @param {Object} projection
*/
exports.getAllPostsByUserKey = async (authorKey, projection) => {
  Posts.find(authorKey, projection)
    .then(res => {
      console.log(res);
    });
};

// /**
//   * Get all liked users list by post key
//   * @param {String} key
//   * @param {Object} projection
// */
// exports.getAllLikedUsersListSchema = async (postsId, projection) => {
//   Posts.find({ _id: postsId, projection }).populate({ path: 'user', select: 'key phoneNumber userName displayName avatarKey' }).populate('counter')
//     .then(res => {
//       console.log(res);
//     });
// };
