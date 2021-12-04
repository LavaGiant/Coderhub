const { create } = require('../service/user.service')
class UserController {
  async create(ctx, next) {
    // 获取用户数据
    const user = ctx.request.body
    // 查询数据
    const result = await create(user)
    // 返回数据
    ctx.body = `${user.username}注册成功`
  }
}

module.exports = new UserController()
