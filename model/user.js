const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const usersSchema = new Schema({
  key: { type: mongoose.Types.ObjectId },
  phoneNumber: { type: String },
  userName: { type: String },
  displayName: { type: String },
  password: { type: String },
  avatarKey: { type: mongoose.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

const Users = mongoose.model('users', usersSchema);

/**
  * Create new user
  * @param {Object} data     user data
*/
exports.create = async (data) => {
  const createUser = new Users({ ...data });

  createUser.save(function (err, createUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document save done');
    }
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
exports.getByKey = async (key, projection) => {
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
exports.getByPhoneNumber = async (phoneNumber, projection) => {
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
exports.getByUserName = (username, projection) => {
  Users.findOne(username, projection)
    .then(res => {
      console.log(res);
    });
};
