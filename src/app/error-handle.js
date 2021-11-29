const { USERNAME_OR_PASSWORD_IS_REQUIRED, USER_ALREADY_EXISTS } = require("../constants/error-type")

const errorHandler = (error, ctx) => {
  let message, status;
  switch (error.message) {
    case USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或者密码不能为空！'
      break;
    case USER_ALREADY_EXISTS:
      status = 409
      message = '用户名已经存在！'
      break;
    default:
      status = 404
      message = 'NOT FOUND！'
  }
  ctx.response.status = status
  ctx.body = message
}

module.exports = errorHandler
