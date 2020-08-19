const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  id: { type: Number },
  key: mongoose.Types.ObjectId,
  content: { type: String },
  attachment_key: mongoose.Types.ObjectId,
  author_key: mongoose.Types.ObjectId,
  likes_count: { type: Number },
  comments_count: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  user: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

// const COLLECTION_NAME = 'posts';

const Posts = mongoose.model('posts', postsSchema);

/**
  * Create new post
  * @param {Object} data     post data
*/
exports.create = async (data) => {
  const query = Posts.insertMany([{ data }, { '$set': { createdAt: Date.now() } }]);

  const createPost = new Posts({ query });

  // createPost.save();
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
  const query = Posts.findOneAndUpdate({ condition }, { data }, { '$set': { updatedAt: Date.now() } });

  const updatePost = new Posts({ query });

  // updatePost.save();
  updatePost.save(function (err, updatePost) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document update done');
    }
  });
};

/**
  * Delete post
  * @param {Object} condition
*/
exports.delete = async (condition) => {
  const query = Posts.findOneAndDelete({ condition }, { '$set': { deletedAt: Date.now() } });

  const deletePost = new Posts({ query });

  // deletePost.save();
  deletePost.save(function (err, deletePost) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document delete done');
    }
  });
};

/**
  * Get post by key
  * @param {String} key
  * @param {Object} projection
*/
exports.getByKey = async (key, projection) => {
  Posts.findOne({ projection }, { key }, { '$ne': { deletedAt: null } });
};

/**
  * Get all posts by user key
  * @param {String} authorKey
  * @param {Object} projection
*/
exports.getAllPostsByUserKey = async (authorKey, projection) => {
  Posts.find({ projection }, { authorKey }, { '$ne': { deletedAt: null } });
};

/**
  * Get all liked users list by post key
  * @param {String} key
  * @param {Object} projection
*/
exports.getAllLikedUsersListSchema = async (postKey, projection) => {

};
