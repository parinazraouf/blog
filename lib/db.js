const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogdb', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const usersSchema = new Schema({
  key: usersSchema.Types.ObjectIdObjectId, 
  phone_number: Number,
  created_At:   Date,
  updated_At:   Date,
  deleted_At:   Date,

});

const users = mongoose.model('users', usersSchema);

users.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

const postsSchema = new Schema({
  id: Number,
  key: postsSchema.Types.ObjectIdObjectId, 
  content: String,
  attachment_key: postsSchema.Types.ObjectIdObjectId,
  author_key: postsSchema.Types.ObjectIdObjectId,
  likes_count: Number,
  comments_count: Number,
  created_At:   Date,
  updated_At:   Date,
  deleted_At:   Date,

});

const posts = mongoose.model('posts', postsSchema);

posts.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

const commentsSchema = new Schema({
  id: Number,
  key: commentsSchema.Types.ObjectIdObjectId, 
  content: String,
  attachment_key: commentsSchema.Types.ObjectIdObjectId,
  author_key: commentsSchema.Types.ObjectIdObjectId,
  post_key: commentsSchema.Types.ObjectIdObjectId,
  likes_count: Number,
  created_At:   Date,
  updated_At:   Date,
  deleted_At:   Date,

});

const comments = mongoose.model('comments', commentsSchema);

comments.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
