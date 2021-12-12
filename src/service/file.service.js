const connection = require('../database')
class FileService {
  async saveAvatarInfo(filename, mimetype, size, userId) {
    const searchStatement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [avatarInfo] = await connection.execute(searchStatement, [userId])
    const statement = avatarInfo.length ?
      `UPDATE avatar SET filename = ?, mimetype = ?, size = ? WHERE user_id = ?;`
      :
      `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }
  async saveFileInfo(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
    return result
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new FileService()
