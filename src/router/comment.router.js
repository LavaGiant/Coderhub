const Router = require("koa-router");

const { verifyAuth, verifyReplySameComment, verifyPermission } = require('../middleware/auth.middleware')

const { create, reply, update, remove, list } = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, verifyReplySameComment, reply)
// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
// 获取列表
commentRouter.get('/', list)

module.exports = commentRouter
