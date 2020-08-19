require('module-alias/register');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  key: mongoose.Types.ObjectId,
  phone_number: { type: Number },
  displayName: { type: String },
  password: { type: String },
  avatarKey: mongoose.Types.ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

// const COLLECTION_NAME = 'users';

const Users = mongoose.model('users', usersSchema);

/**
  * Create new user
  * @param {Object} data     user data
*/
exports.create = async (data) => {
  const query = Users.insertMany([{ data }, { '$set': { createdAt: Date.now() } }]);

  console.log('////////////', query); // it stays pending and wont be written in my db
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
  const query = Users.findOneAndUpdate({ condition }, { data }, { '$set': { updatedAt: Date.now() } });

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
