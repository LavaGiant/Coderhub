const Router = require('koa-router')

const { create, avatarInfo } = require('../controller/user.controller')
const { verifyUser, handlePassword, verifyInfoIsNull } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyInfoIsNull, verifyUser, handlePassword, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter
