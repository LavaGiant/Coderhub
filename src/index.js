const app = require('./app')
const { APP_PORT } = require('./app/config')

app.listen(APP_PORT, () => {
  console.log(`服务器在${APP_PORT}启动成功`)
})
