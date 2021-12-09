const connection = require('../database')
class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? && user_id = ?;`
    const [result] = await connection.execute(statement, [id, userId])
    return result.length ? true : false
  }
  async checkCommentReply(commentId, momentId) {
    const statement = `SELECT moment_id momentId FROM comment WHERE id = ?;`
    const [result] = await connection.execute(statement, [commentId])
    return result[0].momentId == momentId ? true : false
  }
}

module.exports = new AuthService()
