const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../app/keys')

class AuthController {
  async login(ctx) {
    const { id, username } = ctx.user
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, //过期时间
      algorithm: 'RS256' //算法
    })
    ctx.body = { id, username, token }
  }
}
module.exports = new AuthController()
