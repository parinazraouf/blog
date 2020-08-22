exports.app = {
  authorizationProblem: [
    500,
    'there is an authorization problem',
    {
      code: 'authorizationProblem'
    }
  ],

  accessDenied: [
    403,
    'access denied',
    {
      code: 'accessDenied'
    }
  ],

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

  duplicateName: [
    422,
    'this name has already taken',
    {
      code: 'duplicateName'
    },
    {
      field: 'name'
    }
  ],

  invalidName: [
    422,
    'name is invalid',
    {
      code: 'invalidName'
    },
    {
      field: 'name'
    }
  ],

  invalidInput: [
    400,
    'input is invalid',
    {
      code: 'invalidInput'
    }
  ],

  invalidVerificationCode: [
    422,
    'invalid verification code',
    {
      code: 'invalidVerificationCode'
    }
  ],

  invalidRegistrationToken: [
    422,
    'invalid registration token',
    {
      code: 'invalidRegistrationToken'
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

  invalidPost: [
    422,
    'post isn\'t valid',
    {
      code: 'invalidPost'
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

exports.contact = {
  invalidValueContact: [
    400,
    'the input object is invalid',
    {
      code: 'invalidValueContact'
    }
  ]
};
