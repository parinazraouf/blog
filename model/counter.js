const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const countersSchema = new Schema({
  id: { type: Number },
  target_key: { type: mongoose.Types.ObjectId },
  target_type: { type: Number },
  counter_field: { type: String },
  value: { type: Number },
  user_key: { type: mongoose.Types.ObjectId },
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
  const createCounter = new Counters({ ...data });

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
  Counters.find(targetKey, targetType, counterField)
    .then(res => {
      console.log(res);
    });
};
