const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/blogdb', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const usersSchema = new Schema({
  key: mongoose.Types.ObjectId,
  phone_number: {type:Number},
  created_At: {type:Date},
  updated_At: {type:Date},
  deleted_At: {type:Date},

});

const usersCollection = mongoose.model('usersCollection', usersSchema);

const users = new usersCollection({ name: 'Users' });

users.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

const postsSchema = new Schema({
  id: {type:Number},
  key: mongoose.Types.ObjectId,
  content: {type:String},
  attachment_key: mongoose.Types.ObjectId,
  author_key: mongoose.Types.ObjectId,
  likes_count: {type:Number},
  comments_count: {type:Number},
  created_At: {type:Date},
  updated_At: {type:Date},
  deleted_At: {type:Date},

});

const postsCollection = mongoose.model('postsCollection', postsSchema);

const posts = new postsCollection({ name: 'Posts' });

posts.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

const commentsSchema = new Schema({
  id: {type:Number},
  key: mongoose.Types.ObjectId,
  content: {type:String},
  attachment_key: mongoose.Types.ObjectId,
  author_key: mongoose.Types.ObjectId,
  post_key: mongoose.Types.ObjectId,
  likes_count: {type:Number},
  created_At: {type:Date},
  updated_At: {type:Date},
  deleted_At: {type:Date},

});

const commentsCollection = mongoose.model('commentsCollection', commentsSchema);

const comments = new commentsCollection({ name: 'Comments' });

comments.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
