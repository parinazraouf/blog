const testModelCreateUser = require('~/model/comment');

testModelCreateUser.getAllByPostKey({
  key: 'a5227d6e-c716-416d-ab15-ae2d21631123'
});

// .then(res => {
//   console.log('////////////////////////////////////', res);
// });

// users.find({ phoneNumber: '9126934404' }).where('createdAt').gt(oneYearAgo).exec(callback);
