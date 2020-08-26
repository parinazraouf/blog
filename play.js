// require('module-alias/register');
// const mongoose = require('mongoose');

// const testModelCreateUser = require('~/model/user');

// const res = testModelCreateUser.create({
//   key: '53cb6b9b4f4ddef1ad47f476',
//   phoneNumber: '989115678906',
//   displayName: 'user 4',
//   password: '1890'
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

const res = testModelCreateUser.delete(
  { key: '53cb6b9b4f4ddef1ad47f476' }
);

console.log('/...................', res);
