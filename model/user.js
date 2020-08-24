const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// mongoose.connect('mongodb://localhost:27017/blogdb', { useNewUrlParser: true });
// const db = require('~/lib/db');
// mongoose.connect(db);

const usersSchema = new Schema({
  key: { type: mongoose.Types.ObjectId },
  phone_number: { type: Number },
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
  const query = Users.create({ ...data }, { '$set': { createdAt: Date.now() } });

  const createUser = new Users({ query });

  // createUser.save();
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
  const query = Users.findOneAndUpdate({ condition }, { ...data }, { '$set': { updatedAt: Date.now() } });

  const updateUser = new Users({ query });

  // updateUser.save();
  updateUser.save(function (err, updateUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document update done');
    }
  });
};

/**
  * Delete user
  * @param {Object} condition
*/
exports.delete = async (condition) => {
  const query = Users.findOneAndDelete({ condition }, { '$set': { deletedAt: Date.now() } });

  const deleteUser = new Users({ query });

  // deleteUser.save();
  deleteUser.save(function (err, deleteUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document delete done');
    }
  });
};

/**
  * Get user by key
  * @param {String} key
  * @param {Object} projection
*/
exports.getUserByKey = async (key, projection) => {
  Users.findOne({ projection }, { key }, { '$ne': { deletedAt: null } });
};

/**
  * Get user by phoneNumber
  * @param {String} phoneNumber
  * @param {Object} projection
*/
exports.getUserByPhoneNumber = async (phoneNumber, projection) => {
  Users.findOne({ projection }, { phoneNumber }, { '$ne': { deletedAt: null } });
};

/**
 * Get user by username
 * @param {String} username
 * @param {Object} projection
 */
exports.getUserByUserName = (username, projection) => {
  Users.findOne({ projection }, { username }, { '$ne': { deletedAt: null } });
};
