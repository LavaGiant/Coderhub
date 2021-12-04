const app = require('./app')
require('./database')
const { APP_PORT } = require('./database/config')

app.listen(APP_PORT, () => {
  console.log(`服务器在${APP_PORT}启动成功`)
})
