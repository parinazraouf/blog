require('module-alias/register');
const mongoose = require('mongoose');

const testModelCreateUser = require('~/model/user');

const res = testModelCreateUser.create({
  key: '53cb6b9b4f4ddef1ad47f943',
  phoneNumber: 937603274,
  displayName: 'pariiiiiiiiiiiiiiiiiiiiinazzzzzzzzzzzzzzz',
  password: '23456'
});

console.log('/...................', res);
console.log(mongoose.Types.ObjectId.isValid('53cb6b9b4f4ddef1ad47f943'));
