const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbUrl = 'mongodb://localhost:27017/blogdb';
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const countersSchema = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  targetKey: { type: Schema.Types.ObjectId },
  targetType: { type: Number },
  counterField: { type: String },
  value: { type: Number },
  userKey: { type: Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  post: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
});

const Counters = mongoose.model('counters', countersSchema);

/**
 * Upsert counter
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.upsert = async (data) => {
  // const createCounter = new Counters({ ...data });

  // createCounter.save(function (err, createCounter) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Document save done');
  //   }
  // });

  const user = new Counters({
    _id: new mongoose.Types.ObjectId()
  });

  const post = new Counters({
    _id: new mongoose.Types.ObjectId()
  });

  const comment = new Counters({
    _id: new mongoose.Types.ObjectId()
  });

  const createCounter = new Counters({
    user: user._id,
    post: post._id,
    comment: comment._id,
    ...data

  });

  createCounter.save(function (err) {
    if (err) return (err);
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
