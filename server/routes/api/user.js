require('module-alias/register');

const { httpInvariant } = require('~/lib/error');
const { Joi } = require('~/lib/validate');
const { user: userLimit } = require('~/config/limit');
const { app: appLimit } = require('~/config/limit');
const userModel = require('~/model/user');

const {
  user: userError
} = require('~/config/error');

const properties = {
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
  const createUserSchema = Joi.object().keys({
    phoneNumber: Joi.phoneNumber().irMobile().required(),
    displayName: Joi.string().min(userLimit.displayNameLengthRange[0]).max(userLimit.displayNameLengthRange[1]).required().trim(),
    userName: Joi.string().min(userLimit.usernameLengthRange[0]).max(userLimit.usernameLengthRange[1]).required().trim(),
    password: Joi.string().min(appLimit.passwordLengthRange[0]).max(appLimit.passwordLengthRange[1]).required(),
    avatarKey: Joi.string().uuid({ version: 'uuidv4' }).allow(null)
  });

  router.post('/api/user/create', async ctx => {
    const data = Joi.attempt(ctx.request.body, createUserSchema);

    // Insert `user` record
    const [user] = await userModel.create({
      phoneNumber: data.phoneNumber,
      displayName: data.displayName,
      userName: data.userName,
      password: data.password
    });

    ctx.bodyOk(user);
  });

  const editUserSchema = Joi.object().keys({
    phoneNumber: Joi.phoneNumber().irMobile().required(),
    displayName: Joi.string().min(userLimit.displayNameLengthRange[0]).max(userLimit.displayNameLengthRange[1]).trim(),
    username: Joi.name().username(),
    password: Joi.string().min(appLimit.passwordLengthRange[0]).max(appLimit.passwordLengthRange[1])
  });

  router.put('/api/user/edit', async ctx => {
    const data = Joi.attempt(ctx.request.body, editUserSchema);
    const userKey = ctx.state.user.key;

    const user = await userModel.getUserByKey(userKey, [
      'key',
      'phoneNumber',
      'displayName',
      'username',
      'password'
    ]);

    httpInvariant(user, ...userError.userNotFound);

    if (data.username) {
      const isExist = await userModel.getUserByUsername(data.username, ['key']);

      httpInvariant(!isExist, ...userError.usernameAlreadyTaken);
    }

    const [updatedUser] = await userModel.update({ key: userKey }, data);

    ctx.bodyOk(updatedUser);
  });

  const deleteUserSchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.delete('/api/user/delete', async ctx => {
    const { key } = Joi.attempt(ctx.params, deleteUserSchema);

    // Check user existence
    const user = await userModel.getUserByKey(key, ['key']);

    httpInvariant(user, ...userError.userNotFound);

    const [res] = await userModel.delete({ key });

    ctx.bodyOk(!!res);
  });

  const getUserByKeySchema = Joi.object().keys({
    key: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.get('/api/user/key/:key', async ctx => {
    const { key } = Joi.attempt(ctx.params, getUserByKeySchema);
    const userKey = ctx.state.user.key;

    const user = await userModel.getUserByKey(key, properties.user, {
      viewerUserKey: userKey
    });

    httpInvariant(user, ...userError.userNotFound);

    ctx.bodyOk(user);
  });

  const getUserByUsernameSchema = Joi.object().keys({
    userName: Joi.string().uuid({ version: 'uuidv4' }).required()
  });

  router.get('/api/user/username/:username', async ctx => {
    const { userName } = Joi.attempt(ctx.params, getUserByUsernameSchema);

    const user = await userModel.getUserByUserName(userName, ['key', 'username']);

    httpInvariant(user, ...userError.userNotFound);

    ctx.bodyOk(user);
  });

  const getUserByPhonenumberSchema = Joi.object().keys({
    phoneNumber: Joi.phoneNumber().irMobile().required()
  });

  router.get('/api/user/phonenumber/:phonenumber', async ctx => {
    const { phoneNumber } = Joi.attempt(ctx.params, getUserByPhonenumberSchema);

    const user = await userModel.getUserByPhoneNumber(phoneNumber, ['key', 'phonenumber']);

    httpInvariant(user, ...userError.userNotFound);

    ctx.bodyOk(user);
  });

  const checkUsernameExistenceSchema = Joi.object().keys({
    username: Joi.name().username().required()
  });

  // Check username existence
  // This api will return `false` if username doesn't exist and `true` if username is aleady exist
  router.get('/api/user/username/:username/check', async ctx => {
    const { username } = Joi.attempt(ctx.params, checkUsernameExistenceSchema);

    // Check username existence
    const user = await userModel.getByUsername(username, ['key', 'username']);

    ctx.bodyOk(!!user);
  });
};
