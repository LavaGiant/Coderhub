const { USER_DOES_NOT_EXISTS, PASSWORD_IS_INCORRECT } = require("../constants/error-type")
const { getUserByUsername } = require("../service/user.service")

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  const res = await getUserByUsername(username)
  if (!res.length) {
    const notExistsError = new Error(USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', notExistsError, ctx)
  }
  if (res[0].password !== password) {
    const passwordError = new Error(PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', passwordError, ctx)
  }
  await next()
}

module.exports = verifyLogin
