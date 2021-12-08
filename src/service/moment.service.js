const connection = require('../database')

const sqlFragment = `
  SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT("id", u.id, "username", u.username) user
  FROM moment m
  LEFT JOIN users u ON m.user_id = u.id
`

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [userId, content])
    return result
  }
  async getMomentById(id) {
    const statement = `
      ${sqlFragment}
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }
  async getMomentList({ pageNum, pageSize }) {
    const statement = `
      ${sqlFragment}
      LIMIT ?, ?;
    `
    try {
      const [result] = await connection.execute(statement, [(pageNum - 1).toString(), pageSize])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MomentService()
