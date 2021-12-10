const connection = require('../database')

class UserService {
  async create({ username, password }) {
    const statement = `INSERT INTO users (username, password) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [username, password])
    return result
  }
  async getUserByUsername(username) {
    const statement = `SELECT * FROM users WHERE username = ?`
    const [result] = await connection.execute(statement, [username])
    return result
  }
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()
