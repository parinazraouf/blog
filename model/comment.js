const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const commentsSchema = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  key: { type: Schema.Types.ObjectId },
  content: { type: String },
  attachmentKey: { type: Schema.Types.ObjectId },
  authorKey: { type: Schema.Types.ObjectId },
  postKey: { type: Schema.Types.ObjectId },
  likesCount: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  post: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  user: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

const Comments = mongoose.model('comments', commentsSchema);

/**
  * Create new comment
  * @param {Object} data     comment data
*/
exports.create = async (data) => {
  // const createComment = new Comments({ ...data });

  // createComment.save(function (err, createComment) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Document save done');
  //   }
  // });

  const post = new Comments({
    _id: new mongoose.Types.ObjectId()
  });

  const user = new Comments({
    _id: new mongoose.Types.ObjectId()
  });

  const createComment = new Comments({
    post: post._id,
    user: user._id,
    ...data

  });

  createComment.save(function (err) {
    if (err) return (err);
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
exports.getAllByPostKey = async (postKey, projection) => {
  Comments.find(postKey, projection)
    .then(res => {
      console.log(res);
    });
};

/**
 * Get all user keys that commented on this post by post key
 * @param {String} postKey
 * @param {Object} userKey
 */

exports.getAllUserKeysCommented = async (posts, projection) => {
  Comments.find(posts, projection).populate('post').populate('user')

  // .populate('user').populate('post').exec()

    .then(res => {
      console.log('.........................................', res);
    });

  console.log('1111111111111111111111111', posts);
  console.log('222222222222222222222222', projection);

  // return uniq(res.map(i => i.authorKey));
};

// exports.getAllUserKeysCommented = async (postKey, userKey, { ignoreUserKeys } = {}) => {
//   const query = db(TABLE_NAME)
//     .select('authorKey')
//     .where({ postKey });

//   if (ignoreUserKeys) {
//     query.whereNotIn('authorKey', castArray(ignoreUserKeys));
//   }

//   const res = await query.whereNull('deletedAt');

//   return uniq(res.map(i => i.authorKey));
// };

// exports.getByKey = async (key, projection) => {
//   Users.findOne(key, projection)
//     .then(res => {
//       console.log(res);
//     });
// };
