const { NOT_SAME_COMMENT } = require("../constants/error-type")
const { checkCommentReply } = require("../service/comment.service")

const verifyReplySameComment = async (ctx, next) => {
  const { commentId } = ctx.params
  const { momentId } = ctx.request.body
  const isSameComment = await checkCommentReply(commentId, momentId)
  if (!isSameComment) {
    const error = new Error(NOT_SAME_COMMENT)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}
module.exports = {
  verifyReplySameComment
}
