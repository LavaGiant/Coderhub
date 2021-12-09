const connection = require('../database')
class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? && user_id = ?;`
    const [result] = await connection.execute(statement, [id, userId])
    return result.length ? true : false
  }
}

module.exports = new AuthService()
