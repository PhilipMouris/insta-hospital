// Defining status codes and their messages
const statusCodes = {
  succuss: {
    code: '0000',
    message: 'Success',
    httpCode: 200
  },
  unknown: {
    code: '000X',
    message: 'Something went wrong',
    httpCode: 500
  },
  unauthorized: {
    code: '000U',
    message: 'Unauthorized access',
    httpCode: 401
  },
  validation: {
    code: '0001',
    httpCode: 400
  },
  emailExists: {
    code: '0002',
    message: 'This email already exists',
    httpCode: 400
  },
  wrongCredentials: {
    code: '0003',
    message: 'Wrong email or password',
    httpCode: 400
  },
  nonMatchingPasswords: {
    code: '0004',
    message: 'Passwords entered do not match',
    httpCode: 400
  },
  wrongPassword: {
    code: '0005',
    message: 'Old password is incorrect',
    httpCode: 400
  },
  entityNotFound: {
    code: '0006',
    message: 'The entity you are looking for is not found',
    httpCode: 400
  },
  emailNotSent: {
    code: '0007',
    message: 'Email not sent,Please check your internet connection',
    httpCode: 400
  },
  wrongRecoveryCode: {
    code: '0008',
    message: 'Wrong recovery code,Please try again',
    httpCode: 400
  },
  alreadySubscribed: {
    code: '0009',
    message: 'This device is already subscribed',
    httpCode: 400
  },
  noFreeRoom: {
    code: '0010',
    message: 'No free rooms available',
    httpCode: 400
  }
};

module.exports = statusCodes;
