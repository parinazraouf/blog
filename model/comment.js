require('module-alias/register');

const { db } = require('~/lib/db');
const obj = require('~/lib/obj');

const COLLECTION_NAME = db.collection('commentscollections');

/**
 * Create new comment
 * @param {Object} data     comment data
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.create = async (data, { returning = 'key', transaction } = {}) => {
  const query = db.COLLECTION_NAME
    .insertOne(data)
    .returning(obj.castArrayIfNotEmpty(returning));

  if (transaction) {
    query.transacting(transaction);
  }

  return query;
};

/**
 * Update comment
 * @param {Object} condition
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<Object>}
 */
const update = exports.update = async (condition, data, { returning = 'key', transaction } = {}) => {
  data.updatedAt = db.fn.now();

  const query = db.COLLECTION_NAME
    .updateOne(data)
    .where(condition)
    .$isEmpty('deletedAt')
    .returning(obj.castArrayIfNotEmpty(returning));

  if (transaction) {
    query.transacting(transaction);
  }

  return query;
};

/**
 * Delete comment
 * @param {Object} condition
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.delete = async (condition, { returning = 'key', transaction } = {}) =>{
    const query = db.COLLECTION_NAME
      .findOneAndDelete(condition)
      .returning(obj.castArrayIfNotEmpty(returning))
      .updateOne(condition, { deletedAt: db.fn.now() }, { returning, transaction });
};

/**
 * Get comment by key
 * @param {String} key
 * @param {Object} projection
 * @returns {Promise<Object>}
 */
exports.getByKey = (key, projection) => {
  db.COLLECTION_NAME
    .findOne(projection)
    .where({ key })
    .$isEmpty('deletedAt');
};


comments.save(function (err) {
  if (err) return handleError(err);
  // saved!
});