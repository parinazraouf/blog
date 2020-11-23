const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const usersSchema = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  key: { type: Schema.Types.ObjectId },
  phoneNumber: { type: String },
  userName: { type: String },
  displayName: { type: String },
  password: { type: String },
  avatarKey: { type: Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  post: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
});

const Users = mongoose.model('users', usersSchema);

/**
  * Create new user
  * @param {Object} data     user data
*/
exports.create = async (data) => {
  const post = new Users({
    _id: new mongoose.Types.ObjectId()
  });

  const comment = new Users({
    _id: new mongoose.Types.ObjectId()
  });

  const createUser = new Users({
    post: post._id,
    comment: comment._id,
    ...data

  });

  createUser.save(function (err) {
    if (err) return (err);
  });
};

/**
  * Update user
  * @param {Object} condition
  * @param {Object} data
*/
exports.update = async (condition, data) => {
  Users.findOne({ condition })
    .then(query => Users.updateOne({ ...data, updatedAt: Date.now() }));
};

/**
  * Delete user
  * @param {Object} condition
*/
exports.delete = async (condition) => {
  Users.deleteOne(condition, function (err) {
    if (err) console.log(err);
  });
};

/**
  * Get user by key
  * @param {String} key
  * @param {Object} projection
  * @returns {Promise<Object>}
*/
exports.getUserByKey = async (key, projection) => {
  Users.findOne(key, projection)
    .then(res => {
      console.log(res);
    });
};

/**
  * Get user by phoneNumber
  * @param {String} phoneNumber
  * @param {Object} projection
  * @returns {Promise<Object>}
*/
exports.getUserByPhoneNumber = async (phoneNumber, projection) => {
  Users.findOne(phoneNumber, projection)
    .then(res => {
      console.log(res);
    });
};

/**
 * Get user by username
 * @param {String} username
 * @param {Object} projection
 * @returns {Promise<Object>}
*/
exports.getUserByUsername = (username, projection) => {
  Users.findOne(username, projection)
    .then(res => {
      console.log(res);
    });
};
