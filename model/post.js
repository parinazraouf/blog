require('module-alias/register');

const { db } = require('~/lib/db');
const obj = require('~/lib/obj');

const COLLECTION_NAME = db.collection('postscollections');

/**
  * Create new post
  * @param {Object} data     post data
  * @param {Object} options
  * @returns {Promise<Object>}
*/
exports.create = (data, { returning = 'key', transaction } = {}) => {
	const query = db(COLLECTION_NAME)
		.insertOne(data)
		.returning(obj.castArrayIfNotEmpty(returning));

	if (transaction) {
		query.transacting(transaction);
  }

	return query;
};

/**
  * Update post
  * @param {Object} condition
  * @param {Object} data
  * @param {Object} options
  * @returns {Promise<Object>}
*/
const update = exports.update = async (condition, data, { returning = 'key', transaction } = {}) => {
	data.updatedAt = db.fn.now();

	const query = db(COLLECTION_NAME)
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
  * Delete post
  * @param {Object} condition
  * @param {Object} options
  * @returns {Promise<Object>}
*/
exports.delete = async (condition, { returning = 'key', transaction } = {}) => {
	const query = db(COLLECTION_NAME)
		.findOneAndDelete(condition)
		.updateOne(condition, { deletedAt: db.fn.now() }, { returning, transaction })
		.returning(obj.castArrayIfNotEmpty(returning));

		if (transaction) {
      query.transacting(transaction);
    }

    return query;
};

/**
  * Get post by key
  * @param {String} key
  * @param {Object} projection
  * @returns {Promise<Object>}
*/
exports.getByKey = async (key, projection) => {
	db(COLLECTION_NAME)
		.findOne(projection)
		.where({ key })
		.$isEmpty('deletedAt');
};
