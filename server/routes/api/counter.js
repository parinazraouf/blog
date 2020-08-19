const { Joi } = require('~/lib/validate');
const { counter: counterEnum } = require('~/config/enum');
const counterModel = require('~/model/counter');

const properties = {
  counter: [
    'targetKey',
    'targetType',
    'counterField',
    'userKey',
    'value',
    'createdAt',
    'updatedAt'
  ]
};

module.exports = router => {
  const addCounterSchema = Joi.object().keys({
    targetKey: Joi.string().uuid({ version: 'uuidv4' }).required(),
    targetType: Joi.number().valid(Object.values(counterEnum.targetType)).required(),
    counterField: Joi.string().required(),
    userKey: Joi.string().uuid({ version: 'uuidv4' }).required(),
    value: Joi.number().min(1).max(5)
  });

  router.put('/api/counter/create', async ctx => {
    const data = Joi.attempt(ctx.request.body, addCounterSchema);

    const res = await counterModel.upsert(data);

    ctx.bodyOk(res);
  });

  const getCountersByTargetKeySchema = Joi.object().keys({
    targetKey: Joi.string().uuid({ version: 'uuidv4' }).required(),
    targetType: Joi.number().valid(Object.values(counterEnum.targetType)).required(),
    counterField: Joi.string()
  });

  router.get('/api/counter/target/:targetKey/type/:targetType/counterField/:counterField', async ctx => {
    const {
      targetKey,
      targetType,
      counterField
    } = Joi.attempt(ctx.params, getCountersByTargetKeySchema);

    const res = await counterModel.getByTarget(targetKey, targetType, counterField);

    ctx.bodyOk(res);
  });
};
