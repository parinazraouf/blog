// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelCreateUser = require('~/model/user');
// // const testModelCreatePost = require('~/model/post');

// const res = testModelCreateUser.create({
//   key: '53cb6b9b4f4ddef1ad47f404',
//   phoneNumber: '989129999999',
//   userName: 'userNumber9',
//   displayName: 'user 9',
//   password: '9999'
// });

// console.log('/...................', res);

// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelCreateUser = require('~/model/user');

// const res = testModelCreateUser.update(
//   { key: '53cb6b9b4f4ddef1ad47f560' },
//   {
//     phoneNumber: '989123333444',
//     displayName: 'mahhhhhhhmoooooddddddddd',
//     password: '0000'
//   });

// console.log('/...................', res);
// console.log(mongoose.Types.ObjectId.isValid('53cb6b9b4f4ddef1ad47f943'));

// require('module-alias/register');

// const testModelCreateUser = require('~/model/user');
// const testModelCreatePost = require('~/model/post');

// const res1 = testModelCreateUser.getByKey(
//   { key: '53cb6b9b4f4ddef1ad47f404' },
//   '_id key phoneNumber userName displayName created_at updated_at'
// );

// console.log('//////////////////////////', res1);

// const res = testModelCreatePost.getAllPostsByUserKey(
//   { authorKey: '5fb24e67884ea877fceb11c4' },
//   '_id key content authorKey attachmentKey likesCount commentsCount created_at updated_at '
// );

// console.log('/...................', res);

// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelCreatePost = require('~/model/post');

// const res = testModelCreatePost.create({
//   key: '53cb6b9b4f4ddef1ad47a222',
//   content: 'Hello 2',
//   authorKey: '5fb4c54bb6d8a050c09ec328'
// });

// console.log('/...................', res);

// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelCreateComment = require('~/model/comment');

// const res = testModelCreateComment.create({
//   key: '53cb6b9b4f4ddef1ad47f402',
//   content: 'comment 2',
//   attachmentKey: '53cb6b9b4f4ddef1ad47c777',
//   authorKey: '5fb24e67884ea877fceb11c4',
//   postKey: '53cb6b9b4f4ddef1ad47a111',
//   likesCount: 2
// });

// console.log('/...................', res);

// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelCreateComment = require('~/model/comment');

// const res = testModelCreateComment.getAllUserKeysCommented(
//   { posts: '5fb516cb4f3a2f9b00e36545' },
//   ' authorKey '

// );

// console.log('/...................', res);

// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelGetComments = require('~/model/comment');

// const res = testModelGetComments.getAllUserKeysCommented(
//   { postsId: '5fb50f95ded9d0907e6d6da3' },
//   'key '

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
