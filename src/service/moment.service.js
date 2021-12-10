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
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT("id", u.id, "username", u.username, "avatar", u.avatar_url) user
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
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
    const [result] = await connection.execute(statement, [(pageSize * (pageNum - 1)).toString(), pageSize])
    return result
  }
  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
  async checkLabelExists(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? && label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result.length ? true : false
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUE (?, ?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService()
