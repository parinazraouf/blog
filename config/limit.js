const app = exports.app = {
  paginationLimit: 20,
  shortTextMaxLength: 80,
  summaryTextMaxLength: 120,
  longTextMaxLength: 4096,
  passwordLengthRange: [8, 255]
};

exports.user = {
  displayNameLengthRange: [2, app.shortTextMaxLength],
  usernameLengthRange: [4, app.shortTextMaxLength]
};

exports.post = {
  contentLengthRange: [1, 280],
  maxTimeToEdit: '15m',
  maxPostAttachmentsCount: 20,
  maxPostImagesCount: 10
};

exports.comment = {
  contentLengthRange: [1, 280]
};
