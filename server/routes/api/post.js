require('module-alias/register');

const get = require('lodash/get');
const { httpInvariant } = require('~/lib/error');
const { Joi } = require('~/lib/validate');
const { counter: counterEnum } = require('~/config/enum');
const ms = require('ms');
const { post: postLimit } = require('~/config/limit');
const postModel = require('~/model/post');
const userModel = require('~/model/user');
const counterModel = require('~/model/counter');

const {
  app: appError,
  post: postError,
  user: userError
} = require('~/config/error');

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
  ],
  user: [
    'key',
    'phoneNumber',
    'displayName',
    'userName',
    'password',
    'avatarKey',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ]
};

module.exports = router => {
  const createPostSchema = Joi.object().keys({
    content: Joi.string()
      .min(postLimit.contentLengthRange[0])
      .max(postLimit.contentLengthRange[1])
      .trim(),
    imageKeys: Joi.array()
      .items(Joi.string().uuid({ version: 'uuidv4' }).required())
      .min(1)
      .max(postLimit.maxPostImagesCount)
  });

  router.post('/post/create', async ctx => {
    const data = Joi.attempt(ctx.request.body, createPostSchema);
    const userKey = ctx.state.user.key;

    const [newPost] = await postModel.create({
      ...data,
      authorKey: userKey
    });

    ctx.bodyOk(!!newPost);
  });

  const editPostSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required(),
    content: Joi.string()
      .min(postLimit.contentLengthRange[0])
      .max(postLimit.contentLengthRange[1])
      .trim()
  });

  router.put('/post/edit/:key', async ctx => {
    const { key, content } = Joi.attempt({
      ...ctx.request.body,
      key: ctx.params.key
    }, editPostSchema);
    const userKey = get(ctx.state, 'user.key');

    const post = await postModel.getByKey(key, [
      'authorKey',
      'createdAt'
    ]);

    httpInvariant(post, ...postError.postNotFound);

    httpInvariant(userKey === post.authorKey, ...appError.permissionDenied);

    httpInvariant(post.createdAt.getTime() + ms(postLimit.maxTimeToEdit) >= Date.now(), ...appError.permissionDenied);

    const [res] = await postModel.update({ key }, { content });

    ctx.bodyOk(!!res);
  });

  const deletePostSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.delete('/post/delete/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params, deletePostSchema);
    const userKey = ctx.state.user.key;

    // Chech post existence
    const post = await postModel.getByKey(key, ['key', 'authorKey']);

    httpInvariant(post, ...postError.postNotFound);

    httpInvariant(userKey === post.authorKey, ...appError.permissionDenied);

    const [res] = await postModel.delete({ key });

    ctx.bodyOk(!!res);
  });

  const likePostSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.put('/post/like/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params, likePostSchema);
    const userKey = ctx.state.user.key;

    // Check post existence
    const post = await postModel.getByKey(key, [
      'key',
      'content',
      'authorKey',
      'likesCount',
      'attachmentKey'
    ]);

    httpInvariant(post, ...postError.postNotFound);

    // TODO

    // const { body: { data: res } } = await counterModel.upsert, {
    //   targetKey: key,
    //   targetType: counterEnum.targetType.post,
    //   counterField: 'likesCount',
    //   userKey
    // };

    // // Total count
    // const total = res.value ? +post.likesCount + 1 : +post.likesCount - 1;

    // ctx.bodyOk({ total });
  });

  // const getAllUserPostsSchema = Joi.object().keys({
  // });

  router.get('/user/alluserposts', async ctx => {
    const userKey = get(ctx.state, 'user.key');

    // Check user existence
    const user = await userModel.getByKey(userKey, ['key']);

    httpInvariant(user, ...userError.userNotFound);

    const res = await postModel.getAllPostsByUserKey(userKey, properties.post);

    ctx.body = res;
  });

  const getAllLikedUsersListSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.get('/post/like/list/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params.key, getAllLikedUsersListSchema);

    const post = await postModel.getByKey(key, ['key']);

    httpInvariant(post, ...postError.postNotFound);

    const res = await postModel.getAllLikedUsersList(key, properties.user);

    ctx.body = res;
  });

  const getPostByKeySchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.get('/post/key/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params.key, getPostByKeySchema);

    const post = await postModel.getByKey(key, ['key']);

    httpInvariant(post, ...postError.postNotFound);

    const res = await postModel.getByKey(key, properties.post);

    ctx.body = res;
  });
};
