const Router = require('koa-router')
const { saveAvatarInfo } = require('../controller/file.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/avatar', verifyAuth, saveAvatarInfo)

module.exports = fileRouter
