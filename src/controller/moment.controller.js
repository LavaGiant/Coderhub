const { create, getMomentById, getMomentList } = require("../service/moment.service")

class MomentController {
  async create(ctx) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    // 将数据插入到数据库
    const res = await create(userId, content)
    ctx.body = `插入 ${content} 动态成功`
  }
  async detail(ctx) {
    const momentId = ctx.params.momentId
    const res = await getMomentById(momentId)
    ctx.body = res
  }
  async list(ctx) {
    const res = await getMomentList(ctx.query)
    ctx.body = res
  }
}

module.exports = new MomentController()
