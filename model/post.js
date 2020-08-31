const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const postsSchema = new Schema({
  id: { type: Number },
  key: { type: mongoose.Types.ObjectId },
  content: { type: String },
  attachmentKey: { type: mongoose.Types.ObjectId },
  authorKey: { type: mongoose.Types.ObjectId },
  likesCount: { type: Number },
  commentsCount: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  user: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

const Posts = mongoose.model('posts', postsSchema);

/**
  * Create new post
  * @param {Object} data     post data
*/
exports.create = async (data) => {
  const createPost = new Posts({ ...data });

  createPost.save(function (err, createPost) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document save done');
    }
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

/**
  * Get all liked users list by post key
  * @param {String} key
  * @param {Object} projection
*/
exports.getAllLikedUsersListSchema = async (postKey, projection) => {

};
