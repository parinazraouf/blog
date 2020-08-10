const { Joi } = require('../lib/validate');

const properties = {
  post: [
  'id',
  'key',
  'content',
  'attachmentKey',
  'authorKey',
  'likesCount',
  'commentsCount',
  'createdAt',
  'updatedAt',
  'deletedAt'
  ]
};

module.exports = router => {

};