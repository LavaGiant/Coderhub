const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, detail, list, update, remove } = require('../controller/moment.controller')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:momentId', detail)
momentRouter.get('/', list)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

module.exports = momentRouter
