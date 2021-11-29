const { createPool } = require('mysql2')

const { 
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD 
} = require('./config')

const connections = createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
})

connections.promise().getConnection().then(conn => {
  conn.connect().then(() => {
    console.log('数据库连接成功')
  }).catch(err => {
    console.log(`数据库连接失败:${err}`)
  })
})

module.exports = connections.promise()
