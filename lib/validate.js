const Joi = require('joi');
const PhoneNumber = require('awesome-phonenumber');

const { profile: profileLimit } = require('~/config/limit');

const USERNAME_PATTERN = /^[a-zA-Z0-9.]{4,30}$/;
const USERNAME_CHAR_PATTERN = /\.{2,}|^\.|\.$/;

exports.Joi = Joi.extend([
  joi => ({
    base: joi.string(),
    name: 'name',
    language: {
      username: 'is not valid!'
    },
    rules: [{
      name: 'username',
      setup (params) {
        this._flags.username = true;
      },
      validate (params, value, state, options) {
        if (
          USERNAME_PATTERN.test(value) &&
            !USERNAME_CHAR_PATTERN.test(value) &&
            (value.length >= profileLimit.usernameLengthRange[0] && value.length <= profileLimit.usernameLengthRange[1])
        ) {
          return value;
        }

        return this.createError('name.username', {}, state, options);
      }
    }]
  }),
  joi => ({
    base: joi.string(),
    name: 'phoneNumber',
    language: {
      irMobile: 'phone number format is not valid!',
      irFixedLine: 'phone number format is not valid!'
    },
    rules: [
      {
        name: 'irMobile',
        setup (params) {
          this._flags.irMobile = true;
        },
        validate (params, value, state, options) {
          const pn = new PhoneNumber(value, 'IR');

          if (!(pn.isValid() && pn.isMobile())) {
            return this.createError('phoneNumber.irMobile', {}, state, options);
          }

          return pn.getNumber('e164');
        }
      }
    ]
  })
]);
