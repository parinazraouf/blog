exports.app = {
  forbiddenAccess: [
    403,
    'forbidden access',
    {
      code: 'forbiddenAccess'
    }
  ],

  permissionDenied: [
    403,
    'permission denied',
    {
      code: 'permissionDenied'
    }
  ],

  invalidInput: [
    400,
    'input is invalid',
    {
      code: 'invalidInput'
    }
  ],

  badRequest: [
    400,
    'bad request',
    {
      code: 'badRequest'
    }
  ]
};

exports.user = {
  userNotFound: [
    404,
    'user not found',
    {
      code: 'userNotFound'
    }
  ],

  usernameAlreadyTaken: [
    422,
    'username has already been taken',
    {
      code: 'usernameAlreadyTaken'
    }
  ],

  phoneNumberAlreadyTaken: [
    422,
    'phone number has already been taken',
    {
      code: 'phoneNumberAlreadyTaken'
    }
  ]
};

exports.post = {
  postNotFound: [
    404,
    'post not found',
    {
      code: 'postNotFound'
    }
  ],

  postEditHasExpired: [
    403,
    'post edit has been expired',
    {
      code: 'postEditHasExpired'
    }
  ]
};

exports.comment = {
  commentNotFound: [
    404,
    'comment not found',
    {
      code: 'commentNotFound'
    }
  ]
};
