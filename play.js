require('module-alias/register');

const testModelCreateUser = require('~/model/user');

testModelCreateUser.create({
  key: 'a5227d6e-c716-416d-ab15-ae2d21631123',
  phoneNumber: '9126934404',
  createdAt: '2019-09-30 19:15:56.608629+00',
  updatedAt: '2019-09-30 19:15:56.608629+00',
  deletedAt: null,


}).then(res => {
  console.log('////////////////////////////////////', res);
});
