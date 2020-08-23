const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost:27017/blogdb', { useNewUrlParser: true });
// const db = require('~/db');
// mongoose.connect(db);

const countersSchema = new Schema({
  id: { type: Number },
  target_key: mongoose.Types.ObjectId,
  target_type: { type: Number },
  counter_field: { type: String },
  value: { type: Number },
  user_key: mongoose.Types.ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  post: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

const Counters = mongoose.model('counters', countersSchema);

/**
 * Upsert counter
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.upsert = async (data) => {
  const query = Counters.insertMany([{ data }, { '$set': { createdAt: Date.now() } }]);

  const createCounter = new Counters({ query });

  // createCounter.save();
  createCounter.save(function (err, createCounter) {
    if (err) {
      console.log(err);
    } else {
      console.log('Document save done');
    }
  });
};

/**
 * Get all by target
 * @param {String} targetKey
 * @param {Number} targetType
 * @param {String} counterField
*/
exports.getByTarget = async (targetKey, targetType, counterField) => {
  Counters.find({ targetType }, { targetKey }, { counterField });
};
