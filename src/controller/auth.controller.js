class AuthController {
  async login(ctx) {
    const { username } = ctx.request.body
    ctx.body = `${username}登陆成功`
  }
}

module.exports = new AuthController()
