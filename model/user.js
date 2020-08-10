require('module-alias/register');

const { db } = require('~/lib/db');
const obj = require('~/lib/obj');

const COLLECTION_NAME = db.collection('userscollections');

/**
  * Create new user
  * @param {Object} data     user data
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
  * Update user
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
  * Delete user
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
  * Get user by key
  * @param {String} key
  * @param {Object} projection
  * @returns {Promise<Object>}
*/
exports.getByKey = (key, projection, { checkDeletedAt = true } = {}) => {
  const query = db(COLLECTION_NAME)
    .findOne(projection)
    .where({ key });

  	if (checkDeletedAt) {
    	query.$isEmpty('deletedAt');
  	}

  	return query;
};

/**
  * Get user by phoneNumber
  * @param {String} phoneNumber
  * @param {Object} projection
  * @returns {Promise<Object>}
*/
exports.getByPhoneNumber = async (phoneNumber, projection) => {
  db(COLLECTION_NAME)
    .findOne(projection)
    .where({ phoneNumber })
    .$isEmpty('deletedAt');
};
