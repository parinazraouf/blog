require('module-alias/register');

const get = require('lodash/get');
const { httpInvariant } = require('~/lib/error');
const { Joi } = require('~/lib/validate');
const { counter: counterEnum } = require('~/config/enum');
const { comment: commentLimit } = require('~/config/limit');
const commentModel = require('~/model/post/comment');
const postModel = require('~/model/post');
const request = require('~/lib/request');

const {
  app: appError,
  post: postError,
  comment: commentError
} = require('~/config/error');

const properties = {
  comment: [
    'id',
    'key',
    'content',
    'attachmentKey',
    'authorKey',
    'postKey',
    'likesCount',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ],
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
  const sendCommentSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required(),
    content: Joi.string().min(commentLimit.contentLengthRange[0]).max(commentLimit.contentLengthRange[1]).required().trim()
  });

  router.post('/api/post/comment/create/:key', async ctx => {
    const { key, content } = Joi.attempt({ ...ctx.request.body, key: ctx.params.key }, sendCommentSchema);
    const userKey = ctx.state.user.key;

    const post = await postModel.getByKey(key, ['key', 'content']);

    // Check if user exists or doesn't
    httpInvariant(post, ...postError.postNotFound);

    const [res] = await commentModel.create({
      content,
      authorKey: userKey,
      postKey: key
    });

    ctx.bodyOk(res);
  });

  const editCommentSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required(),
    content: Joi.string().min(commentLimit.contentLengthRange[0]).max(commentLimit.contentLengthRange[1]).required().trim()
  });

  router.put('/api/post/comment/edit/:key', async ctx => {
    const { key, content } = Joi.attempt({ ...ctx.request.body, key: ctx.params.key }, editCommentSchema);
    const userKey = ctx.state.user.key;

    const comment = await commentModel.getByKey(key, ['key', 'postKey', 'authorKey']);

    // Check comment existence
    httpInvariant(comment, ...commentError.commentNotFound);

    // Check comment's author
    const post = await postModel.getByKey(comment.postKey, ['key']);

    httpInvariant(post && comment.authorKey === userKey, ...appError.forbiddenAccess);

    // Edit comment
    const [res] = await commentModel.update({ key }, { content });

    ctx.bodyOk(!!res);
  });

  const deleteCommentSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.delete('/api/post/comment/delete/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params, deleteCommentSchema);
    const userKey = ctx.state.user.key;

    const comment = await commentModel.getByKey(key, ['key', 'postKey', 'authorKey']);

    // Check comment existence
    httpInvariant(comment, ...commentError.commentNotFound);

    // Check comment's author
    const post = await postModel.getByKey(comment.postKey, ['key']);

    httpInvariant(post && comment.authorKey === userKey, ...appError.forbiddenAccess);

    // Delete comment
    const [res] = await commentModel.delete({ key });

    ctx.bodyOk(!!res);
  });

  const likeCommentSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.put('/api/post/comment/like/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params, likeCommentSchema);
    const userKey = ctx.state.user.key;

    const comment = await commentModel.getByKey(key, ['key', 'authorKey', 'content', 'postKey', 'likesCount']);

    // Check comment existence
    httpInvariant(comment, ...commentError.commentNotFound);

    const post = await postModel.getByKey(comment.postKey, [
      'key',
      'content',
      'attachmentKey',
      'likesCount',
      'authorKey'
    ]);

    // Check if user exists or doesn't
    httpInvariant(post, ...appError.forbiddenAccess);

    const { body: { data: res } } = await request('PUT', `/api/counter/create`, {
      targetKey: key,
      targetType: counterEnum.targetType.comment,
      counterField: 'likesCount',
      userKey
    });

    // Total count
    const total = res.value ? +comment.likesCount + 1 : +comment.likesCount - 1;

    ctx.bodyOk({ total });
  });

  const getAllPostCommentsSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.get('/api/post/comment/all/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params.key, getAllPostCommentsSchema);
    const userKey = get(ctx.state, 'user.key');

    const post = await postModel.getByKey(key, ['key']);

    // Check if user exists or doesn't
    httpInvariant(post, ...postError.postNotFound);

    const res = await commentModel.getAllByPostKey(key, userKey, properties.comment);

    ctx.body = res;
  });
};
