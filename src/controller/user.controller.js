const { createReadStream } = require('fs')
const { AVATAR_PATH } = require('../constants/path-type')
const { getAvatarByUserId } = require('../service/file.service')
const { create } = require('../service/user.service')
class UserController {
  async create(ctx) {
    // 获取用户数据
    const user = ctx.request.body
    // 查询数据
    await create(user)
    // 返回数据
    ctx.body = `${user.username}注册成功`
  }
  async avatarInfo(ctx) {
    const { userId } = ctx.params
    const { filename, mimetype } = await getAvatarByUserId(userId)
    ctx.response.set('content-type', mimetype)
    ctx.body = createReadStream(`${AVATAR_PATH}/${filename}`)
  }
}

module.exports = new UserController()
