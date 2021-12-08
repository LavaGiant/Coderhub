const { create, getMomentById, getMomentList, update, remove } = require("../service/moment.service")

class MomentController {
  async create(ctx) {
    const userId = ctx.user.id
    const { content } = ctx.request.body
    // 将数据插入到数据库
    const res = await create(userId, content)
    ctx.body = `插入 ${content} 动态成功`
  }
  async detail(ctx) {
    const { momentId } = ctx.params
    const res = await getMomentById(momentId)
    ctx.body = res
  }
  async list(ctx) {
    const res = await getMomentList(ctx.query)
    ctx.body = res
  }
  async update(ctx) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const res = await update(momentId, content)
    ctx.body = `${content}修改成功`
  }
  async remove(ctx) {
    const { momentId } = ctx.params
    const res = await remove(momentId)
    ctx.body = `删除成功`
  }
}

module.exports = new MomentController()
