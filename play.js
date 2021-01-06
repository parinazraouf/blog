// const mongoose = require('mongoose');
// const testModelCreatePost = require('~/model/post');

// require('module-alias/register');

// const testModelCreateUser = require('~/model/user');

// const res = testModelCreateUser.create({
//   key: '53cb6b9b4f4ddef1ad47f222',
//   phoneNumber: '989122222222',
//   userName: 'userNumber2',
//   displayName: 'user 2',
//   password: '2222'
// });

// console.log('/...................', res);

require('module-alias/register');

const testModelCreateUser = require('~/model/user');

const res = testModelCreateUser.update(
  { userName: 'userNumber9' },
  {
    phoneNumber: '989121212122',
    userName: 'num12',
    password: '1212'
  });

console.log('/...................', res);

// require('module-alias/register');

// const testModelCreateUser = require('~/model/user');

// const res = testModelCreateUser.delete(
//   { id: '5fec63fe7c41b004378c92e2' });

// console.log('/...................', res);

// require('module-alias/register');

// const testModelCreateUser = require('~/model/user');

// const res1 = testModelCreateUser.getUserById(
//   '5fd5ae1894a01619ee883515',
//   [' key', 'phoneNumber', 'userName ']
// );
// console.log('.............................', res1);

// require('module-alias/register');

// const testModelCreateUser = require('~/model/user');

// const res1 = testModelCreateUser.getUserByKey(
//     { key: '53cb6b9b4f4ddef1ad47f111' },
//     ['_id', 'key', 'phoneNumber', 'userName', 'displayName']
// );
// console.log('.............................', res1);

// require('module-alias/register');

// const testModelCreateUser = require('~/model/user');

// const res1 = testModelCreateUser.getUserByPhoneNumber(
//   { phoneNumber: '989121111111' },
//   ['_id', 'key', 'userName', 'displayName']
// );

// console.log('.............................', res1);

// require('module-alias/register');

// const testModelCreateUser = require('~/model/user');

// const res1 = testModelCreateUser.getUserByUsername(
//   { userName: 'userNumber3' },
//   ['_id', 'key', 'phoneNumber', 'displayName']
// );

// console.log('.............................', res1);

// require('module-alias/register');

// const testModelCreatePost = require('~/model/post');
// const res = testModelCreatePost.create(
//   {
//     key: '53cb6b9b4f4ddef1ad47c3',
//     content: 'hello 3',
//     authorKey: '53cb6b9b4f4ddef1ad47f222',
//     likesCount: 200,
//     commentsCount: 20,
//     category: 'category 2'
//   }
// );

// console.log('/...................', res);

// require('module-alias/register');

// const testModelCreatePost = require('~/model/post');
// const res = testModelCreatePost.getAllPostsByUserKey(
//   { authorKey: '53cb6b9b4f4ddef1ad47f222' },
//   ['_id', 'key', 'content', 'authorKey', 'likesCount', 'commentsCount', 'created_at', 'updated_at ']
// );

// console.log('/...................', res);

// require('module-alias/register');

// const testModelCreatePost = require('~/model/post');

// const res = testModelCreatePost.getAllLikedUsersList(
//   '5fd6099780da5d3d7b8ed6da',
//   ['_id', 'likesCount', 'commentsCount', 'content', 'authorkey', 'userName']
// );

// console.log('/...................', res);

// require('module-alias/register');

// const testModelCreatePost = require('~/model/post');
// const res = testModelCreatePost.getAllPostsByCategory(
//   { category: 'category 2' },
//   ['_id', 'key', 'content', 'authorKey', 'likesCount', 'commentsCount', 'created_at', 'updated_at ']
// );

// console.log('/...................', res);

// require('module-alias/register');

// const testModelCreatePost = require('~/model/post');

// const res = testModelCreatePost.getAllPosts(
//   ['_id', 'likesCount', 'commentsCount', 'content', 'authorkey', 'userName']
// );

// console.log('/...................', res);

// require('module-alias/register');

// const testModelCreateComment = require('~/model/comment');

// const res = testModelCreateComment.create({
//   key: '53cb6b9b4f4ddef1ad47f402',
//   content: 'comment 2',
//   attachmentKey: '53cb6b9b4f4ddef1ad47c777',
//   authorKey: '53cb6b9b4f4ddef1ad47f111',
//   postKey: '53cb6b9b4f4ddef1ad47b444',
//   likesCount: 2
// });

// console.log('/...................', res);

// require('module-alias/register');

// const testModelCreateComment = require('~/model/comment');

// const res = testModelCreateComment.getAllCommentsByPostKey(
//   { postKey: '53cb6b9b4f4ddef1ad47b444' },
//   [' content ', 'authorKey', 'likesCount']

// );

// console.log('/...................', res);

// require('module-alias/register');

// const testModelGetComments = require('~/model/comment');

// const res = testModelGetComments.getAllUserKeysCommented(
//   ['authorK ']

// );

// console.log('/...................', res);

// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelGetCounter = require('~/model/counter');

// const res = testModelGetCounter.upsert(
//   { targetKey: '1fb50f95ded9d0907e6d6da1',
//     targetType: 1,
//     counterField: 'likesCount',
//     value: 2,
//     userKey: '53cb6b9b4f4ddef1ad47f404'
//   }
// );

// console.log('/...................', res);
