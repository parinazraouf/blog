const mongoose = require('~/db');
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  id: { type: Number },
  key: mongoose.Types.ObjectId,
  content: { type: String },
  attachment_key: mongoose.Types.ObjectId,
  author_key: mongoose.Types.ObjectId,
  post_key: mongoose.Types.ObjectId,
  likes_count: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  post: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
  user: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

// const COLLECTION_NAME = 'comments';

const Comments = mongoose.model('comments', commentsSchema);

/**
  * Create new comment
  * @param {Object} data     comment data
*/
exports.create = async (data) => {
  const query = Comments.insertMany([{ data }, { '$set': { createdAt: Date.now() } }]);

  const createComment = new Comments({ query });

  // createComment.save();
  createComment.save(function (err, createComment) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document save done');
    }
  });
};

/**
  * Update comment
  * @param {Object} condition
  * @param {Object} data
*/
exports.update = async (condition, data) => {
  const query = Comments.findOneAndUpdate({ condition }, { data }, { '$set': { updatedAt: Date.now() } });

  const updateComment = new Comments({ query });

  // updateComment.save();
  updateComment.save(function (err, updateComment) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document update done');
    }
  });
};

/**
  * Delete comment
  * @param {Object} condition
  * @param {Object} options
*/
exports.delete = async (condition) => {
  const query = Comments.findOneAndDelete({ condition }, { '$set': { deletedAt: Date.now() } });

  const deleteComment = new Comments({ query });

  // deleteComment.save();
  deleteComment.save(function (err, deleteComment) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document delete done');
    }
  });
};

/**
  * Get comment by key
  * @param {String} key
  * @param {Object} projection
*/
exports.getByKey = async (key, projection) => {
  Comments.findOne({ projection }, { key }, { '$ne': { deletedAt: null } });
};

/**
 * Get all comments by post key
 * @param {String}        postKey
 * @param {String}        userKey
 * @param {Array<String>} projection
 */
exports.getAllByPostKey = async (postKey, userKey, projection) => {
  Comments.findOne({ projection }, { userKey }, { postKey }).populate('user').populate('post');
};

/**
 * Get all user keys that commented on this post by post key
 * @param {String} postKey
 * @param {Object} userKey
 */

exports.getAllUserKeysCommented = async (postKey, userKey, projection, { ignoreUserKeys } = {}) => {
  Comments.findOne({ projection }, { userKey }, { postKey }).populate('user').populate('post');

  //   if (ignoreUserKeys) {
  //   query.whereNotIn('authorKey', castArray(ignoreUserKeys));
  // }

  // const res = await query.whereNull('deletedAt');

  // return uniq(res.map(i => i.authorKey));
};
