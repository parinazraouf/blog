const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const commentsSchema = new Schema({
  id: { type: Number },
  key: { type: mongoose.Types.ObjectId },
  content: { type: String },
  attachment_key: { type: mongoose.Types.ObjectId },
  author_key: { type: mongoose.Types.ObjectId },
  post_key: { type: mongoose.Types.ObjectId },
  likes_count: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  post: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
  user: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

const Comments = mongoose.model('comments', commentsSchema);

/**
  * Create new comment
  * @param {Object} data     comment data
*/
exports.create = async (data) => {
  const createComment = new Comments({ ...data });

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
  Comments.findOne({ condition })
    .then(query => Comments.updateOne({ ...data, updatedAt: Date.now() }));
};

/**
  * Delete comment
  * @param {Object} condition
  * @param {Object} options
*/
exports.delete = async (condition) => {
  Comments.deleteOne(condition, function (err) {
    if (err) console.log(err);
  });
};

/**
  * Get comment by key
  * @param {String} key
  * @param {Object} projection
*/
exports.getByKey = async (key, projection) => {
  Comments.findOne(key, projection)
    .then(res => {
      console.log(res);
    });
};

/**
 * Get all comments by post key
 * @param {String}        postKey
 * @param {String}        userKey
 * @param {Array<String>} projection
 */
exports.getAllByPostKey = async (postKey, userKey, projection) => {
  Comments.find(postKey, userKey, projection).populate('user').populate('post')
    .then(res => {
      console.log(res);
    });
};

/**
 * Get all user keys that commented on this post by post key
 * @param {String} postKey
 * @param {Object} userKey
 */

exports.getAllUserKeysCommented = async (postKey, userKey, projection, { ignoreUserKeys } = {}) => {
  Comments.findOne(postKey, userKey, projection).populate('user').populate('post')
    .then(res => {
      console.log(res);
    });

  //   if (ignoreUserKeys) {
  //   query.whereNotIn('authorKey', castArray(ignoreUserKeys));
  // }

  // const res = await query.whereNull('deletedAt');

  // return uniq(res.map(i => i.authorKey));
};
