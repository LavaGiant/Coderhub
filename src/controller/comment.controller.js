const { create, reply, update, remove, getCommentsByMomentId } = require("../service/comment.service")

class CommentController {
  async create(ctx) {
    const userId = ctx.user.id
    const { momentId, content } = ctx.request.body
    await create(content, momentId, userId)
    ctx.body = `发表评论成功：${content}`
  }
  async reply(ctx) {
    const userId = ctx.user.id
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.params
    await reply(content, momentId, userId, commentId)
    ctx.body = `发表评论成功：${content}`
  }
  async update(ctx) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body
    await update(commentId, content)
    ctx.body = `修改评论成功：${content}`
  }
  async remove(ctx) {
    const { commentId } = ctx.params
    await remove(commentId)
    ctx.body = `删除评论成功`
  }
  async list(ctx) {
    const { momentId } = ctx.query
    const res = await getCommentsByMomentId(momentId)
    ctx.body = res
  }
}

module.exports = new CommentController()
