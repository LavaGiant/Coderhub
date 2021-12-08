const jwt = require("jsonwebtoken")

const { PUBLIC_KEY } = require("../app/keys")

const { USER_DOES_NOT_EXISTS, PASSWORD_IS_INCORRECT, NOT_AUTHORIZATION } = require("../constants/error-type")
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
  ctx.user = res[0]
  await next()
}

const verifyAuth = async (ctx, next) => {
  try {
    // 获取token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '')
    // 验证token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(NOT_AUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
