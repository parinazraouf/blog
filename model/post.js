require('module-alias/register');

const { db } = require('~/lib/db');
const obj = require('~/lib/obj');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  id: {type:Number},
  key: mongoose.Types.ObjectId,
  content: {type:String},
  attachment_key: mongoose.Types.ObjectId,
  author_key: mongoose.Types.ObjectId,
  likes_count: {type:Number},
  comments_count: {type:Number},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  deleted_at: {type: Date, default: null},
  user: [{type: Schema.Types.ObjectId, ref: 'users'}],
  comment: [{type: Schema.Types.ObjectId, ref: 'comments'}]
});

//const COLLECTION_NAME = 'posts';

const posts = mongoose.model('posts', postsSchema);

/**
  * Create new post
  * @param {Object} data     post data
*/
exports.create = async (data) => {
	const query = posts.insertMany([{ data }, {"$set": {createdAt: Date.now()}}]);

  const createPost = new posts({ query });

  // createPost.save();
  createPost.save(function(err,createPost) {
    if(err) {
      console.log(err);
    } else {
      console.log("Document save done");
    }
  });
};

/**
  * Update post
  * @param {Object} condition
  * @param {Object} data
*/
exports.update = async (condition, data) => {
  const query = posts.findOneAndUpdate({condition}, {data}, {"$set": {updatedAt: Date.now()}});

  const updatePost = new posts({ query });

  // updatePost.save();
  updatePost.save(function(err,updatePost) {
    if(err) {
      console.log(err);
    } else {
      console.log("Document update done");
    }
  });

};

/**
  * Delete post
  * @param {Object} condition
*/
exports.delete = async (condition) => {
	const query = posts..findOneAndDelete({condition}, {"$set": {deletedAt: Date.now()}});

  const deletePost = new posts({ query });

  // deletePost.save();
  deletePost.save(function(err,deletePost) {
    if(err) {
      console.log(err);
    } else {
      console.log("Document delete done");
    }
  });
};

/**
  * Get post by key
  * @param {String} key
  * @param {Object} projection
*/
exports.getByKey = async (key, projection) => {
	posts.findOne({projection}, {key}, {"$ne": {deletedAt: null}});
};


