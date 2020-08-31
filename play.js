// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelCreateUser = require('~/model/user');

// const res = testModelCreateUser.create({
//   key: '53cb6b9b4f4ddef1ad47f202',
//   phoneNumber: '989122222222',
//   userName: 'userNumber2',
//   displayName: 'user 2',
//   password: '2222'
// });

// console.log('/...................', res);
// console.log(mongoose.Types.ObjectId.isValid('53cb6b9b4f4ddef1ad47f943'));

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

require('module-alias/register');

const testModelCreateUser = require('~/model/user');

const res = testModelCreateUser.getByUserName(
  { userName: 'userNumber2' },
  '_id key phoneNumber userName displayName created_at updated_at '
);

console.log('/...................', res);
