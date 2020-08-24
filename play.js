require('module-alias/register');

const testModelCreateUser = require('~/model/user');

const res = testModelCreateUser.create({
  key: 'a5227d6e-c716-416d-ab15-ae2d21631123',
  phoneNumber: 9126933608,
  displayName: 'samantha fox',
  password: '123456'
});

console.log('/...................', res);
