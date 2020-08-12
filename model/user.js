require('module-alias/register');

const { db } = require('~/lib/db');
const obj = require('~/lib/obj');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  key: mongoose.Types.ObjectId,
  phone_number: {type:Number},
  created_at:  {type: Date, default: Date.now},
  updated_at:  {type: Date, default: Date.now},
  deleted_at:  {type: Date, default: null}
});

//const COLLECTION_NAME = 'users';

const users = mongoose.model('users', usersSchema);

/**
  * Create new user
  * @param {Object} data     user data
*/
exports.create = async (data) => {
  const query = users.insertMany([{ data }, {"$set": {createdAt: Date.now()}}]);

  console.log('////////////', query);
  const createUser = new users({ query });

  // createUser.save();
  createUser.save(function(err,createUser) {
    if(err) {
      console.log(err);
    } else {
      console.log("Document save done");
    }
  });
};

/**
  * Update user
  * @param {Object} condition
  * @param {Object} data
*/
exports.update = async (condition, data) => {
  const query = users.findOneAndUpdate({condition}, {data}, {"$set": {updatedAt: Date.now()}});

  const updateUser = new users({ query });

  // updateUser.save();
  updateUser.save(function(err,updateUser) {
    if(err) {
      console.log(err);
    } else {
      console.log("Document update done");
    }
  });
};

/**
  * Delete user
  * @param {Object} condition
*/
exports.delete = async (condition) => {
  const query = users.findOneAndDelete({condition}, {"$set": {deletedAt: Date.now()}});

  const deleteUser = new users({ query });

  // deleteUser.save();
  deleteUser.save(function(err,deleteUser) {
    if(err) {
      console.log(err);
    } else {
      console.log("Document delete done");
    }
  });
};

/**
  * Get user by key
  * @param {String} key
  * @param {Object} projection
*/
exports.getByKey = async (key, projection) => {
  users.findOne({projection}, {key}, {"$ne": {deletedAt: null}});
};

/**
  * Get user by phoneNumber
  * @param {String} phoneNumber
  * @param {Object} projection
*/
exports.getByPhoneNumber = async (phoneNumber, projection) => {
  users.findOne({projection}, {phoneNumber}, {"$ne": {deletedAt: null}});    
};
