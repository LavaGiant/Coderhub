const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router')

const errorHandler = require('../utils/error-handle')

const app = new Koa()
app.useRoutes = useRoutes

app.use(bodyParser())
app.useRoutes()

// 错误处理
app.on('error', errorHandler)

module.exports = app
